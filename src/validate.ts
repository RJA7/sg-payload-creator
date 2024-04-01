import { RewardPayload } from "./types";

export function validate(payload: RewardPayload): string[] | null {
  const result: string[] = [];

  if (!payload.id) {
    result.push("ID must be specified");
  }

  if (payload.rewards.length === 0) {
    result.push("At least one reward has to be specified");
  }

  const rewards = new Set();

  payload.rewards.forEach((reward) => {
    if (rewards.has(reward.type)) {
      result.push(`More than one ${reward.type} reward items`);
    }

    rewards.add(reward.type);
  });

  return result.length === 0 ? null : result;
}
