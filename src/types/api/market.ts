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
    Action: 'RagFairBuyOffer';
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
  data: {
    Action: 'RagFairAddOffer',
    sell_in_one_piece: boolean;
    items: string[];
    requirements: {
      _tpl: string;
      count: number;
      level: number;
      side: number;
      only_functional: boolean;
    }[];
  }[];
  tm: 2;
}

export interface SellOnMarketResponse extends ApiResponse {

}


