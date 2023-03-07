type DBEntry = {
  id: number;
};

export type PortionRowEntry = DBEntry & {
  fdcId: number;
  fractionOfServing: number;
};

export type DaySectionRowEntry = DBEntry & {
  daySectionId: number;
  portionRowId: number;
};

export type DaySectionEntry = DBEntry & {
  dayId: number;
  indexInDay: number;
};

export type DayChartDayEntry = DBEntry & {
  dayChartId: number;
  indexInChart: number;
};

export type DayChartData = {
  dayChartDays: DayChartDayEntry[];
  daySections: DaySectionEntry[];
  daySectionRows: DaySectionRowEntry[];
  portionRows: PortionRowEntry[];
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
  nutrients: Nutrient[];
};

export type NutrientInfo = {
  fdcName: string;
  displayName: string;
  unit: string;
  dailyValue: number;
  isMajorNutrient: boolean;
};

export type Nutrient = NutrientInfo & {
  amount: number;
};
