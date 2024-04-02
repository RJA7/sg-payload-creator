export type BotMessageRewardsPayload = {
  payloadId: string;
  rewards: GameReward[];
  expireDate?: ExpiryDateStartAtDuration | ExpiryDateStartAtEndAt;
  cooldown?: number;
};

export type GameRewardType = BoosterType | GameCurrencyType;

export type GameReward = {
  type: GameRewardType;
  amount: number;
};

export enum BoosterType {
  Bomb = "bomb",
  MegaBomb = "MegaBomb",
  Fire = "fire",
  Combo3 = "combo3",
  Combo5 = "combo5",
  Combo7 = "combo7",
  PointZone = "pz",
}

export enum GameCurrencyType {
  Ticket = "Ticket",
}

export enum ExpiryDateType {
  Unset = "Unset",
  StartAtEndAt = "StartAtEndAt",
  StartAtDuration = "StartAtDuration",
}

export type ExpiryDateStartAtEndAt = {
  startAt: number;
  endAt: number;
};

export type ExpiryDateStartAtDuration = {
  startAt: number;
  timeUntilExpire: number;
};
