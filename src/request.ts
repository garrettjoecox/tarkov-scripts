import _request, { OptionsWithUrl } from 'request-promise-native';
import { defaultsDeep } from 'lodash';

import { RAGFAIR_ENDPOINT, TRADING_ENDPOINT, PROD_ENDPOINT, LAUNCHER_ENDPOINT, UNITY_VERSION, GAME_VERSION, LAUNCHER_VERSION } from './constants';
import { decompress, compress } from './utils';
import { get } from './storage';
import { GetProfilesResponse, StartGameResponse, ActivateHardwareResponse, LoginResponse, ApiResponse, SelectProfileResponse, SearchMarketResponse } from './types/responseTypes';
import { MarketSearch } from './types/market';
import { ApiError, EnterCaptchaError, NewHardwareError, WrongCredentialsError, WrongActivationCodeError } from './errors';

export async function request(options: OptionsWithUrl): Promise<ApiResponse> {
  const session = await get('auth.session');
  if (options.body) {
    options.body = await compress(options.body);
  }

  const response: ApiResponse = await _request(defaultsDeep({}, options, {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': `UnityPlayer/${UNITY_VERSION} (UnityWebRequest/1.0, libcurl/7.52.0-DEV)`,
      'App-Version': `EFT Client ${GAME_VERSION}`,
      'X-Unity-Version': UNITY_VERSION,
      'Cookie': `PHPSESSID=${session}`, // TODO
    },
    qs: {
      launcherVersion: LAUNCHER_VERSION,
      branch: 'live',
    },
    encoding: null,
    transform: decompress,
  }));

  if (response.err !== 0) {
    switch(response.err) {
      case 206: throw new WrongCredentialsError(response.errmsg);
      case 209: throw new NewHardwareError(response.errmsg);
      case 211: throw new WrongActivationCodeError(response.errmsg);
      case 214: throw new EnterCaptchaError(response.errmsg);
      default: throw new ApiError(response.errmsg);
    }
  }

  return response;
}

export function launcherRequest(options: OptionsWithUrl) {
  return request(defaultsDeep({}, options, {
    baseUrl: LAUNCHER_ENDPOINT,
    headers: {
      'User-Agent': `BSG Launcher ${LAUNCHER_VERSION}`,
    },
  }));
}

export function prodRequest(options: OptionsWithUrl) {
  return request(defaultsDeep({}, options, {
    baseUrl: PROD_ENDPOINT,
  }));
}

export function tradingRequest(options: OptionsWithUrl) {
  return request(defaultsDeep({}, options, {
    baseUrl: TRADING_ENDPOINT,
  }));
}

export function ragfairRequest(options: OptionsWithUrl) {
  return request(defaultsDeep({}, options, {
    baseUrl: RAGFAIR_ENDPOINT,
  }));
}

export function loginRequest(form: { email: string, password: string, hwCode: string, captcha: null | string }): Promise<LoginResponse> {
  return launcherRequest({
    method: 'POST',
    url: '/launcher/login',
    body: {
      email: form.email,
      pass: form.password,
      hwCode: form.hwCode,
      captcha: form.captcha,
    },
  });
}

export function activateHardwareRequest(form: { email: string, hwCode: string, code: string }): Promise<ActivateHardwareResponse> {
  return launcherRequest({
    method: 'POST',
    url: '/launcher/hardwareCode/activate',
    body: {
      email: form.email,
      hwCode: form.hwCode,
      activateCode: form.code,
    },
  });
}

export function startGameRequest(form: { hwCode: string, accessToken: string }): Promise<StartGameResponse> {
  return prodRequest({
    method: 'POST',
    url: '/launcher/game/start',
    headers: {
      'User-Agent': `BSG Launcher ${LAUNCHER_VERSION}`,
      'Authorization': form.accessToken,
    },
    body: {
      version: {
        major: GAME_VERSION,
        game: 'live',
        backend: '6',
      },
      hwCode: form.hwCode,
    },
  });
}

export function getProfilesRequest(): Promise<GetProfilesResponse> {
  return prodRequest({
    method: 'POST',
    url: '/client/game/profile/list',
  });
}

export function selectProfileRequest(profileId: string): Promise<SelectProfileResponse> {
  return prodRequest({
    method: 'POST',
    url: '/client/game/profile/select',
    body: {
      uid: profileId,
    },
  });
}

export function searchMarketRequest(marketSearch: MarketSearch): Promise<SearchMarketResponse> {
  return ragfairRequest({
    method: 'POST',
    url: '/client/ragfair/find',
    body: marketSearch,
  });
}

export function buyOnFleaMarketRequest(offerId: string, items: any): Promise<ApiResponse> {
  return prodRequest({
    method: 'POST',
    url: '/client/game/profile/items/moving',
    body: {
      data: [{
        Action: 'RagFairBuyOffer',
        offers: [{
            id: offerId,
            count: 1,
            items: items,
        }],
      }],
      tm: 2,
    }
  });
}

export async function sellToTraderRequest(traderId: string, itemId: string, amount: number = 1) {
  return prodRequest({
    method: 'POST',
    url: '/client/game/profile/items/moving',
    body: {
      data: [{
        Action: 'TradingConfirm',
        type: 'sell_to_trader',
        tid: traderId,
        items: [{
          id: itemId,
          count: amount,
          scheme_id: 0,
        }],
      }],
      tm: 0,
    },
  });
}
