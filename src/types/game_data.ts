import { GameSettings, Gameweek, Phase, Player, PlayerStat, Position,Team } from "types";

export interface GameData {
  events: Gameweek[];
  game_settings: GameSettings;
  phases: Phase[];
  teams: Team[];
  total_players: number;
  elements: Player[];
  element_stats: PlayerStat[];
  element_types: Position[];
}
