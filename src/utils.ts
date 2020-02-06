import { createHash, randomBytes } from 'crypto';
import { inflate, deflate } from 'zlib';
import { random } from 'lodash';

import { get, set } from './storage';
import { getProfiles } from './profile';
import { ProfileSide, InvetoryItem } from './types/profile';
import { Items } from './constants';

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
    .filter((item) => item._tpl === Items.Roubles && (!minAmount || item.upd.StackObjectsCount > minAmount));

  if (!moneyStack) throw new Error(`No money stacks above ${minAmount}`);

  return moneyStack;
}
