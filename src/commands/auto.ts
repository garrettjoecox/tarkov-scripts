import { ParsedArgs } from 'minimist';
import ora from 'ora';

import { searchMarket, buyOnFleaMarket, sellItem } from '../market';
import { SortType, SortDirection, CurrencyType, OwnerType } from '../types/market';
import { waitRandom } from '../utils';
import { getLocale } from '../locale';

const traders = {
  skier: {
    id: '58330581ace78e27b8b10cee',
    multiplier: 0.67,
  },
  therapist: {
    id: '54cb57776803fa99248b456e',
    multiplier: 0.75,
  },
  mechanic: {
    id: '5a7c2eca46aef81a7ca2145d',
    multiplier: 0.57,
  },
}

const categories = [
  // {
  //   name: 'Flammable materials',
  //   id: '5b47574386f77428ca22b2f2',
  //   trader: traders.therapist,
  // },
  // {
  //   name: 'Barter items',
  //   id: '5b47574386f77428ca22b33e',
  //   trader: traders.therapist,
  // },
  // {
  //   name: 'Tools',
  //   id: '5b47574386f77428ca22b2f6',
  //   trader: traders.therapist,
  // },
  // {
  //   name: 'Valuables',
  //   id: '5b47574386f77428ca22b2f1',
  //   trader: traders.therapist,
  // },
  // {
  //   name: 'Electronics',
  //   id: '5b47574386f77428ca22b2ef',
  //   trader: traders.therapist,
  // },
  // {
  //   name: 'Household materials',
  //   id: '5b47574386f77428ca22b2f0',
  //   trader: traders.therapist,
  // },
  // {
  //   name: 'Keys',
  //   id: '5b47574386f77428ca22b342',
  //   trader: traders.therapist,
  // },
  // {
  //   name: 'Electronic keys',
  //   id: '5c518ed586f774119a772aee',
  //   trader: traders.therapist,
  // },
  // {
  //   name: 'Mechanical keys',
  //   id: '5c518ec986f7743b68682ce2',
  //   trader: traders.therapist,
  // },
  // {
  //   name: 'Injectors',
  //   id: '5b47574386f77428ca22b33a',
  //   trader: traders.therapist,
  // },
  // {
  //   name: 'Weapon parts & mods',
  //   id: '5b5f71a686f77447ed5636ab',
  //   trader: traders.skier,
  // },
  // {
  //   name: 'Suppressors',
  //   id: '5b5f731a86f774093e6cb4f9',
  //   trader: traders.skier,
  // },
  // {
  //   name: 'Receivers & slides',
  //   id: '5b5f764186f77447ec5d7714',
  //   trader: traders.skier,
  // },
  // {
  //   name: 'Barrels',
  //   id: '5b5f75c686f774094242f19f',
  //   trader: traders.skier,
  // },
  // {
  //   name: 'Sights',
  //   id: '5b5f73ec86f774093e6cb4fd',
  //   trader: traders.skier,
  // },
  // {
  //   name: 'Food',
  //   id: '5b47574386f77428ca22b336',
  //   trader: traders.therapist,
  // },
  // {
  //   name: 'Drinks',
  //   id: '5b47574386f77428ca22b335',
  //   trader: traders.therapist,
  // },
  // {
  //   name: 'Ammo',
  //   id: '5b47574386f77428ca22b346',
  //   trader: traders.mechanic,
  // },
  {
    name: 'SMGs',
    id: '5b5f796a86f774093f2ed3c0',
    trader: traders.mechanic,
  },
  {
    name: 'Shotguns',
    id: '5b5f794b86f77409407a7f92',
    trader: traders.mechanic,
  },
  {
    name: 'Pistols',
    id: '5b5f792486f77447ed5636b3',
    trader: traders.mechanic,
  },
  {
    name: 'Marksman rifles',
    id: '5b5f791486f774093f2ed3be',
    trader: traders.mechanic,
  },
  {
    name: 'Bolt-action rifles',
    id: '5b5f798886f77447ed5636b5',
    trader: traders.mechanic,
  },
  {
    name: 'Machine guns',
    id: '5b5f79a486f77409407a7f94',
    trader: traders.mechanic,
  },
  {
    name: 'Assault carbines',
    id: '5b5f78e986f77447ed5636b1',
    trader: traders.mechanic,
  },
  {
    name: 'Assault rifles',
    id: '5b5f78fc86f77409407a7f90',
    trader: traders.mechanic,
  },
];

export default async function auto(argv: ParsedArgs) {
  const locale = await getLocale();

  return (async function loop(): Promise<void> {
    await categories.reduce((p, category) => p.then(async () => {
      const searchingSpinner = ora(`Searching ${category.name}`).start();
      const searchResults = await searchMarket({
        page: 1,
        limit: 100,
        sortType: SortType.Price,
        sortDirection: SortDirection.ASC,
        currency: CurrencyType.Rouble,
        removeBartering: true,
        ownerType: OwnerType.Player,
        handbookId: category.id,
      });
      searchingSpinner.succeed();
      ora(`Found ${searchResults.offers.length} results`).succeed();

      const checkingSpinner = ora('Checking for deals').start();
      const mappedResults = searchResults.offers
        .map((offer) => ({
          id: offer._id,
          raw: offer,
          profit: (offer.itemsCost * category.trader.multiplier) - offer.requirementsCost,
        }))
        .filter((offer) => offer.profit > 1000)
        .sort((a, b) => b.profit - a.profit);

      if (!mappedResults.length) {
        checkingSpinner.fail();
        ora('No deals found').fail();
        return waitRandom();
      }

      checkingSpinner.succeed();
      ora(`${mappedResults.length} deals found`).succeed();

      await mappedResults.slice(0, 3).reduce((pr, offer) => pr.then(async () => {
        const buyingSpinner = ora(`Buying ${locale.templates[offer.raw.items[0]._tpl].Name} for ${offer.raw.requirementsCost}, worth ${offer.raw.itemsCost * category.trader.multiplier}`).start();
        try {
          await buyOnFleaMarket(offer.raw);
          buyingSpinner.succeed();
        } catch (error) {
          buyingSpinner.fail();
          ora(error.message).fail();
          return waitRandom();
        }

        return waitRandom(); // await instead to auto sell
        const sellingSpinner = ora(`Selling ${locale.templates[offer.raw.items[0]._tpl].Name} for ${offer.raw.itemsCost * category.trader.multiplier}`).start();
        try {
          await sellItem(category.trader.id, offer.raw.items[0]._tpl);
          sellingSpinner.succeed();
        } catch (error) {
          sellingSpinner.fail();
          ora(error.message).fail();
        }

        return waitRandom();
      }), Promise.resolve());
      return waitRandom();
    }), Promise.resolve());
    return loop();
  })();
}
