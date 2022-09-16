
export interface StatValue {
  value: number;
  element: number;
}

interface Stat {
  identifier: string;
  a: StatValue[];
  h: StatValue[];
}

export interface Fixture {
  id: number;
  code: number;
  team_h: number;
  team_h_score?: number;
  team_h_difficulty: number;
  team_a: number;
  team_a_score?: number;
  team_a_difficulty: number;
  event: number | null;
  started: boolean | null;
  finished: boolean;
  minutes: number;
  provisional_start_time: boolean;
  kickoff_time: string | null;
  stats: Stat[];
  finished_provisional?: boolean;
  pulse_id: number;
}
