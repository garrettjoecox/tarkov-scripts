import { prodRequest, getProfilesRequest, selectProfileRequest } from './request';
import { Profile, ProfileSide } from './types/profile';

export async function getProfiles(): Promise<Profile[]> {
  const response = await getProfilesRequest();

  return response.data;
}

export async function selectProfile(profileId: string) {
  const response = await selectProfileRequest(profileId);

  return response.data;
}

export async function selectMainProfile() {
  const profiles = await getProfiles();

  const profile = profiles.find((profile) => profile.Info.Side !== ProfileSide.Savage);

  return selectProfile(profile._id);
}

export async function selectSavageProfile() {
  const profiles = await getProfiles();

  const profile = profiles.find((profile) => profile.Info.Side === ProfileSide.Savage);

  return selectProfile(profile._id);
}
