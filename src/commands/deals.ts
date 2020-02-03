import { prompt, Separator } from 'inquirer';
import { ParsedArgs } from 'minimist';
import ora from 'ora';
import readline from 'readline';
import { uniqBy } from 'lodash';

import { startGame } from '../auth';
import { selectMainProfile } from '../profile';
import { searchMarket, buyOnFleaMarket } from '../market';
import { SortType, SortDirection, CurrencyType, OwnerType, Offer } from '../types/market';
import { waitRandom } from '../utils';
import { getLocale } from '../locale';
import { writeJSON } from 'fs-extra';

const categories = [
  {
    name: 'Flammable materials',
    value: {
      name: 'Flammable materials',
      id: '5b47574386f77428ca22b2f2',
      multiplier: 0.75,
    },
  },
  {
    name: 'Barter items',
    value: {
      name: 'Barter items',
      id: '5b47574386f77428ca22b33e',
      multiplier: 0.75,
    },
  },
  {
    name: 'Tools',
    value: {
      name: 'Tools',
      id: '5b47574386f77428ca22b2f6',
      multiplier: 0.75,
    },
  },
  {
    name: 'Valuables',
    value: {
      name: 'Valuables',
      id: '5b47574386f77428ca22b2f1',
      multiplier: 0.75,
    },
  },
  {
    name: 'Electronics',
    value: {
      name: 'Electronics',
      id: '5b47574386f77428ca22b2ef',
      multiplier: 0.75,
    },
  },
  {
    name: 'Household materials',
    value: {
      name: 'Household materials',
      id: '5b47574386f77428ca22b2f0',
      multiplier: 0.75,
    },
  },
  {
    name: 'Keys',
    value: {
      name: 'Keys',
      id: '5b47574386f77428ca22b342',
      multiplier: 0.75,
    },
    checked: true,
  },
  {
    name: 'Electronic keys',
    value: {
      name: 'Electronic keys',
      id: '5c518ed586f774119a772aee',
      multiplier: 0.75,
    },
    checked: false,
  },
  {
    name: 'Mechanical keys',
    value: {
      name: 'Mechanical keys',
      id: '5c518ec986f7743b68682ce2',
      multiplier: 0.75,
    },
    checked: false,
  },
  {
    name: 'Injectors',
    value: {
      name: 'Injectors',
      id: '5b47574386f77428ca22b33a',
      multiplier: 0.75,
    },
  },
  {
    name: 'Weapon parts & mods',
    value: {
      name: 'Weapon parts & mods',
      id: '5b5f71a686f77447ed5636ab',
      multiplier: 0.67,
    },
  },
  {
    name: 'Suppressors',
    value: {
      name: 'Suppressors',
      id: '5b5f731a86f774093e6cb4f9',
      multiplier: 0.67,
    },
  },
  {
    name: 'Receivers & slides',
    value: {
      name: 'Receivers & slides',
      id: '5b5f764186f77447ec5d7714',
      multiplier: 0.67,
    },
  },
  {
    name: 'Barrels',
    value: {
      name: 'Barrels',
      id: '5b5f75c686f774094242f19f',
      multiplier: 0.67,
    },
  },
  {
    name: 'Sights',
    value: {
      name: 'Sights',
      id: '5b5f73ec86f774093e6cb4fd',
      multiplier: 0.67,
    },
  },
  {
    name: 'Food',
    value: {
      name: 'Food',
      id: '5b47574386f77428ca22b336',
      multiplier: 0.75,
    },
  },
  {
    name: 'Drinks',
    value: {
      name: 'Drinks',
      id: '5b47574386f77428ca22b335',
      multiplier: 0.75,
    },
  },
];

export default async function deals(argv: ParsedArgs) {
  // await ensureActiveSession();

  const userInput = await prompt([{
    type: 'checkbox',
    name: 'categories',
    message: 'Select categories to query:',
    choices: categories,
    validate: function(answer) {
      return answer.length > 0 || 'You must choose at least one category';
    }
  }, {
    type: 'number',
    name: 'profit',
    message: 'What minimum profit are you looking for?',
    default: 1000,
    validate: function(answer) {
      if (isNaN(answer)) return 'Must be a number';

      return answer > 0 || 'Profit must be at least 0';
    }
  }]);
  const spinner = ora('Searching').start();

  const results: Offer[] = await userInput.categories.reduce((p: any, category: any) => p.then(async (result: Offer[]) => {
    spinner.text = `Searching ${category.name}`;
    const search = await searchMarket({
      page: 1,
      limit: 100,
      sortType: SortType.Price,
      sortDirection: SortDirection.ASC,
      currency: CurrencyType.Rouble,
      removeBartering: true,
      ownerType: OwnerType.Player,
      handbookId: category.id,
    });

    await waitRandom();

    const search2 = await searchMarket({
      page: 2,
      limit: 100,
      sortType: SortType.Price,
      sortDirection: SortDirection.ASC,
      currency: CurrencyType.Rouble,
      removeBartering: true,
      ownerType: OwnerType.Player,
      handbookId: category.id,
    });

    await waitRandom();

    result = result.concat(search.offers.map(offer => {
      offer.itemsCost = offer.itemsCost * category.multiplier;
      return offer;
    }));

    return result.concat(search2.offers.map(offer => {
      offer.itemsCost = offer.itemsCost * category.multiplier;
      return offer;
    }));
  }), Promise.resolve([]));

  const locale = await getLocale();

  let forDisplay = results
    .map((offer) => {
      return {
        id: offer._id,
        from: offer.user.nickname,
        name: locale.templates[offer.items[0]._tpl].Name,
        sellingFor: offer.requirementsCost,
        worth: offer.itemsCost,
        profit: offer.itemsCost - offer.requirementsCost,
        raw: offer,
      }
    })
    .filter((offer) => {
      return (offer.profit >= userInput.profit);
    })
    .sort((a, b) => a.profit - b.profit);

  forDisplay = uniqBy(forDisplay, 'id');

  if (!forDisplay.length) {
    spinner.fail('Nothing found');
    return;
  }

  spinner.succeed('Searching complete');

  async function ask(first?: boolean): Promise<void> {
    if (!forDisplay.length) {
      console.log('No options left, exiting...');
      return;
    }
    if (!first) {
      await new Promise(r => readline.moveCursor(process.stdout, 0, -(6 + forDisplay.length), r));
      await new Promise(r => readline.clearScreenDown(process.stdout, r));
    }

    console.table(forDisplay, ['from', 'name', 'sellingFor', 'profit']);
    const answer = await prompt({
      type: 'input',
      name: 'id',
      message: 'What would you like to buy?',
      validate(answer) {
        if (isNaN(answer)) return 'Must be a number';
        if (answer < 0 || answer > forDisplay.length - 1) return 'Must be a valid index on the table above';

        return true;
      }
    });

    if (answer.id !== '') {
      // Buy here
      await buyOnFleaMarket(forDisplay[answer.id].raw);

      forDisplay.splice(answer.id, 1);
      return ask();
    }

    console.log('No answer given, exiting...');
  }

  await ask(true);
}

async function ensureActiveSession() {
  await startGame();
  await selectMainProfile();
}
