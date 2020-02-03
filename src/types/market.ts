export enum SortType {
  ID = 0,
  BarteringOffers = 2,
  MerchantRating = 3,
  Price = 5,
  Expiration = 6,
}

export enum SortDirection {
  ASC = 0,
  DESC = 1,
}

export enum CurrencyType {
  Any = 0,
  Rouble = 1,
  Dollar = 2,
  Euro = 3,
}

export enum OwnerType {
  Any = 0,
  Trader = 1,
  Player = 2,
}

export interface MarketSearch {
  page: number;
  limit?: number;
  sortType?: SortType;
  sortDirection?: SortDirection;
  currency?: CurrencyType;
  priceFrom?: number;
  priceTo?: number;
  quantityFrom?: number;
  quantityTo?: number;
  conditionFrom?: number;
  conditionTo?: number;
  oneHourExpiration?: boolean;
  removeBartering?: boolean;
  ownerType?: OwnerType;
  onlyFunctional?: boolean;
  handbookId?: string;
  linkedSearchId?: string;
  requiredSearchId?: string;
  updateOfferCount?: boolean;
  tm?: number;
}

export interface Offer {
  _id: string;
  requirementsCost: number;
  itemsCost: number;
  user: User;
  items: {
    _tpl: string;
  }[]
}

export interface User {
  nickname: string;
}
