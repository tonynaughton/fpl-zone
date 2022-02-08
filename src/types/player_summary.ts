import { Fixture } from "./fixture";
import { PlayerPast } from "./player_past";
import { PlayerPerformance } from "./player_performance";

export interface PlayerSummary {
  fixtures: Fixture[];
  history: PlayerPerformance[];
  history_past: PlayerPast[];
}
