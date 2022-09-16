import { Fixture } from "./fixture";
import { Performance } from "./performance";
import { PlayerPast } from "./player_past";

export interface PlayerSummary {
  fixtures: Fixture[];
  history: Performance[];
  history_past: PlayerPast[];
}
