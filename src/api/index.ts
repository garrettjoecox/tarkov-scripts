import _request, { OptionsWithUrl } from 'request-promise-native';
import { defaultsDeep } from 'lodash';

import { decompress, compress, throttle } from '../utils';
import { get } from '../storage';
import { ApiResponse, KeepAliveResponse } from '../types/api';
import { ApiError, EnterCaptchaError, NewHardwareError, WrongCredentialsError, WrongActivationCodeError, NotAuthorizedError, BadAccountIdError } from '../errors';
import { PROD_ENDPOINT, TRADING_ENDPOINT, RAGFAIR_ENDPOINT, UNITY_VERSION, GAME_VERSION } from '../constants';

export async function request(options: OptionsWithUrl, auth: boolean = true): Promise<ApiResponse> {
  let session;
  if (auth) {
    session = await get('auth.session');
    if (!session) throw new NotAuthorizedError('No session found');
  }

  if (options.body) {
    options.body = await compress(options.body);
  }

  await throttle();
  const response: ApiResponse = await _request(defaultsDeep({}, options, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(session ? { Cookie: `PHPSESSID=${session}` } : {}),
    },
    encoding: null,
    transform: decompress,
  }));

  if (response.err !== 0) {
    switch(response.err) {
      case 201: throw new NotAuthorizedError(response.errmsg);
      case 205: throw new BadAccountIdError(response.errmsg);
      case 206: throw new WrongCredentialsError(response.errmsg);
      case 209: throw new NewHardwareError(response.errmsg);
      case 211: throw new WrongActivationCodeError(response.errmsg);
      case 214: throw new EnterCaptchaError(response.errmsg);
      default: throw new ApiError(response.errmsg);
    }
  }

  return response;
}

export function clientRequest(options: OptionsWithUrl, auth: boolean = true) {
  return request(defaultsDeep({}, options, {
    headers: {
      'User-Agent': `UnityPlayer/${UNITY_VERSION} (UnityWebRequest/1.0, libcurl/7.52.0-DEV)`,
      'App-Version': `EFT Client ${GAME_VERSION}`,
      'X-Unity-Version': UNITY_VERSION,
    },
  }), auth);
}

export function prodRequest(options: OptionsWithUrl, auth: boolean = true) {
  return clientRequest(defaultsDeep({}, options, {
    baseUrl: PROD_ENDPOINT,
  }), auth);
}

export function tradingRequest(options: OptionsWithUrl, auth: boolean = true) {
  return clientRequest(defaultsDeep({}, options, {
    baseUrl: TRADING_ENDPOINT,
  }), auth);
}

export function ragfairRequest(options: OptionsWithUrl, auth: boolean = true) {
  return clientRequest(defaultsDeep({}, options, {
    baseUrl: RAGFAIR_ENDPOINT,
  }), auth);
}

export function keepAliveRequest(): Promise<KeepAliveResponse> {
  return prodRequest({
    url: '/client/game/keepalive',
  });
}
