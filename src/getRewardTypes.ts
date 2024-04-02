import { BoosterType, GameCurrencyType, GameRewardType } from "./types";

export function getRewardTypes(): GameRewardType[] {
  const map: Record<GameRewardType, GameRewardType> = {
    [BoosterType.Bomb]: BoosterType.Bomb,
    [BoosterType.MegaBomb]: BoosterType.MegaBomb,
    [BoosterType.Fire]: BoosterType.Fire,
    [BoosterType.Combo3]: BoosterType.Combo3,
    [BoosterType.Combo5]: BoosterType.Combo5,
    [BoosterType.Combo7]: BoosterType.Combo7,
    [BoosterType.PointZone]: BoosterType.PointZone,
    [GameCurrencyType.Ticket]: GameCurrencyType.Ticket,
  };

  return Object.values(map);
}
