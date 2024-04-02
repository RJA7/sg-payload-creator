import { BotMessageRewardsPayload, GameRewardType } from "../types";
import { getRewardTypes } from "./getRewardTypes";
import { isStartAtDuration, isStartAtEndAt } from "./expiryDate";

export function validate(payload: BotMessageRewardsPayload): string[] | null {
  const result: string[] = [];

  if (!payload.payloadId) {
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

  if (payload.expireDate && !payload.expireDate.startAt) {
    result.push("Expiry date 'startAt' must be specified");
  }

  if (isStartAtEndAt(payload.expireDate) && !payload.expireDate.endAt) {
    result.push("Expiry date 'endAt' must be specified");
  } else if (
    isStartAtDuration(payload.expireDate) &&
    !payload.expireDate.timeUntilExpire
  ) {
    result.push("Expiry date 'duration' must be specified");
  }

  const rewards = new Set<GameRewardType>();
  const possibleRewardTypes = getRewardTypes();

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

    rewards.add(reward.type);
  });

  return result.length === 0 ? null : result;
}
