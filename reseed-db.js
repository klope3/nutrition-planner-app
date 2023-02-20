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
      fdcId: 2015943,
      fractionOfServing: 0.5,
    },
    {
      id: 2,
      fdcId: 539572,
      fractionOfServing: 1,
    },
    {
      id: 3,
      fdcId: 2343826,
      fractionOfServing: 1,
    },
    {
      id: 4,
      fdcId: 2343697,
      fractionOfServing: 1.5,
    },
    {
      id: 5,
      fdcId: 2344665,
      fractionOfServing: 0.5,
    },
    {
      id: 6,
      fdcId: 2098759,
      fractionOfServing: 1,
    },
    {
      id: 7,
      fdcId: 99999,
      fractionOfServing: 0.5,
    },
    {
      id: 8,
      fdcId: 1337,
      fractionOfServing: 1,
    },
    {
      id: 9,
      fdcId: 5555,
      fractionOfServing: 1,
    },
  ],
  daySectionRows: [
    {
      id: 1,
      daySectionId: 1,
      portionRowId: 3,
    },
    {
      id: 2,
      daySectionId: 2,
      portionRowId: 2,
    },
    {
      id: 3,
      daySectionId: 3,
      portionRowId: 1,
    },
    {
      id: 4,
      daySectionId: 4,
      portionRowId: 4,
    },
  ],
  daySections: [
    {
      id: 1,
      dayId: 1,
      indexInDay: 3,
    },
    {
      id: 2,
      dayId: 2,
      indexInDay: 2,
    },
    {
      id: 3,
      dayId: 4,
      indexInDay: 1,
    },
    {
      id: 4,
      dayId: 3,
      indexInDay: 4,
    },
  ],
  dayChartDays: [
    {
      id: 1,
      dayChartId: 1,
      dayId: 1,
    },
    {
      id: 2,
      dayChartId: 1,
      dayId: 2,
    },
    {
      id: 3,
      dayChartId: 1,
      dayId: 4,
    },
    {
      id: 4,
      dayChartId: 1,
      dayId: 3,
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
