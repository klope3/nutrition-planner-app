import { writeFileSync } from "fs";

const data = {
  users: [
    {
      id: 1,
      email: "person@example.com",
      password: "password1234",
    },
  ],
  portionRows: [
    {
      id: 1,
      fdcId: 5646873,
      fractionOfServing: 0.5,
    },
    {
      id: 2,
      fdcId: 657351,
      fractionOfServing: 1,
    },
    {
      id: 3,
      fdcId: 2316587,
      fractionOfServing: 0.5,
    },
    {
      id: 4,
      fdcId: 879413,
      fractionOfServing: 0.5,
    },
    {
      id: 5,
      fdcId: 867643,
      fractionOfServing: 1,
    },
  ],
  daySectionRows: [
    {
      id: 1,
      daySectionId: 1,
      portionRowId: 1,
    },
    {
      id: 2,
      daySectionId: 2,
      portionRowId: 2,
    },
    {
      id: 3,
      daySectionId: 3,
      portionRowId: 3,
    },
    {
      id: 4,
      daySectionId: 4,
      portionRowId: 4,
    },
    {
      id: 5,
      daySectionId: 4,
      portionRowId: 5,
    },
  ],
  daySections: [
    {
      id: 1,
      dayId: 1,
      indexInDay: 2,
    },
    {
      id: 2,
      dayId: 1,
      indexInDay: 4,
    },
    {
      id: 3,
      dayId: 2,
      indexInDay: 3,
    },
    {
      id: 4,
      dayId: 3,
      indexInDay: 0,
    },
  ],
  dayChartDays: [
    {
      id: 1,
      dayChartId: 1,
      indexInChart: 0,
    },
    {
      id: 2,
      dayChartId: 1,
      indexInChart: 1,
    },
    {
      id: 3,
      dayChartId: 1,
      indexInChart: 3,
    },
  ],
  userDayCharts: [
    {
      id: 1,
      userEmail: "person@example.com",
      dayChartId: 1,
    },
  ],
};

//to put a portion in:
//add the portion to portionRows with correct data (keep track of the id of new portionRow)
//add a daychartday with the dayId of that day, if there isn't one already
//add a daySection with dayId=this day and indexInDay=the position in day desired (ONLY if there is not already a daySection with the same two values)
//add a daySectionRow with daySectionId=(id of daySection just added) and portionRowId=(id stored from first step)

writeFileSync("db.json", JSON.stringify(data), { encoding: "utf-8" });
