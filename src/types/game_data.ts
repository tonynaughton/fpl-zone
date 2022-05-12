import { GameSettings } from "./game_settings";
import { Gameweek } from "./gameweek";
import { Phase } from "./phase";
import { Player } from "./player";
import { PlayerStat } from "./player_stat";
import { Position } from "./position";
import { Team } from "./team";

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
