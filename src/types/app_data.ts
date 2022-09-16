import { Fixture, GameSettings, Gameweek, Phase, Player, PlayerStat, Position,Team } from "types";

export interface AppData {
  gameweeks: Gameweek[];
  gameSettings: GameSettings;
  phases: Phase[];
  teams: Team[];
  playerCount: number;
  players: Player[];
  playerStats: PlayerStat[];
  positions: Position[];
  fixtures: Fixture[];
  isMobile: boolean;
}
