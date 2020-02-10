import { getLocaleRequest, getItemsRequest, getTemplatesRequest } from './api/static';
import { Locale, Items, Templates } from './types/api/static';

let locale: Locale;
export async function getLocale() {
  if (!locale) {
    const response = await getLocaleRequest();

    locale = response.data;
  }

  return locale;
}

let items: Items;
export async function getItems() {
  if (!items) {
    const response = await getItemsRequest();

    items = response.data;
  }

  return items;
}

let templates: Templates;
export async function getTemplates() {
  if (!templates) {
    const response = await getTemplatesRequest();

    templates = response.data;
  }

  return templates;
}
