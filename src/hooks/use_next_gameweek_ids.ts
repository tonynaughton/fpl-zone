import { useContext } from "react";
import { AppDataContext } from "app_content";
import { maxBy, range } from "lodash";
import { AppData } from "types";

export const useRemainingGameweekIds = (): number[] => {
  const { gameweeks } = useContext(AppDataContext) as AppData;

  const nextGwId = gameweeks.find((gw) => gw.is_next)?.id;
  const lastGwId = maxBy(gameweeks, "id")!.id;

  return nextGwId ? range(nextGwId, lastGwId + 1) : [];
};
