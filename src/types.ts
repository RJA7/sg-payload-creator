export type RewardPayload = {
  id: string;
  rewards: Reward[];
  expireAt?: number;
  cooldown?: number;
};

export type Reward = {
  type: RewardType;
  amount: number;
};

export enum RewardType {
  Bomb = "Bomb",
}
