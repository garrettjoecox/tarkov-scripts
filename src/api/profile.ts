import { GetProfilesResponse, SelectProfileResponse, SelectProfileRequestBody } from '../types/api/profile';
import { prodRequest } from './index';

export async function getProfilesRequest(): Promise<GetProfilesResponse> {
  return prodRequest({
    url: '/client/game/profile/list',
  });
}

export async function selectProfilesRequest(body: SelectProfileRequestBody): Promise<SelectProfileResponse> {
  return prodRequest({
    url: '/client/game/profile/select',
    body,
  });
}
