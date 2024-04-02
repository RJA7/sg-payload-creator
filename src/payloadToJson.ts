import { BotMessageRewardsPayload } from "./types";

export function payloadToJson(payload: BotMessageRewardsPayload) {
  return JSON.stringify(payload, null, 2);
}
