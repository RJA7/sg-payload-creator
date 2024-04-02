import { BotMessageRewardsPayload, EntryPointData } from "../types";

export function payloadToJson(payload: BotMessageRewardsPayload) {
  const entryPointData: EntryPointData = {
    gamePayload: payload,
    entryPoint: "botMessage",
  };

  return JSON.stringify(entryPointData, null, 2);
}

export function payloadFromJson(payload: string): BotMessageRewardsPayload {
  const entryPointData: EntryPointData = JSON.parse(payload);
  return entryPointData.gamePayload;
}
