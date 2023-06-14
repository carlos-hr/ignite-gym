export interface HistoryDTO {
  id: string;
  name: string;
  group: string;
  hour: string;
  created_at: Date;
}

export interface HistoryByDayDTO {
  title: string;
  data: HistoryDTO[];
}
