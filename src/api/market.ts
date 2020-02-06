import { ragfairRequest, prodRequest } from './index';
import {
  SearchMarketRequestBody,
  SearchMarketResponse,
  BuyOnMarketRequestBody,
  BuyOnMarketResponse,
  SellOnMarketRequestBody,
  SellOnMarketResponse,
} from '../types/api/market';

export function searchMarketRequest(body: SearchMarketRequestBody): Promise<SearchMarketResponse> {
  return ragfairRequest({
    url: '/client/ragfair/find',
    body,
  });
}

export function buyOnMarketRequest(body: BuyOnMarketRequestBody): Promise<BuyOnMarketResponse> {
  return prodRequest({
    url: '/client/game/profile/items/moving',
    body,
  });
}

export async function sellOnMarketRequest(body: SellOnMarketRequestBody): Promise<SellOnMarketResponse> {
  return prodRequest({
    url: '/client/game/profile/items/moving',
    body,
  });
}
