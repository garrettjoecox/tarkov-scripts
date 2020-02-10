import { ParsedArgs } from 'minimist';
import _ from 'lodash';
import ora from 'ora';
import { prompt } from 'inquirer';

import { getMainProfile } from '../profile';
import { ensureAuthenticated, getBestTraderToSellItemTo } from '../utils';
import { searchMarket, sellOnMarket } from '../market';
import { SortType, SortDirection, CurrencyType, OwnerType, Offer } from '../types/market';
import { getLocale } from '../static';
import { sellToTrader } from '../traders';

export default async function sellbox(argv: ParsedArgs) {
  await ensureAuthenticated();
  const locale = await getLocale();
  let profile = await getMainProfile();

  const userInput = await prompt([{
    type: 'number',
    name: 'minimumProfit',
    message: 'Minimum profit before listing? (0 = always)',
    default: 10000,
    validate: function(answer) {
      if (isNaN(answer)) return 'Must be a number';

      return answer >= 0 || 'Must be at least 0';
    }
  }]);

  const container = profile.Inventory.items.find((item) => _.get(item, 'upd.Tag.Name', '').toLowerCase() === 'sell');
  if (container) {
    ora('Sell container found').succeed();
  } else {
    ora('Sell container not found').fail();
    return;
  }

  return (async function loop(): Promise<void> {
    profile = await getMainProfile();
    let amountOfOffers = profile.RagfairInfo.offers.length;

    const itemsToSell = profile.Inventory.items.filter(item => item.parentId === container._id);
    if (!itemsToSell.length) {
      ora('Nothing in sell container').fail();
      return loop();
    }
    ora(`${itemsToSell.length} items in sell container`).succeed();

    await itemsToSell.reduce((p, item) => p.then(async () => {
      const trader = await getBestTraderToSellItemTo(item._tpl);

      const searchingSpinner = ora(`Searching market for ${locale.templates[item._tpl].Name}`).start();
      const searchResults = await searchMarket({
        sortType: SortType.Price,
        sortDirection: SortDirection.ASC,
        currency: CurrencyType.Rouble,
        conditionFrom: 100,
        conditionTo: 100,
        removeBartering: true,
        offerOwnerType: OwnerType.Player,
        handbookId: item._tpl,
      });
      searchingSpinner.succeed();

      if (searchResults.offers.length < 3) {
        ora('Not enough on the market to compare to, skipping').fail();
        return;
      }

      const cheapestOnMarket = searchResults.offers
        .sort((a, b) => a.requirementsCost - b.requirementsCost)
        .slice(0, 5);
      const deltas = cheapestOnMarket.reduce((arr: number[], offer: Offer, index: number, offers: Offer[]) => {
        index && arr.push(offer.requirementsCost - offers[index - 1].requirementsCost);
        return arr;
      }, []);
      const averageDelta = Math.floor(_.mean(deltas));
      const marketPrice = cheapestOnMarket[1].requirementsCost - averageDelta;
      const tradePrice = Math.floor(searchResults.offers[0].itemsCost * trader.multiplier);

      if ((marketPrice - tradePrice) > userInput.minimumProfit) {
        if (amountOfOffers >= 3) {
          ora('Meets potential profit threshold, but no flea market spots available, skipping...').fail();
          return;
        }

        const listingSpinner = ora(`Meets potential profit threshold, listing on market for ${marketPrice}`).start();
        try {
          await sellOnMarket(item._id, marketPrice);
          amountOfOffers++;

          listingSpinner.succeed();
        } catch (error) {
          listingSpinner.fail();
          ora(error.message).fail();
        }
      } else {
        const sellingSpinner = ora(`Selling to ${locale.trading[trader.id].Nickname} for ${tradePrice}`).start();
        try {
          await sellToTrader(trader.id, item._id);
          sellingSpinner.succeed();
        } catch (error) {
          sellingSpinner.fail();
          ora(error.message).fail();
        }
      }
    }), Promise.resolve());
    return loop();
  })();
}
