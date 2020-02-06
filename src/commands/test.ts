import { ParsedArgs } from 'minimist';
import { writeJSON } from 'fs-extra';
import { tradingRequest } from '../api';
import { Traders } from '../constants';

export default async function deals(argv: ParsedArgs) {
  const response = await tradingRequest({
    url: `/client/trading/api/getUserAssortPrice/trader/${Traders.skier.id}`,
  });

  await writeJSON('data.json', response, { spaces: 2 });
  console.log('Written to JSON');
}
