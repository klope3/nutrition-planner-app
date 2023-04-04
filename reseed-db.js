import { writeFileSync } from "fs";

const data = {
  users: [
    {
      id: 1,
      email: "sally.jones@site.com",
      password: "catsRock",
    },
    {
      id: 2,
      email: "rick.grimes@alexandria.com",
      password: "cowboy",
    },
  ],
  portionRows: [
    {
      id: 1,
      fdcId: 2098759,
      fractionOfServing: 0.5,
    },
    {
      id: 2,
      fdcId: 2345173,
      fractionOfServing: 1,
    },
    {
      id: 3,
      fdcId: 549018,
      fractionOfServing: 0.5,
    },
    {
      id: 4,
      fdcId: 2324381,
      fractionOfServing: 0.5,
    },
    {
      id: 5,
      fdcId: 2345004,
      fractionOfServing: 1,
    },
    {
      id: 6,
      fdcId: 2193119,
      fractionOfServing: 0.5,
    },
    {
      id: 7,
      fdcId: 2343697,
      fractionOfServing: 1,
    },
    {
      id: 8,
      fdcId: 1602525,
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
    {
      id: 6,
      daySectionId: 5,
      portionRowId: 6,
    },
    {
      id: 7,
      daySectionId: 5,
      portionRowId: 7,
    },
    {
      id: 8,
      daySectionId: 6,
      portionRowId: 8,
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
    {
      id: 5,
      dayId: 4,
      indexInDay: 4,
    },
    {
      id: 6,
      dayId: 5,
      indexInDay: 1,
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
    {
      id: 4,
      dayChartId: 2,
      indexInChart: 0,
    },
    {
      id: 5,
      dayChartId: 2,
      indexInChart: 1,
    },
  ],
  dayCharts: [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ],
  userDayCharts: [
    {
      id: 1,
      userId: 1,
      dayChartId: 1,
    },
    {
      id: 2,
      userId: 2,
      dayChartId: 2,
    },
  ],
};

writeFileSync("db.json", JSON.stringify(data), { encoding: "utf-8" });
