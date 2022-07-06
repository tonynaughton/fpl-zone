import { useContext } from "react";
import { AppDataContext } from "app_content";
import { maxBy, range } from "lodash";
import { AppData } from "types";

export const useNextFiveGameweekIds = (): number[] => {
  const { gameweeks } = useContext(AppDataContext) as AppData;

  // Const nextGwId = gameweeks.find((gw) => gw.is_next)?.id;
  const nextGwId = 20;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const lastGwId = maxBy(gameweeks, "id")!.id;

  return nextGwId
    ? range(nextGwId, ((nextGwId + 5) >= (lastGwId + 1) ? (lastGwId + 1) : nextGwId + 5))
    : [];
};
