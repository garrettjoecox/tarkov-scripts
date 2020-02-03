import { writeJSON } from 'fs-extra';
import { findKey, get, has } from 'lodash';

import { startGame, login, activateHardware } from './auth';
import { selectMainProfile, getProfiles } from './profile';
import { searchMarket } from './market';
import { SortType, SortDirection, CurrencyType, OwnerType } from './types/market';
import { getLocale } from './locale';
import { decompress } from './utils';
import { ragfairRequest, tradingRequest, prodRequest } from './request';

const maxMap: { [key: string]: number } = {
  '590c678286f77426c9660122': 300, // IFAK
  '5d02778e86f774203e7dedbe': 5, // CMS kit
  '5d02797c86f774203f38e30a': 15, // Surv12
  '5af0454c86f7746bf20992e8': 5, // Immobilizing splint
  '5751a25924597722c463c472': 2, // Army bandage
  '544fb45d4bdc2dee738b4568': 400, // Salewa
  '5755383e24597772cb798966': 10, // Vaseline
  '5751a89d24597722aa0e8db0': 10, // Golden Star Balm
};

(async () => {
  // Authenticate
  // const { email, password } = await get('credentials');
  // await login({ email, password });
  // await activateHardware({ email, code: 'abcxyz' });

  // await startGame();
  // await selectMainProfile();

  // Search flea market
  const locale = await getLocale();

  /*
    Skier 67%
    Therapist 75%
  */

  const data = await [
    // 'Flammable materials',
    // 'Barter items',
    // 'Tools',
    // 'Valuables',
    // 'Electronics',
    // 'Household materials',
    // 'Keys',
    // 'Electronic keys',
    // 'Mechanical keys',

    'Weapon parts & mods',
    'Suppressors',
    'Receivers & slides',
    'Barrels',
    'Sights'
  ].reduce((p, category) => p.then(async (result) => {
    const handbookId = findKey(locale.handbook, (c) => c === category);
    console.log(`Searching ${category}`);
    const search = await searchMarket({
      page: 1,
      limit: 100,
      sortType: SortType.Price,
      sortDirection: SortDirection.ASC,
      currency: CurrencyType.Rouble,
      removeBartering: true,
      ownerType: OwnerType.Player,
      handbookId: handbookId,
    });

    await new Promise(r => setTimeout(r, 2000));

    return result.concat(search.offers);
  }), Promise.resolve([]));

  const results = data
    .map((offer) => {
      const worth = has(offer, 'items[0].upd.MedKit.HpResource')
        ? (((offer.items[0].upd.MedKit.HpResource / maxMap[offer.items[0]._tpl]) * offer.itemsCost) * 0.75)
        : (offer.itemsCost * 0.67);
      return {
        name: locale.templates[offer.items[0]._tpl].Name,
        sellingFor: offer.requirementsCost,
        worth,
        profit: worth - offer.requirementsCost,
        // raw: offer,
      }
    })
    .filter((offer) => {
      return (offer.profit > 1000);
    })
    .sort((a, b) => a.profit - b.profit);

  if (results.length) {
    console.log(results);
  } else {
    console.log('Nothing found');
  }

  await writeJSON('data.json', results, { spaces: 2 });

})().catch(e => console.error(e));
