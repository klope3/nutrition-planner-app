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
  indexInChart: number;
};

export type DayChartData = {
  dayChartDays: DayChartDayData[];
  daySections: DaySectionData[];
  daySectionRows: DaySectionRowData[];
  portionRows: PortionRowData[];
};

//these State types should maybe be merged with the Data types using &; they end up inheriting lots of the same properties anyway
export type DayChartState = {
  dayChartId: number;
  days: (DayState | undefined)[];
};

export type DayState = {
  dbId: number;
  dayChartId: number;
  indexInChart: number;
  sections: (DaySectionState | undefined)[];
};

export type DaySectionState = {
  dbId: number;
  rows: (PortionRowState | undefined)[] | undefined;
};

export type PortionRowState = {
  dbId: number;
  fdcId: number;
  foodData: FoodData;
  // foodName: string;
  // nutrients: Nutrient[];
  // fractionOfServing: number;
};

export type FoodData = {
  fdcId: number;
  description: string;
};

export type Nutrient = {
  name: string;
  amount: number;
  unit: string;
};
