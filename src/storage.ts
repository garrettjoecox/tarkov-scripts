import { readJson, writeJson, pathExists } from 'fs-extra';
import _ from 'lodash';
import { resolve } from 'path';

const STORAGE_PATH = resolve(__dirname, '../storage.json');
let storage: {
  hwCode?: string;
  auth?: {
    email?: string;
    password?: string;
    accessToken?: string;
    refreshToken?: string;
    tokenExpiration?: number;
    session?: string;
  }
};

export async function get(path: string, defaultValue?: any) {
  await loadStorage();

  return _.get(storage, path, defaultValue);
}

export async function set(path: string, value: any) {
  await loadStorage();

  _.set(storage, path, value);

  await writeJson(STORAGE_PATH, storage, { spaces: 2 });

  return storage;
}

async function loadStorage() {
  if (!storage) {
    if (await pathExists(STORAGE_PATH)) {
      storage = await readJson(STORAGE_PATH);
    } else {
      storage = {};
    }
  }
}
