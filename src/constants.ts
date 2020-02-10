export const GAME_VERSION = '0.12.3.5776';
export const LAUNCHER_VERSION = '0.9.2.970';
export const UNITY_VERSION = '2018.4.13f1';

export const LAUNCHER_ENDPOINT = 'https://launcher.escapefromtarkov.com';
export const PROD_ENDPOINT = 'https://prod.escapefromtarkov.com';
export const TRADING_ENDPOINT = 'https://trading.escapefromtarkov.com';
export const RAGFAIR_ENDPOINT = 'https://ragfair.escapefromtarkov.com';

export enum ITEMS {
  roubles = '5449016a4bdc2d6f028b456f',
}

export const TRADERS = {
  prapor: {
    id: '54cb50c76803fa8b248b4571',
    multiplier: 0.55,
  },
  therapist: {
    id: '54cb57776803fa99248b456e',
    multiplier: 0.75,
  },
  fence: {
    id: '579dc571d53a0658a154fbec',
    multiplier: 0.30,
  },
  skier: {
    id: '58330581ace78e27b8b10cee',
    multiplier: 0.67,
  },
  peacekeeper: {
    id: '5935c25fb3acc3127c3d8cd9',
    multiplier: 0.55,
  },
  mechanic: {
    id: '5a7c2eca46aef81a7ca2145d',
    multiplier: 0.57,
  },
  ragman: {
    id: '5ac3b934156ae10c4430e83c',
    multiplier: 0.60,
  },
  jaeger: {
    id: '5c0647fdd443bc2504c2d371',
    multiplier: 0.55,
  },
};

export const CATEGORIES: {
  [index: string]: {
    name: string;
    id: string;
    parentId?: string;
    traders: {
      id: string;
      multiplier: number;
    }[];
  };
} = {
  '5b47574386f77428ca22b33e': {
    name: 'Barter items',
    id: '5b47574386f77428ca22b33e',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.ragman,
    ],
  },
  '5b47574386f77428ca22b2f4': {
    name: 'Others',
    id: '5b47574386f77428ca22b2f4',
    parentId: '5b47574386f77428ca22b33e',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.ragman,
    ],
  },
  '5b47574386f77428ca22b2ee': {
    name: 'Building materials',
    id: '5b47574386f77428ca22b2ee',
    parentId: '5b47574386f77428ca22b33e',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.ragman,
    ],
  },
  '5b47574386f77428ca22b2ef': {
    name: 'Electronics',
    id: '5b47574386f77428ca22b2ef',
    parentId: '5b47574386f77428ca22b33e',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
      TRADERS.ragman,
    ],
  },
  '5b47574386f77428ca22b2ed': {
    name: 'Energy elements',
    id: '5b47574386f77428ca22b2ed',
    parentId: '5b47574386f77428ca22b33e',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.ragman,
      TRADERS.jaeger,
    ],
  },
  '5b47574386f77428ca22b2f2': {
    name: 'Flammable materials',
    id: '5b47574386f77428ca22b2f2',
    parentId: '5b47574386f77428ca22b33e',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.ragman,
    ],
  },
  '5b47574386f77428ca22b2f0': {
    name: 'Household materials',
    id: '5b47574386f77428ca22b2f0',
    parentId: '5b47574386f77428ca22b33e',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.ragman,
    ],
  },
  '5b47574386f77428ca22b2f3': {
    name: 'Medical supplies',
    id: '5b47574386f77428ca22b2f3',
    parentId: '5b47574386f77428ca22b33e',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.ragman,
      TRADERS.jaeger,
    ],
  },
  '5b47574386f77428ca22b2f6': {
    name: 'Tools',
    id: '5b47574386f77428ca22b2f6',
    parentId: '5b47574386f77428ca22b33e',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.ragman,
    ],
  },
  '5b47574386f77428ca22b2f1': {
    name: 'Valuables',
    id: '5b47574386f77428ca22b2f1',
    parentId: '5b47574386f77428ca22b33e',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.ragman,
    ],
  },
  '5b47574386f77428ca22b33f': {
    name: 'Gear',
    id: '5b47574386f77428ca22b33f',
    traders: [],
  },
  '5b5f701386f774093f2ecf0f': {
    name: 'Armor vests',
    id: '5b5f701386f774093f2ecf0f',
    parentId: '5b47574386f77428ca22b33f',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.ragman,
      TRADERS.jaeger,
    ],
  },
  '5b5f6f6c86f774093f2ecf0b': {
    name: 'Backpacks',
    id: '5b5f6f6c86f774093f2ecf0b',
    parentId: '5b47574386f77428ca22b33f',
    traders: [
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.ragman,
      TRADERS.jaeger,
    ],
  },
  '5b5f6fa186f77409407a7eb7': {
    name: 'Containers & cases',
    id: '5b5f6fa186f77409407a7eb7',
    parentId: '5b47574386f77428ca22b33f',
    traders: [
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.ragman,
    ],
  },
  '5b47574386f77428ca22b32f': {
    name: 'Facecovers',
    id: '5b47574386f77428ca22b32f',
    parentId: '5b47574386f77428ca22b33f',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.ragman,
      TRADERS.jaeger,
    ],
  },
  '5b5f704686f77447ec5d76d7': {
    name: 'Gear components',
    id: '5b5f704686f77447ec5d76d7',
    parentId: '5b47574386f77428ca22b33f',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.ragman,
      TRADERS.jaeger,
    ],
  },
  '5b5f6f3c86f774094242ef87': {
    name: 'Headsets',
    id: '5b5f6f3c86f774094242ef87',
    parentId: '5b47574386f77428ca22b33f',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.ragman,
      TRADERS.jaeger,
    ],
  },
  '5b47574386f77428ca22b330': {
    name: 'Headwear & helmets',
    id: '5b47574386f77428ca22b330',
    parentId: '5b47574386f77428ca22b33f',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.ragman,
      TRADERS.jaeger,
    ],
  },
  '5b5f6fd286f774093f2ecf0d': {
    name: 'Secured containers',
    id: '5b5f6fd286f774093f2ecf0d',
    parentId: '5b47574386f77428ca22b33f',
    traders: [],
  },
  '5b5f6f8786f77447ed563642': {
    name: 'Tactical rigs',
    id: '5b5f6f8786f77447ed563642',
    parentId: '5b47574386f77428ca22b33f',
    traders: [
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.ragman,
      TRADERS.jaeger,
    ],
  },
  '5b47574386f77428ca22b331': {
    name: 'Visors',
    id: '5b47574386f77428ca22b331',
    parentId: '5b47574386f77428ca22b33f',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.ragman,
      TRADERS.jaeger,
    ],
  },
  '5b5f71a686f77447ed5636ab': {
    name: 'Weapon parts & mods',
    id: '5b5f71a686f77447ed5636ab',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.mechanic,
    ],
  },
  '5b5f71b386f774093f2ecf11': {
    name: 'Functional mods',
    id: '5b5f71b386f774093f2ecf11',
    parentId: '5b5f71a686f77447ed5636ab',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.mechanic,
    ],
  },
  '5b5f74cc86f77447ec5d770a': {
    name: 'Auxilary parts',
    id: '5b5f74cc86f77447ec5d770a',
    parentId: '5b5f71b386f774093f2ecf11',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.mechanic,
    ],
  },
  '5b5f71c186f77409407a7ec0': {
    name: 'Bipods',
    id: '5b5f71c186f77409407a7ec0',
    parentId: '5b5f71b386f774093f2ecf11',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f71de86f774093f2ecf13': {
    name: 'Fore grips',
    id: '5b5f71de86f774093f2ecf13',
    parentId: '5b5f71b386f774093f2ecf11',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f736886f774094242f193': {
    name: 'Light & laser devices',
    id: '5b5f736886f774094242f193',
    parentId: '5b5f71b386f774093f2ecf11',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f73ab86f774094242f195': {
    name: 'Flashlights',
    id: '5b5f73ab86f774094242f195',
    parentId: '5b5f736886f774094242f193',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f73c486f77447ec5d7704': {
    name: 'Laser target pointers',
    id: '5b5f73c486f77447ec5d7704',
    parentId: '5b5f736886f774094242f193',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f737886f774093e6cb4fb': {
    name: 'Tactical combo devices',
    id: '5b5f737886f774093e6cb4fb',
    parentId: '5b5f736886f774094242f193',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f724186f77447ed5636ad': {
    name: 'Muzzle devices',
    id: '5b5f724186f77447ed5636ad',
    parentId: '5b5f71b386f774093f2ecf11',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f724c86f774093f2ecf15': {
    name: 'Flashhiders & brakes',
    id: '5b5f724c86f774093f2ecf15',
    parentId: '5b5f724186f77447ed5636ad',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f72f786f77447ec5d7702': {
    name: 'Muzzle adapters',
    id: '5b5f72f786f77447ec5d7702',
    parentId: '5b5f724186f77447ed5636ad',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f731a86f774093e6cb4f9': {
    name: 'Suppressors',
    id: '5b5f731a86f774093e6cb4f9',
    parentId: '5b5f724186f77447ed5636ad',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f73ec86f774093e6cb4fd': {
    name: 'Sights',
    id: '5b5f73ec86f774093e6cb4fd',
    parentId: '5b5f71b386f774093f2ecf11',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f740a86f77447ec5d7706': {
    name: 'Assualt scopes',
    id: '5b5f740a86f77447ec5d7706',
    parentId: '5b5f73ec86f774093e6cb4fd',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f742686f774093e6cb4ff': {
    name: 'Collimators',
    id: '5b5f742686f774093e6cb4ff',
    parentId: '5b5f73ec86f774093e6cb4fd',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f744786f774094242f197': {
    name: 'Compact collimators',
    id: '5b5f744786f774094242f197',
    parentId: '5b5f73ec86f774093e6cb4fd',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f746686f77447ec5d7708': {
    name: 'Iron sights',
    id: '5b5f746686f77447ec5d7708',
    parentId: '5b5f73ec86f774093e6cb4fd',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f748386f774093e6cb501': {
    name: 'Optics',
    id: '5b5f748386f774093e6cb501',
    parentId: '5b5f73ec86f774093e6cb4fd',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f749986f774094242f199': {
    name: 'Special sights',
    id: '5b5f749986f774094242f199',
    parentId: '5b5f73ec86f774093e6cb4fd',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f750686f774093e6cb503': {
    name: 'Gear mods',
    id: '5b5f750686f774093e6cb503',
    parentId: '5b5f71a686f77447ed5636ab',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f751486f77447ec5d770c': {
    name: 'Charging handles',
    id: '5b5f751486f77447ec5d770c',
    parentId: '5b5f750686f774093e6cb503',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f754a86f774094242f19b': {
    name: 'Magazines',
    id: '5b5f754a86f774094242f19b',
    parentId: '5b5f750686f774093e6cb503',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f755f86f77447ec5d770e': {
    name: 'Mounts',
    id: '5b5f755f86f77447ec5d770e',
    parentId: '5b5f750686f774093e6cb503',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f757486f774093e6cb507': {
    name: 'Stocks & chassis',
    id: '5b5f757486f774093e6cb507',
    parentId: '5b5f750686f774093e6cb503',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f75b986f77447ec5d7710': {
    name: 'Vital parts',
    id: '5b5f75b986f77447ec5d7710',
    parentId: '5b5f71a686f77447ed5636ab',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f75c686f774094242f19f': {
    name: 'Barrels',
    id: '5b5f75c686f774094242f19f',
    parentId: '5b5f75b986f77447ec5d7710',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f760586f774093e6cb509': {
    name: 'Gas blocks',
    id: '5b5f760586f774093e6cb509',
    parentId: '5b5f75b986f77447ec5d7710',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f75e486f77447ec5d7712': {
    name: 'Handguards',
    id: '5b5f75e486f77447ec5d7712',
    parentId: '5b5f75b986f77447ec5d7710',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f761f86f774094242f1a1': {
    name: 'Pistol grips',
    id: '5b5f761f86f774094242f1a1',
    parentId: '5b5f75b986f77447ec5d7710',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f764186f77447ec5d7714': {
    name: 'Receivers & slides',
    id: '5b5f764186f77447ec5d7714',
    parentId: '5b5f75b986f77447ec5d7710',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.skier,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
    ],
  },
  '5b5f78dc86f77409407a7f8e': {
    name: 'Weapons',
    id: '5b5f78dc86f77409407a7f8e',
    traders: [
      TRADERS.fence,
    ],
  },
  '5b5f78e986f77447ed5636b1': {
    name: 'Assault carbines',
    id: '5b5f78e986f77447ed5636b1',
    parentId: '5b5f78dc86f77409407a7f8e',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
      TRADERS.jaeger,
    ],
  },
  '5b5f78fc86f77409407a7f90': {
    name: 'Assault rifles',
    id: '5b5f78fc86f77409407a7f90',
    parentId: '5b5f78dc86f77409407a7f8e',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
      TRADERS.jaeger,
    ],
  },
  '5b5f798886f77447ed5636b5': {
    name: 'Bolt-action rifles',
    id: '5b5f798886f77447ed5636b5',
    parentId: '5b5f78dc86f77409407a7f8e',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
      TRADERS.jaeger,
    ],
  },
  '5b5f79a486f77409407a7f94': {
    name: 'Machine guns',
    id: '5b5f79a486f77409407a7f94',
    parentId: '5b5f78dc86f77409407a7f8e',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
      TRADERS.jaeger,
    ],
  },
  '5b5f791486f774093f2ed3be': {
    name: 'Marksman rifles',
    id: '5b5f791486f774093f2ed3be',
    parentId: '5b5f78dc86f77409407a7f8e',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
      TRADERS.jaeger,
    ],
  },
  '5b5f7a0886f77409407a7f96': {
    name: 'Melee weapons',
    id: '5b5f7a0886f77409407a7f96',
    parentId: '5b5f78dc86f77409407a7f8e',
    traders: [
      TRADERS.fence,
      TRADERS.jaeger,
    ],
  },
  '5b5f792486f77447ed5636b3': {
    name: 'Pistols',
    id: '5b5f792486f77447ed5636b3',
    parentId: '5b5f78dc86f77409407a7f8e',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
      TRADERS.jaeger,
    ],
  },
  '5b5f796a86f774093f2ed3c0': {
    name: 'SMGs',
    id: '5b5f796a86f774093f2ed3c0',
    parentId: '5b5f78dc86f77409407a7f8e',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
      TRADERS.jaeger,
    ],
  },
  '5b5f794b86f77409407a7f92': {
    name: 'Shotguns',
    id: '5b5f794b86f77409407a7f92',
    parentId: '5b5f78dc86f77409407a7f8e',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.peacekeeper,
      TRADERS.mechanic,
      TRADERS.jaeger,
    ],
  },
  '5b5f7a2386f774093f2ed3c4': {
    name: 'Throwables',
    id: '5b5f7a2386f774093f2ed3c4',
    parentId: '5b5f78dc86f77409407a7f8e',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
    ],
  },
  '5b47574386f77428ca22b346': {
    name: 'Ammo',
    id: '5b47574386f77428ca22b346',
    traders: [
      TRADERS.fence,
    ],
  },
  '5b47574386f77428ca22b33c': {
    name: 'Ammo boxes',
    id: '5b47574386f77428ca22b33c',
    parentId: '5b47574386f77428ca22b346',
    traders: [
      TRADERS.fence,
    ],
  },
  '5b47574386f77428ca22b33b': {
    name: 'Rounds',
    id: '5b47574386f77428ca22b33b',
    parentId: '5b47574386f77428ca22b346',
    traders: [
      TRADERS.prapor,
      TRADERS.fence,
      TRADERS.mechanic,
      TRADERS.jaeger,
    ],
  },
  '5b47574386f77428ca22b340': {
    name: 'Provisions',
    id: '5b47574386f77428ca22b340',
    traders: [
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.jaeger,
    ],
  },
  '5b47574386f77428ca22b335': {
    name: 'Drinks',
    id: '5b47574386f77428ca22b335',
    parentId: '5b47574386f77428ca22b340',
    traders: [
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.jaeger,
    ],
  },
  '5b47574386f77428ca22b336': {
    name: 'Food',
    id: '5b47574386f77428ca22b336',
    parentId: '5b47574386f77428ca22b340',
    traders: [
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.jaeger,
    ],
  },
  '5b47574386f77428ca22b344': {
    name: 'Medical treatment',
    id: '5b47574386f77428ca22b344',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.jaeger,
    ],
  },
  '5b47574386f77428ca22b33a': {
    name: 'Injectors',
    id: '5b47574386f77428ca22b33a',
    parentId: '5b47574386f77428ca22b344',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.jaeger,
    ],
  },
  '5b47574386f77428ca22b339': {
    name: 'Injury treatment',
    id: '5b47574386f77428ca22b339',
    parentId: '5b47574386f77428ca22b344',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.jaeger,
    ],
  },
  '5b47574386f77428ca22b338': {
    name: 'Medkits',
    id: '5b47574386f77428ca22b338',
    parentId: '5b47574386f77428ca22b344',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.jaeger,
    ],
  },
  '5b47574386f77428ca22b337': {
    name: 'Pills',
    id: '5b47574386f77428ca22b337',
    parentId: '5b47574386f77428ca22b344',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.jaeger,
    ],
  },
  '5b47574386f77428ca22b342': {
    name: 'Keys',
    id: '5b47574386f77428ca22b342',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.jaeger,
    ],
  },
  '5c518ed586f774119a772aee': {
    name: 'Electronic keys',
    id: '5c518ed586f774119a772aee',
    parentId: '5b47574386f77428ca22b342',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.jaeger,
    ],
  },
  '5c518ec986f7743b68682ce2': {
    name: 'Mechanical keys',
    id: '5c518ec986f7743b68682ce2',
    parentId: '5b47574386f77428ca22b342',
    traders: [
      TRADERS.prapor,
      TRADERS.therapist,
      TRADERS.fence,
      TRADERS.jaeger,
    ],
  },
  '5b47574386f77428ca22b341': {
    name: 'Info items',
    id: '5b47574386f77428ca22b341',
    traders: [
      // TRADERS.fence,
      // TRADERS.peacekeeper,
    ],
  },
  '5b47574386f77428ca22b345': {
    name: 'Special equipment',
    id: '5b47574386f77428ca22b345',
    traders: [],
  },
  '5b47574386f77428ca22b343': {
    name: 'Maps',
    id: '5b47574386f77428ca22b343',
    traders: [],
  },
  '5b5f78b786f77447ed5636af': {
    name: 'Money',
    id: '5b5f78b786f77447ed5636af',
    traders: [],
  },
};
