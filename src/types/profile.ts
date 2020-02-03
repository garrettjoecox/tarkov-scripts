
export enum ProfileSide {
  Bear = "Bear",
  Usec = "Usec",
  Savage = "Savage",
}

export interface Profile {
  _id: string;
  Info: {
    Nickname: string;
    Side: ProfileSide;
  };
  Inventory: {
    items: InvetoryItem[];
  }
}

export interface InvetoryItem {
  _id: string;
  _tpl: string;
  upd?: {
    StackObjectsCount: number;
  }
}
