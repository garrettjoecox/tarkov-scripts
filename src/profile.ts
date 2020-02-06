import { ProfileSide } from './types/profile';
import { getProfilesRequest, selectProfilesRequest } from './api/profile';

export async function getProfiles() {
  const response = await getProfilesRequest();

  return response.data;
}

export async function selectProfile(profileId: string) {
  const response = await selectProfilesRequest({
    uid: profileId,
  });

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
