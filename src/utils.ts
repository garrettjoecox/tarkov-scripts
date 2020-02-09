import { createHash, randomBytes } from 'crypto';
import { inflate, deflate } from 'zlib';
import { random } from 'lodash';

import { get, set } from './storage';
import { getProfiles, selectMainProfile } from './profile';
import { ProfileSide, InvetoryItem } from './types/profile';
import { ITEMS } from './constants';
import { tokenRefresh, gameStart } from './launcher';

export async function findOrCreateHwCode(): Promise<string> {
  let hwCode = await get('hwCode');

  if (!hwCode) {
    hwCode = generateHwCode();
    await set('hwCode', hwCode);
  }

  return Promise.resolve(hwCode);
}

export function generateHwCode(): string {
  return `#1-${randomHash()}:${randomHash()}:${randomHash()}-${randomHash()}-${randomHash()}-${randomHash()}-${randomHash()}-${randomHash(true)}`;
}

function randomHash(short: boolean = false): string {
  const seed = randomBytes(20).toString('hex');
  const hash = hashString(seed);

  if (short) {
    return hash.slice(0, -8);
  }

  return hash;
}

export function decompress(buffer: Buffer): Promise<any> {
  return new Promise((resolve, reject) => {
    inflate(buffer, (err, result) => {
      if (err) reject(err);
      else resolve(JSON.parse(result.toString()));
    });
  });
}

export function compress(data: object): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    deflate(JSON.stringify(data), (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

export function hashString(string: string): string {
  return createHash('md5').update(string).digest('hex');
}

export function waitRandom(min: number = 2000, max: number = 5000): Promise<void> {
  const ms = random(min, max);
  return new Promise(r => setTimeout(r, ms));
}

export async function getMoneyStack(minAmount?: number): Promise<InvetoryItem> {
  const profiles = await getProfiles();
  const profile = profiles.find((profile) => profile.Info.Side !== ProfileSide.Savage);

  const [moneyStack] = profile.Inventory.items
    .filter((item) => item._tpl === ITEMS.roubles && (!minAmount || item.upd.StackObjectsCount > minAmount));

  if (!moneyStack) throw new Error(`No money stacks above ${minAmount}`);

  return moneyStack;
}

export async function ensureAuthenticated(): Promise<void> {
  let validSession: boolean;
  try {
    await getProfiles();
    validSession = true;
  } catch (error) {
    validSession = false;
  }

  if (!validSession) {
    const tokenExpiration = await get('auth.tokenExpiration');
    if (tokenExpiration < Date.now()) {
      console.log('Access token expired, refreshing');
      await tokenRefresh();
    } else {
      console.log('Access token still valid');
    }

    console.log('Starting session');
    await gameStart();
    await selectMainProfile();
  } else {
    console.log('Already authenticated');
  }
}

const queue: Function[] = [];
let lastWork: number = 0;

export async function throttle() {
  return new Promise(resolve => {
    queue.push(resolve);
  });
}

(function work() {
  if (!queue.length) return setTimeout(work, 1000);
  const waitTime = random(2000, 5000);

  if ((Date.now() - lastWork) > 2000) {
    queue.shift()();
    lastWork = Date.now();
    setTimeout(work, waitTime);
  } else {
    setTimeout(work, (lastWork + waitTime) - Date.now());
  }
})();
