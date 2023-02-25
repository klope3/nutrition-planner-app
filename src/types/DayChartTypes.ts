type DBEntry = {
  id: number;
};

export type PortionRowData = DBEntry & {
  fdcId: number;
  fractionOfServing: number;
};

export type DaySectionRowData = DBEntry & {
  daySectionId: number;
  portionRowId: number;
};

export type DaySectionData = DBEntry & {
  dayId: number;
  indexInDay: number;
};

export type DayChartDayData = DBEntry & {
  dayChartId: number;
  dayId: number;
};

export type DayChartData = {
  dayChartDays: DayChartDayData[];
  daySections: DaySectionData[];
  daySectionRows: DaySectionRowData[];
  portionRows: PortionRowData[];
};
