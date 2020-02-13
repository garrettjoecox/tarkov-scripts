#!/usr/bin/env node
import minimist from 'minimist';

import auth from './commands/auth';
import auto from './commands/auto';
import session from './commands/session';
import test from './commands/test';
import sellbox from './commands/sellbox';
import sellForMore from './commands/sellForMore';

const commandMap: {[key: string]: Function} = {
  auth,
  auto,
  session,
  test,
  sellbox,
  sellForMore,
};

(async () => {
  try {
    const argv = minimist(process.argv.slice(2));

    if (commandMap[argv._[0]]) {
      await commandMap[argv._[0]](argv);
      process.exit();
    } else {
      // Help
    }
  } catch (error) {
    console.error(error);
    process.exit();
  }
})();
