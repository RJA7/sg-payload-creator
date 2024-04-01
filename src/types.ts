export type RewardPayload = {
  id: string;
  rewards: Reward[];
  expireAt?: number;
  cooldown?: number;
};

export type Reward = {
  type: RewardType;
  amount: number;
  name: string;
};

export enum RewardType {
  Bomb = "bomb",
  Ticket = "Ticket",
  Frame = "Frame",
}
