import { Profile } from './profile';
import { Offer } from './market';

export interface ApiResponse {
  err: number;
  errmsg: null | string;
  data: any;
}

export interface LoginResponse extends ApiResponse {
  data: {
    expires_in: number;
    token_type: string;
    access_token: string;
    refresh_token: string;
  }
}

export interface ActivateHardwareResponse extends ApiResponse {
  data: {
    status: string;
  }
}

export interface StartGameResponse extends ApiResponse {
  data: {
    queued: boolean;
    session: string;
  }
}

export interface GetProfilesResponse extends ApiResponse {
  data: Profile[],
}

export interface SelectProfileResponse extends ApiResponse {
  data: {
    status: string;
    notifier: {
      server: string;
      channel_id: string;
      url: string;
    };
    notifierServer: string;
  }
}

export interface SearchMarketResponse extends ApiResponse {
  data: {
    offers: Offer[];
    offersCount: number;
  };
}
