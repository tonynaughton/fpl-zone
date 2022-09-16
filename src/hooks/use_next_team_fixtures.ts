import { Fixture, Player, Team } from "types";

import { BaseItem } from "components/fdr/fdr";

export const useNextTeamFixtures = (baseItem: BaseItem, fixtures: Fixture[][]): Fixture[][] => {
  const teamId = "team" in baseItem ? (baseItem as Player).team : (baseItem as Team).id;

  return fixtures.map((gameweek) => {
    return gameweek.filter((f) => f.team_h === teamId || f.team_a === teamId);
  });
};
