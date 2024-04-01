import { RewardPayload, RewardType } from "./types";

export function validate(payload: RewardPayload): string[] | null {
  const result: string[] = [];

  if (!payload.id) {
    result.push("ID must be specified");
  }

  if (!Array.isArray(payload.rewards)) {
    result.push("rewards must be an array");
  }

  if (payload.rewards.length === 0) {
    result.push("At least one reward has to be specified");
  }

  if (payload.rewards.some((reward) => reward.amount === 0)) {
    result.push("Reward amount must be positive");
  }

  const rewards = new Set<RewardType>();
  const possibleRewardTypes = Object.values(RewardType);

  payload.rewards.forEach((reward) => {
    if (rewards.has(reward.type)) {
      result.push(`More than one ${reward.type} reward items`);
    }

    if (!possibleRewardTypes.includes(reward.type)) {
      result.push(`Unknown reward type '${reward.type}'`);
    }

    if (reward.amount === 0) {
      result.push(`${reward.type} reward amount must be positive`);
    }

    if (reward.type === RewardType.Frame && !reward.name) {
      result.push(`${reward.type} name must be specified`);
    }

    rewards.add(reward.type);
  });

  return result.length === 0 ? null : result;
}
