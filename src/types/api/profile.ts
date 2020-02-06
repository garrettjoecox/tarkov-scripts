import { ApiResponse } from './index';
import { Profile } from '../profile';

export interface GetProfilesResponse extends ApiResponse {
  data: Profile[];
}

export interface SelectProfileRequestBody {
  uid: string;
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
