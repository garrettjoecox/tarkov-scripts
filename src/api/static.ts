import { GetItemsResponse, GetTemplatesResponse, GetLocaleResponse } from '../types/api/static';
import { prodRequest } from '../api/index';

export async function getLocaleRequest(): Promise<GetLocaleResponse> {
  return prodRequest({
    url: '/client/locale/en',
  });
}

export function getItemsRequest(): Promise<GetItemsResponse> {
  return prodRequest({
    url: '/client/items',
  });
}

export function getTemplatesRequest(): Promise<GetTemplatesResponse> {
  return prodRequest({
    url: '/client/handbook/templates',
  });
}
