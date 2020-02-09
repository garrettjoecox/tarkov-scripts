import { ParsedArgs } from 'minimist';
import { writeJSON } from 'fs-extra';
import { prodRequest, tradingRequest } from '../api';
import { TRADERS } from '../constants';
import { random } from 'lodash';
import { throttle } from '../utils';

export default async function deals(argv: ParsedArgs) {
  // const response = await tradingRequest({
  //   url: `/client/trading/api/getUserAssortPrice/trader/${TRADERS.therapist.id}`,
  // });

  // await writeJSON('data/userAssort.json', response, { spaces: 2 });
}
