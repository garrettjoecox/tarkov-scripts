import { defaultsDeep } from 'lodash';

import { searchMarketRequest, sellToTraderRequest } from './request';
import { MarketSearch, SortType, SortDirection, CurrencyType, OwnerType, Offer } from './types/market';
import { buyOnFleaMarketRequest } from './request';
import { getProfiles } from './profile';
import { ProfileSide } from './types/profile';
import { writeJSON } from 'fs-extra';
import { ApiError } from './errors';

export async function searchMarket(marketSearch: MarketSearch) {
  const response = await searchMarketRequest(defaultsDeep({}, marketSearch, {
    limit: 10,
    sortType: SortType.Price,
    sortDirection: SortDirection.DESC,
    currency: CurrencyType.Rouble,
    quantityFrom: 1,
    removeBartering: true,
    ownerType: OwnerType.Player,
    updateOfferCount: true,
    tm: 1,
  }));

  return response.data;
}

export async function buyOnFleaMarket(offer: Offer) {
  const profiles = await getProfiles();
  const profile = profiles.find((profile) => profile.Info.Side !== ProfileSide.Savage);

  const moneyStacks = profile.Inventory.items
    .filter((item) => item._tpl === '5449016a4bdc2d6f028b456f')
    .filter((item) => item.upd.StackObjectsCount > offer.requirementsCost)
    .sort((a, b) => a.upd.StackObjectsCount - b.upd.StackObjectsCount);

  if (!moneyStacks.length) console.log('Not enough money for that one!');
  const moneyStack = moneyStacks[0];

  const response = await buyOnFleaMarketRequest(offer._id, [{
    id: moneyStack._id,
    count: offer.requirementsCost,
  }]);

  if (response.data.badRequest.length) {
    throw new ApiError(response.data.badRequest[0].errmsg);
  }

  return response.data;
}

export async function sellOnFleaMarket() {

}

export async function buyItem() {

}

export async function sellItem(traderId: string, handbookId: string) {
  const profiles = await getProfiles();
  const profile = profiles.find((profile) => profile.Info.Side !== ProfileSide.Savage);
  const items = profile.Inventory.items
    .filter((item) => item._tpl === handbookId);

  if (!items.length) throw new Error('Item not found');
  const item = items[0];

  const response = await sellToTraderRequest(traderId, item._id, 1);

  return response.data;
}
