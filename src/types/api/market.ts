import { Offer, MarketQuery } from '../market';
import { ApiResponse } from './index';

export interface SearchMarketRequestBody extends MarketQuery {}

export interface SearchMarketResponse extends ApiResponse {
  data: {
    offers: Offer[];
    offersCount: number;
  };
}

export interface BuyOnMarketRequestBody {
  data: {
    Action: 'RagFairBuyOffer',
    offers: {
      id: string;
      count: number;
      items: {
        id: string;
        count: number;
      }[];
    }[];
  }[];
  tm: 2;
}

export interface BuyOnMarketResponse extends ApiResponse {
  data: {
    items: {
      new: {
        _id: string;
        _tpl: string;
      }[],
    },
    badRequest: {
      err: number;
      errmsg: null | string;
    }[]
  },
}

export interface SellOnMarketRequestBody {

}

export interface SellOnMarketResponse extends ApiResponse {

}


