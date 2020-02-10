import { ParsedArgs } from 'minimist';
import { writeJSON } from 'fs-extra';
import { prodRequest, tradingRequest, ragfairRequest } from '../api';
import { TRADERS } from '../constants';
import { random } from 'lodash';
import { throttle } from '../utils';

export default async function deals(argv: ParsedArgs) {
  const response = await ragfairRequest({
    url: `/client/ragfair/itemMarketPrice`,
    body: {
      templateId: '59e3639286f7741777737013',
    }
  });

  await writeJSON('data/itemMarketPrice.json', response, { spaces: 2 });
}
