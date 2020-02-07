import { ParsedArgs } from 'minimist';

import { set } from '../storage';
import { decompress } from '../utils';
import { selectMainProfile } from '../profile';
import { gameStart } from '../launcher';

export default async function session(argv: ParsedArgs) {
  if (argv._[1]) {
    const decrypted = await decompress(Buffer.from(argv._[1], 'base64'));
    await set('auth.session', decrypted.data.session);
    console.log('Session restored');
  } else {
    await gameStart();
    await selectMainProfile();
    console.log('Session started');
  }
}
