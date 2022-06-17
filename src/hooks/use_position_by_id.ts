import { useContext } from "react";
import { AppDataContext } from "app_content";
import { AppData, Position } from "types";

export const usePositionById = (id: number): Position => {
  const { positions } = useContext(AppDataContext) as AppData;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return positions.find((position) => position.id === id)!;
};
