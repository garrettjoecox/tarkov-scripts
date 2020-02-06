import { ParsedArgs } from 'minimist';

import { set } from '../storage';
import { decompress } from '../utils';

export default async function deals(argv: ParsedArgs) {
  const session = await decompress(Buffer.from(argv._[1], 'base64'));
  if (session && session.data && session.data.session) {
    await set('auth.session', session.data.session);
    console.log('Session decrypted');
  } else {
    console.log('There was an issue decrypting your session');
  }
}
