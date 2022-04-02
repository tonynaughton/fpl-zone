import { LeagueType } from "./league";

export interface TeamData {
  id: number;
  joined_time: Date;
  started_event: number;
  favourite_team: number;
  player_first_name: string;
  player_last_name: string;
  player_region_id: number;
  player_region_name: string;
  player_region_iso_code_short: string;
  player_region_iso_code_long: string;
  summary_overall_points: number;
  summary_overall_rank: number;
  summary_event_points: number;
  summary_event_rank: number;
  current_event: number;
  leagues: LeagueType;
  name: string;
  name_change_blocked: boolean;
  kit: string;
  last_deadline_bank: number;
  last_deadline_value: number;
  last_deadline_total_transfers: number;
}
