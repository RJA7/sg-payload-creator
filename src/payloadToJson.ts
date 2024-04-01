import { RewardPayload, RewardType } from "./types";

export function payloadToJson(payload: RewardPayload) {
  const copy: RewardPayload = {
    ...payload,
    rewards: payload.rewards.map((reward) => {
      const { name, ...partialReward } = reward;

      return {
        ...partialReward,
        ...(reward.type === RewardType.Frame ? { name } : ({} as { name: "" })),
      };
    }),
  };

  return JSON.stringify(copy, null, 2);
}
