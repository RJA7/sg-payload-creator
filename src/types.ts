export type BotMessageRewardsPayload = {
  payloadId: string;
  rewards: GameReward[];
  expireDate?:
    | {
        startAt: number;
        timeUntilExpire: number;
      }
    | {
        startAt: number;
        endAt: number;
      };
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
