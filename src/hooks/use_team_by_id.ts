import { useContext } from "react";
import { AppDataContext } from "app_content";
import { AppData, Team } from "types";

export const useTeamById = (id: number): Team => {
  const { teams } = useContext(AppDataContext) as AppData;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return teams.find((team) => team.id === id)!;
};
