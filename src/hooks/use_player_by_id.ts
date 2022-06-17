import { useContext } from "react";
import { AppDataContext } from "app_content";
import { AppData, Player } from "types";

export const usePlayerById = (id: number): Player => {
  const { players } = useContext(AppDataContext) as AppData;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return players.find((player) => player.id === id)!;
};
