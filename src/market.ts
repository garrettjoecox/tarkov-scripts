import { defaultsDeep } from 'lodash';

import { MarketQuery, SortType, SortDirection, CurrencyType, OwnerType, Offer } from './types/market';
import { ApiError } from './errors';
import { searchMarketRequest, buyOnMarketRequest } from './api/market';
import { getMoneyStack } from './utils';

export async function searchMarket(marketQuery: MarketQuery) {
  const response = await searchMarketRequest(defaultsDeep({}, marketQuery, {
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

export async function buyOnMarket(offer: Offer) {
  const moneyStack = await getMoneyStack(offer.requirementsCost);

  const response = await buyOnMarketRequest({
    data: [{
      Action: 'RagFairBuyOffer',
      offers: [{
        id: offer._id,
        count: 1,
        items: [{
          id: moneyStack._id,
          count: offer.requirementsCost,
        }],
      }],
    }],
    tm: 2,
  });

  if (response.data.badRequest.length) {
    throw new ApiError(response.data.badRequest[0].errmsg);
  }

  return response.data;
}

export async function sellOnMarket(itemId: string, amount: number, price: number) {

}
