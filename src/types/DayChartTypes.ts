import { FoodData } from "./FoodDataTypes";

type DBEntry = {
  id: number;
};

export type PortionRowEntry = DBEntry & {
  fdcId: number;
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

//this would be used in a future version where a user can have multiple day charts
export type DayChartEntry = DBEntry & {};

export type UserDayChartEntry = DBEntry & {
  userId: number;
  dayChartId: number;
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

export type DayState = DayChartDayEntry & {
  sections: (DaySectionState | undefined)[];
};

export type DaySectionState = {
  dbId: number;
  rows: (PortionRowState | undefined)[] | undefined;
};

export type PortionRowState = PortionRowEntry & {
  foodData: FoodData;
};
