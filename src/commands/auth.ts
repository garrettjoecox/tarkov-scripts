import { prompt } from 'inquirer';
import { ParsedArgs } from 'minimist';

import { get, set } from '../storage';
import { hashString, generateHwCode } from '../utils';
import { login, hardwareCodeActivate } from '../launcher';
import { NewHardwareError } from '../errors';

export default async function auth(argv: ParsedArgs) {
  const credentials = await get('auth', {});

  if (!credentials || !credentials.email || !credentials.password || argv.force) {
    const newCredentials = await prompt([{
      type: 'input',
      name: 'email',
      message: 'Email:',
      default: credentials && credentials.email,
      validate(input: string) {
        return input ? true : 'Email required';
      },
    }, {
      type: 'password',
      name: 'password',
      message: 'Password (Your password is immediately hashed and stored in a file locally):',
      default: credentials && credentials.password,
      mask: true,
      validate(input: string) {
        return input ? true : 'Password required';
      },
    }]);

    credentials.email = newCredentials.email;
    if (credentials.password !== newCredentials.password) {
      credentials.password = hashString(newCredentials.password);
    }

    await set('auth', credentials);
  }

  let hwCode = await get('hwCode');

  if (!hwCode || argv.force) {
    if (!hwCode) hwCode = await generateHwCode();

    const newHwCode = await prompt({
      type: 'input',
      name: 'hwCode',
      message: 'Hardware Code (Automatically generated for you, unless you want to use an existing one):',
      default: hwCode,
      validate(input: string) {
        return input.match(/^#1-([\da-z]+:){2}([\da-z]+-){5}([\da-z]+)$/) ? true : 'Invalid Hardware Code';
      }
    });

    hwCode = newHwCode.hwCode;

    await set('hwCode', hwCode);
  }

  try {
    await login(credentials);
  } catch (error) {
    if (!(error instanceof NewHardwareError)) throw error;

    const hwCodeConfirm = await prompt({
      type: 'input',
      name: 'code',
      message: 'New hardware code detected, Confirmation code has been sent to your email',
    });

    await hardwareCodeActivate({ email: credentials.email, activateCode: hwCodeConfirm.code });
    await login(credentials);
  }

  console.log('Successfully authenticated');
}
