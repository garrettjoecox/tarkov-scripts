import { ApiResponse } from './index';

export interface Locale {
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

export interface GetLocaleResponse extends ApiResponse {
  data: Locale
}

export interface Items {
  [index: string]: {
    _id: string;
    _name: string;
    _parent: string;
    _type: string;
    _props: {
      CreditsPrice: number;
    }
  };
}

export interface GetItemsResponse extends ApiResponse {
  data: Items;
}

export interface Templates {
  Categories: {
    Id: string;
    ParentId: string;
    Icon: string;
    Color: string;
    Order: string;
  }[];
  Items: {
    Id: string;
    ParentId: string;
    Price: number;
  }[];
}

export interface GetTemplatesResponse extends ApiResponse {
  data: Templates;
}
