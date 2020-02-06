import { ApiResponse } from './index';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  pass: string;
  hwCode: string;
  captcha: string | null;
}

export interface LoginResponse extends ApiResponse {
  data: {
    aid: string;
    lang: string;
    region: string;
    gameVersion: string;
    // gameVersion: GameVersion
    dataCenters: string[];
    ipRegion: string;
    checkLegal: boolean;
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
  }
}

export interface TokenRefreshRequestBody {
  grant_type: string;
  refresh_token: string;
  client_id: number;
}

export interface TokenRefreshResponse extends ApiResponse {
  data: {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
  }
}

export interface GetLauncherDistribResponse extends ApiResponse {
  data: {
    Version: string;
    hash: string;
    DownloadUri: string;
  }
}

export interface GetUnpackedDistribResponse extends ApiResponse {
  data: {
    Version: string;
    DownloadUri: string;
  }
}

export interface ConfigResponse extends ApiResponse {
  data: {
    aid: number;
    nickname: string;
    ndaFree: false,
    gameVersion: string;
    // gameVersion: GameVersion;
    memberCategory: string;
    lang: string;
    region: string;
    ip_region: string;
    geoInfo: {
      country: string;
      continent: string;
    },
    purchaseIp: string;
    purchaseGeoInfo: {
      country: string;
      continent: string;
    },
    develop: boolean;
    registrationDate: string;
    purchaseDate: string;
    userAvatar: null,
    twitchEventMember: boolean,
    gameKeyType: string;
    // gameKeyType: GameKeyType;
    checkLegal: boolean,
    branchConfig: [
      {
        isDefault: boolean;
        isActive: boolean;
        name: string;
        siteUri: string;
        backendUri: string;
        logsUri: string;
        feedbackBehavior: string;
        status: number;
        participantStatus: number;
        selectedDataCenters: string[];
      }
    ]
  }
}

export interface GameStartRequestBody {
  version: {
    major: string;
    game: string;
    backend: string;
  },
  hwCode: string;
}

export interface GameStartResponse extends ApiResponse {
  data: {
    queued: boolean;
    session: string;
  }
}

export interface HardwareCodeActivatePayload {
  email: string;
  activateCode: string;
}

export interface HardwareCodeActivateRequestBody {
  email: string;
  hwCode: string;
  activateCode: string;
}

export interface HardwareCodeActivateResponse extends ApiResponse {
  data: {
    status: string;
  }
}
