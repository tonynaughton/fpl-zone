interface AutomaticSub {
  entry: number;
  element_in: number;
  element_out: number;
  event: number;
}

interface EntryHistory {
  event: number;
  points: number;
  total_points: number;
  rank: number;
  rank_sort: number;
  overall_rank: number;
  bank: number;
  value: number;
  event_transfers: number;
  event_transfers_cost: number;
  points_on_bench: number;
}

interface Pick {
  element: number;
  position: number;
  multiplier: number;
  is_captain: boolean;
  is_vice_captain: boolean;
}

export interface TeamPicks {
  active_chip: string;
  automatic_subs: AutomaticSub[];
  entry_history: EntryHistory;
  picks: Pick[];
}
