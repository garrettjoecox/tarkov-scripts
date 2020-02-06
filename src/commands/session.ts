import { selectMainProfile } from '../profile';
import { gameStart } from '../launcher';

export default async function deals() {
  await gameStart();
  await selectMainProfile();
  console.log('Session started');
}
