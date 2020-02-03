import { getProfiles } from '../profile';
import { ParsedArgs } from 'minimist';
import { writeJSON } from 'fs-extra';
import { ProfileSide } from '../types/profile';
import { searchMarket } from '../market';
import { SortType, SortDirection, CurrencyType, OwnerType } from '../types/market';

export default async function deals(argv: ParsedArgs) {
  // const profiles = await getProfiles();

  // const profile = profiles.find((profile) => profile.Info.Side !== ProfileSide.Savage);
  const searchResults = await searchMarket({
    page: 1,
    limit: 100,
    sortType: SortType.Price,
    sortDirection: SortDirection.ASC,
    currency: CurrencyType.Rouble,
    removeBartering: true,
    ownerType: OwnerType.Player,
    handbookId: '5b5f796a86f774093f2ed3c0',
  });

  await writeJSON('data.json', searchResults, { spaces: 2 });
  console.log('Written to JSON');
}
