export interface Classic {
  id: number;
  name: string;
  short_name: string;
  created: Date;
  closed: boolean;
  rank?: any;
  max_entries?: any;
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

export interface H2h {
  id: number;
  name: string;
  short_name?: any;
  created: Date;
  closed: boolean;
  rank?: any;
  max_entries?: any;
  league_type: string;
  scoring: string;
  admin_entry?: number;
  start_event: number;
  entry_can_leave: boolean;
  entry_can_admin: boolean;
  entry_can_invite: boolean;
  has_cup: boolean;
  cup_league?: any;
  cup_qualified?: any;
  entry_rank: number;
  entry_last_rank: number;
}

export interface Status {
  qualification_event?: any;
  qualification_numbers?: any;
  qualification_rank?: any;
  qualification_state?: any;
}

export interface Cup {
  matches: any[];
  status: Status;
  cup_league: number;
}

export interface CupMatch {
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
  seed_value?: any;
  event: number;
  tiebreak?: any;
  is_bye: boolean;
  knockout_name: string;
}

export interface Leagues {
  classic: Classic[];
  h2h: H2h[];
  cup: Cup;
  cup_matches: CupMatch[];
}
