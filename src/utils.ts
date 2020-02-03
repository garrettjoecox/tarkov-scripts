import { createHash, randomBytes } from 'crypto';
import { inflate, deflate } from 'zlib';
import { random } from 'lodash';

import { get, set } from './storage';

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

export function decompress(buffer: Buffer): Promise<string> {
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

export function waitRandom(min: number = 3000, max: number = 15000): Promise<void> {
  const ms = random(min, max);
  return new Promise(r => setTimeout(r, ms));
}
