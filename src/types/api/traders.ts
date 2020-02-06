import { ApiResponse } from './index';
import { Trader } from '../traders';

export interface GetTradersListResponse extends ApiResponse {
  data: Trader[]
}

export interface BuyFromTraderRequestBody {

}

export interface BuyFromTraderResponse extends ApiResponse {

}

export interface SellToTraderRequestBody {

}

export interface SellToTraderResponse extends ApiResponse {

}
