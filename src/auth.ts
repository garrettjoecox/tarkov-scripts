import _request from 'request-promise-native';

import { findOrCreateHwCode } from './utils';
import { prodRequest, loginRequest, activateHardwareRequest, startGameRequest } from './request';
import { set, get } from './storage';

export async function login(form: { email: string, password: string }) {
  let hwCode = await findOrCreateHwCode();

  const loginResponse = await loginRequest({
    email: form.email,
    password: form.password,
    hwCode,
    captcha: null,
  });

  if (loginResponse.err === 0) {
    await set('auth.accessToken', loginResponse.data.access_token);
    await set('auth.refreshToken', loginResponse.data.refresh_token);
    await set('auth.tokenExpiration', Date.now() + (loginResponse.data.expires_in * 1000));
  }

  return loginResponse;
}

export function keepAlive() {
  return prodRequest({
    method: 'POST',
    url: '/client/game/keepalive',
  });
}

export async function activateHardware(form: { email: string, code: string }) {
  let hwCode = await findOrCreateHwCode();

  return activateHardwareRequest({
    email: form.email,
    hwCode,
    code: form.code,
  });
}

export async function startGame() {
  let hwCode = await findOrCreateHwCode();
  let accessToken = await get('auth.accessToken');

  const startGameResponse = await startGameRequest({ hwCode, accessToken });

  if (startGameResponse.err === 0) {
    await set('auth.session', startGameResponse.data.session);
  }

  return startGameResponse;
}
