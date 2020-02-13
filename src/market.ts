import { defaultsDeep } from 'lodash';

import { MarketQuery, SortType, SortDirection, CurrencyType, OwnerType, Offer } from './types/market';
import { ApiError } from './errors';
import { searchMarketRequest, buyOnMarketRequest, sellOnMarketRequest } from './api/market';
import { getMoneyStack } from './utils';
import { ITEMS } from './constants';

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

export async function sellOnMarket(itemId: string | string[], price: number) {
  const response = await sellOnMarketRequest({
    data: [{
      Action: 'RagFairAddOffer',
      sell_in_one_piece: false,
      items: Array.isArray(itemId) ? itemId : [itemId],
      requirements: [{
        _tpl: ITEMS.roubles,
        count: price,
        level: 0,
        side: 0,
        only_functional: false,
      }],
    }],
    tm: 2,
  });

  if (response.data.badRequest.length) {
    throw new ApiError(response.data.badRequest[0].errmsg);
  }

  return response.data;
}
