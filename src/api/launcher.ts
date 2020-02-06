import { OptionsWithUrl } from 'request-promise-native';
import { defaultsDeep } from 'lodash';

import { request } from './index';
import { LAUNCHER_ENDPOINT, LAUNCHER_VERSION, GAME_VERSION, PROD_ENDPOINT } from '../constants';
import {
  LoginRequestBody,
  LoginResponse,
  GetLauncherDistribResponse,
  GetUnpackedDistribResponse,
  ConfigResponse,
  GameStartRequestBody,
  GameStartResponse,
  HardwareCodeActivateRequestBody,
  HardwareCodeActivateResponse,
  TokenRefreshRequestBody,
  TokenRefreshResponse,
} from '../types/api/launcher';
import { get } from '../storage';
import { NotAuthorizedError } from '../errors';

export async function launcherRequest(options: OptionsWithUrl, auth: boolean = true) {
  let accessToken;
  if (auth) {
    accessToken = await get('auth.accessToken');
    if (!accessToken) throw new NotAuthorizedError('No accessToken found');
  }

  return request(defaultsDeep({}, options, {
    baseUrl: LAUNCHER_ENDPOINT,
    headers: {
      'User-Agent': `BSG Launcher ${LAUNCHER_VERSION}`,
      ...(accessToken ? { Authorization: accessToken } : {}),
    },
    qs: {
      launcherVersion: LAUNCHER_VERSION,
    },
  }), false);
}

export function loginRequest(body: LoginRequestBody): Promise<LoginResponse> {
  return launcherRequest({
    url: '/launcher/login',
    body,
  }, false);
}

export function tokenRefreshRequest(body: TokenRefreshRequestBody): Promise<TokenRefreshResponse> {
  return launcherRequest({
    url: '/launcher/token/refresh',
    body,
  });
}

export function hardwareCodeActivateRequest(body: HardwareCodeActivateRequestBody): Promise<HardwareCodeActivateResponse> {
  return launcherRequest({
    url: '/launcher/hardwareCode/activate',
    body,
  }, false);
}

export function getLauncherDistribRequest(): Promise<GetLauncherDistribResponse> {
  return launcherRequest({
    url: '/launcher/GetLauncherDistrib',
  }, false);
}

export function getUnpackedDistribRequest(): Promise<GetUnpackedDistribResponse> {
  return launcherRequest({
    url: '/launcher/GetUnpackedDistrib',
    qs: {
      branch: 'live',
      version: GAME_VERSION,
    },
  });
}

export function configRequest(): Promise<ConfigResponse> {
  return launcherRequest({
    url: '/launcher/config',
  });
}

export async function gameStartRequest(body: GameStartRequestBody): Promise<GameStartResponse> {
  return launcherRequest({
    baseUrl: PROD_ENDPOINT,
    url: '/launcher/game/start',
    qs: {
      branch: 'live',
    },
    body,
  });
}
