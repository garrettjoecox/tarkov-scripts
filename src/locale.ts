import { prodRequest } from './api';

interface Locale {
  interface: { [id: string]: string; };
  error: { [id: string]: string; };
  mail: { [id: string]: string; };
  quest: {
    [id: string]: {
      name: string;
      conditions: {
        [id: string]: string;
      };
      description: string;
      note: string;
      failMessageText: string;
      startedMessageText: string;
      successMessageText: string;
      location: string;
    };
  };
  preset: {
    [id: string]: {
      Name: string;
    };
  };
  handbook: { [id: string]: string; };
  season: { [id: string]: string; };
  templates: {
    [id: string]: {
      Name: string;
      ShortName: string;
      Description: string;
    };
  };
  locations: {
    [id: string]: {
      Name: string;
      Description: string;
    };
  };
  banners: {
    [id: string]: {
      name: string;
      description: string;
    };
  };
  trading: {
    [id: string]: {
      FullName: string;
      FirstName: string;
      Nickname: string;
      Location: string;
      Description: string;
    };
  };
}

let locale: Locale;

export async function getLocale() {
  if (!locale) {
    const response = await prodRequest({
      url: '/client/locale/en',
    });

    locale = response.data;
  }

  return locale;
}
