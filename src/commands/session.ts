import { startGame } from '../auth';
import { selectMainProfile } from '../profile';
import { ParsedArgs } from 'minimist';

export default async function deals(argv: ParsedArgs) {
  await startGame();
  await selectMainProfile();
  console.log('Session started');
}
