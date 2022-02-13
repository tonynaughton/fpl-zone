interface NewEntries {
  has_next: boolean;
  page: number;
  results: unknown[];
}

export interface League {
  id: number;
  name: string;
  created: Date;
  closed: boolean;
  max_entries?: unknown;
  league_type: string;
  scoring: string;
  admin_entry: number;
  start_event: number;
  code_privacy: string;
  has_cup: boolean;
  cup_league?: unknown;
  rank?: unknown;
}

interface Classic {
  id: number;
  name: string;
  short_name: string;
  created: Date;
  closed: boolean;
  rank?: unknown;
  max_entries?: unknown;
  league_type: string;
  scoring: string;
  admin_entry?: number;
  start_event: number;
  entry_can_leave: boolean;
  entry_can_admin: boolean;
  entry_can_invite: boolean;
  has_cup: boolean;
  cup_league?: number;
  cup_qualified?: boolean;
  entry_rank: number;
  entry_last_rank: number;
}

interface H2h {
  id: number;
  name: string;
  short_name?: unknown;
  created: Date;
  closed: boolean;
  rank?: unknown;
  max_entries?: unknown;
  league_type: string;
  scoring: string;
  admin_entry?: number;
  start_event: number;
  entry_can_leave: boolean;
  entry_can_admin: boolean;
  entry_can_invite: boolean;
  has_cup: boolean;
  cup_league?: unknown;
  cup_qualified?: unknown;
  entry_rank: number;
  entry_last_rank: number;
}

interface Status {
  qualification_event?: unknown;
  qualification_numbers?: unknown;
  qualification_rank?: unknown;
  qualification_state?: unknown;
}

interface Cup {
  matches: unknown[];
  status: Status;
  cup_league: number;
}

interface CupMatch {
  id: number;
  entry_1_entry: number;
  entry_1_name: string;
  entry_1_player_name: string;
  entry_1_points: number;
  entry_1_win: number;
  entry_1_draw: number;
  entry_1_loss: number;
  entry_1_total: number;
  entry_2_entry: number;
  entry_2_name: string;
  entry_2_player_name: string;
  entry_2_points: number;
  entry_2_win: number;
  entry_2_draw: number;
  entry_2_loss: number;
  entry_2_total: number;
  is_knockout: boolean;
  league: number;
  winner: number;
  seed_value?: unknown;
  event: number;
  tiebreak?: unknown;
  is_bye: boolean;
  knockout_name: string;
}

interface Result {
  id: number;
  event_total: number;
  player_name: string;
  rank: number;
  last_rank: number;
  rank_sort: number;
  total: number;
  entry: number;
  entry_name: string;
}

interface Standings {
  has_next: boolean;
  page: number;
  results: Result[];
}

export interface LeagueType {
  classic: Classic[];
  h2h: H2h[];
  cup: Cup;
  cup_matches: CupMatch[];
}

export interface LeagueData {
  new_entries: NewEntries;
  last_updated_data: Date;
  league: League;
  standings: Standings;
}

export interface LeagueDataWithPage {
  new_entries: NewEntries;
  last_updated_data: Date;
  league: League;
  standings: Standings;
}

export interface BestLeague {
  league: number;
  entries: number;
  average_score: string;
  name: string;
}
