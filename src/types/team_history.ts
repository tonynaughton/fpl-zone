interface Current {
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

interface Past {
  season_name: string;
  total_points: number;
  rank: number;
}
interface Chip {
  name: string;
  time: Date;
  event: number;
}

export interface TeamHistory {
  current: Current[];
  past: Past[];
  chips: Chip[];
}
