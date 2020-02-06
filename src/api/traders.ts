import { tradingRequest, prodRequest } from './index';
import { GetTradersListResponse, BuyFromTraderRequestBody, BuyFromTraderResponse, SellToTraderRequestBody, SellToTraderResponse } from '../types/api/traders';

export function getTradersListRequest(): Promise<GetTradersListResponse> {
  return tradingRequest({
    url: '/client/trading/api/getTradersList',
  });
}

export function buyFromTraderRequest(body: BuyFromTraderRequestBody): Promise<BuyFromTraderResponse> {
  return prodRequest({
    url: '/',
    body,
  });
}

export function sellToTraderRequest(body: SellToTraderRequestBody): Promise<SellToTraderResponse> {
  return prodRequest({
    url: '/client/game/profile/items/moving',
    body,
  });
}
