
import { loginRequest, gameStartRequest, getLauncherDistribRequest, getUnpackedDistribRequest, hardwareCodeActivateRequest, tokenRefreshRequest } from './api/launcher';
import { LoginPayload, HardwareCodeActivatePayload } from './types/api/launcher';
import { set, get } from './storage';
import { GAME_VERSION, LAUNCHER_VERSION } from './constants';
import { findOrCreateHwCode } from './utils';

export async function login(payload: LoginPayload) {
  const response = await loginRequest({
    email: payload.email,
    pass: payload.password,
    hwCode: await findOrCreateHwCode(),
    captcha: null,
  });

  await set('auth.accessToken', response.data.access_token);
  await set('auth.refreshToken', response.data.refresh_token);
  await set('auth.tokenExpiration', Date.now() + (response.data.expires_in * 1000));

  return response.data;
}

export async function tokenRefresh() {
  const response = await tokenRefreshRequest({
    grant_type: 'refresh_token',
    refresh_token: await get('auth.refreshToken'),
    client_id: 0,
  });

  await set('auth.accessToken', response.data.access_token);
  await set('auth.refreshToken', response.data.refresh_token);
  await set('auth.tokenExpiration', Date.now() + (response.data.expires_in * 1000));

  return response.data;
}

export async function getLauncherDistrib() {
  const response = await getLauncherDistribRequest();

  if (response.data.Version !== LAUNCHER_VERSION) {
    throw new Error('Launcher version mismatch, please update');
  }

  return response.data;
}

export async function getUnpackedDistrib() {
  const response = await getUnpackedDistribRequest();

  if (response.data.Version !== GAME_VERSION) {
    throw new Error('Game version mismatch, please update');
  }

  return response.data;
}

export async function gameStart() {
  const response = await gameStartRequest({
    version: {
      major: GAME_VERSION,
      game: 'live',
      backend: '6'
    },
    hwCode: await findOrCreateHwCode(),
  });

  await set('auth.session', response.data.session);

  return response.data;
}

export async function hardwareCodeActivate(payload: HardwareCodeActivatePayload) {
  const response = await hardwareCodeActivateRequest({
    email: payload.email,
    hwCode: await findOrCreateHwCode(),
    activateCode: payload.activateCode,
  });

  return response.data;
}
