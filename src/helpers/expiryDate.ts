import {
  BotMessageRewardsPayload,
  ExpiryDateStartAtDuration,
  ExpiryDateStartAtEndAt,
  ExpiryDateType,
} from "../types";

export function isStartAtEndAt(
  expiryDate: BotMessageRewardsPayload["expireDate"],
): expiryDate is ExpiryDateStartAtEndAt {
  return Boolean(expiryDate && "endAt" in expiryDate);
}

export function isStartAtDuration(
  expiryDate: BotMessageRewardsPayload["expireDate"],
): expiryDate is ExpiryDateStartAtDuration {
  return Boolean(expiryDate && "timeUntilExpire" in expiryDate);
}

export function getExpiryDateType(
  expiryDate: BotMessageRewardsPayload["expireDate"],
): ExpiryDateType {
  if (!expiryDate) {
    return ExpiryDateType.Unset;
  }

  if ("endAt" in expiryDate) {
    return ExpiryDateType.StartAtEndAt;
  }

  return ExpiryDateType.StartAtDuration;
}
