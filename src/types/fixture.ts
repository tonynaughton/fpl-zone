export interface Fixture {
  id: number;
  code: number;
  team_h: number;
  team_h_score?: unknown;
  team_a: number;
  team_a_score?: unknown;
  event: number;
  finished: boolean;
  minutes: number;
  provisional_start_time: boolean;
  kickoff_time: Date;
  event_name: string;
  is_home: boolean;
  difficulty: number;
}
