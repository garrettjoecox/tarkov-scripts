import { readJson, writeJson } from 'fs-extra';
import _ from 'lodash';
import { resolve } from 'path';

const STORAGE_PATH = resolve(__dirname, '../storage.json');

export async function get(path: string, defaultValue?: any) {
  const data = await readJson(STORAGE_PATH);

  return _.get(data, path, defaultValue);
}

export async function set(path: string, value: any) {
  const data = await readJson(STORAGE_PATH);

  _.set(data, path, value);

  await writeJson(STORAGE_PATH, data, { spaces: 2 });

  return data;
}
