import { ParsedArgs } from 'minimist';
import { writeJSON } from 'fs-extra';
import _ from 'lodash';
import ora from 'ora';

import { getMainProfile } from '../profile';
import { waitRandom, ensureAuthenticated } from '../utils';
import { getLocale } from '../locale';
import { searchMarket, sellOnMarket } from '../market';
import { SortType, SortDirection, CurrencyType, OwnerType, Offer } from '../types/market';

export default async function sellbox(argv: ParsedArgs) {
  await ensureAuthenticated();
  let profile = await getMainProfile();
  const locale = await getLocale();

  const container = profile.Inventory.items.find((item) => _.get(item, 'upd.Tag.Name', '').toLowerCase() === 'sell');
  if (container) {
    ora('Sell container found').succeed();
  } else {
    ora('Sell container not found').fail();
  }
  await waitRandom();

  return (async function loop(): Promise<void> {
    profile = await getMainProfile();
    if (profile.RagfairInfo.offers.length < 3) {
      ora(`${profile.RagfairInfo.offers.length}/3 Offers on flea market`).succeed();
      const itemsToSell = profile.Inventory.items.filter((item) => item.parentId === container._id);
      if (itemsToSell.length) {
        ora(`${itemsToSell.length} items in sell container`).succeed();
        const itemToSell = itemsToSell[0];

        const searchingSpinner = ora(`Searching market for ${locale.templates[itemToSell._tpl].Name}`).start();
        await waitRandom();
        const searchResults = await searchMarket({
          sortType: SortType.Price,
          sortDirection: SortDirection.ASC,
          currency: CurrencyType.Rouble,
          conditionFrom: 100,
          conditionTo: 100,
          removeBartering: true,
          offerOwnerType: OwnerType.Player,
          handbookId: itemToSell._tpl,
        });
        searchingSpinner.succeed();

        if (searchResults.offers.length) {
          const cheapest = searchResults.offers
            .sort((a, b) => a.requirementsCost - b.requirementsCost)
            .slice(0, 5);

          const average = Math.floor(_.meanBy(cheapest, offer => offer.requirementsCost));
          ora(`Average cheapest price is ${average}`).succeed();

          let price: number;
          const deltas = cheapest.reduce((arr: number[], offer: Offer, index: number, offers: Offer[]) => {
            index && arr.push(offer.requirementsCost - offers[index - 1].requirementsCost);
            return arr;
          }, []);
          const averageDelta = Math.floor(_.mean(deltas));

          if (cheapest.length > 2) {
            price = cheapest[1].requirementsCost - averageDelta;
          } else {
            price = average - averageDelta;
          }
          ora(`Undercutting by average delta (${averageDelta})`).succeed();

          const listingSpinner = ora(`Creating listing for ${locale.templates[itemToSell._tpl].Name} for ${price}`).start();
          try {
            await waitRandom();
            await sellOnMarket(itemToSell._id, price);

            listingSpinner.succeed();
          } catch (error) {
            listingSpinner.fail();
            ora(error.message).fail();
          }

        } else {
          ora('Nothing on market to compare to').fail();
        }
      } else {
        ora('Nothing in sell container').fail();
      }
    } else {
      ora('3/3 Offers on flea market').fail();
    }
    await waitRandom(5000, 10000);
    return loop();
  })();
}
