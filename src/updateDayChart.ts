import { sectionsPerDay } from "./constants";
import {
  deleteFromDb,
  fetchEndpointJsons,
  postToDbAndReturnJson,
} from "./fetch";
import {
  DayChartDayData,
  DayChartState,
  DaySectionData,
  DaySectionRowData,
  DayState,
  PortionRowData,
  PortionRowState,
} from "./types/DayChartTypes";

export async function updateDayChart(
  setDayChart: (state: DayChartState) => void
) {
  const jsons = await fetchEndpointJsons();
  const dayChartDays: DayChartDayData[] = jsons[0];
  const daySections: DaySectionData[] = jsons[1];
  const daySectionRows: DaySectionRowData[] = jsons[2];
  const portionRows: PortionRowData[] = jsons[3];

  const dayChart: DayChartState = {
    dayChartId: 1,
    days: Array.from({ length: 4 }, (_, dayIndex) =>
      buildDay(dayIndex, dayChartDays, daySections, daySectionRows, portionRows)
    ),
  };

  setDayChart(dayChart);
}

function buildDay(
  indexInChart: number,
  dayChartDays: DayChartDayData[],
  daySections: DaySectionData[],
  daySectionRows: DaySectionRowData[],
  portionRows: PortionRowData[]
) {
  const dayFromDb = dayChartDays.find(
    (dayChartDay) =>
      dayChartDay.dayChartId === 1 && dayChartDay.indexInChart === indexInChart
  );
  const day: DayState | undefined = dayFromDb && {
    dbId: dayFromDb.id,
    dayChartId: 1,
    indexInChart,
    sections: Array.from({ length: sectionsPerDay }, (_, sectionIndex) =>
      buildSection(
        indexInChart,
        sectionIndex,
        dayChartDays,
        daySections,
        daySectionRows,
        portionRows
      )
    ),
  };
  return day;
}

function buildSection(
  dayIndex: number,
  indexInDay: number,
  dayChartDays: DayChartDayData[],
  daySections: DaySectionData[],
  daySectionRows: DaySectionRowData[],
  portionRows: PortionRowData[]
) {
  const dayFromDb = dayChartDays.find(
    (dayChartDay: DayChartDayData) =>
      dayChartDay.dayChartId === 1 && dayChartDay.indexInChart === dayIndex
  );
  const sectionFromDb =
    dayFromDb &&
    daySections.find(
      (daySection: DaySectionData) =>
        daySection.dayId === dayFromDb.id &&
        daySection.indexInDay === indexInDay
    );
  const sectionRowPairs =
    sectionFromDb &&
    daySectionRows.filter(
      (daySectionRow: DaySectionRowData) =>
        daySectionRow.daySectionId === sectionFromDb.id
    );
  const rows =
    sectionRowPairs &&
    sectionRowPairs.map((daySectionRow: DaySectionRowData) =>
      buildRow(daySectionRow, portionRows)
    );
  return (
    sectionFromDb && {
      dbId: sectionFromDb.id,
      indexInDay,
      rows,
    }
  );
}

function buildRow(
  daySectionRow: DaySectionRowData,
  portionRows: PortionRowData[]
) {
  const row = portionRows.find(
    (portionRow: PortionRowData) => portionRow.id === daySectionRow.portionRowId
  );
  const rowState: PortionRowState | undefined = row && {
    dbId: row.id,
    fdcId: row.fdcId,
    foodName: `Placeholder for ${row.fdcId}`,
  };
  return rowState;
}

export async function tryDeletePortion(portionId: number) {
  const deletePortionRowResponse = await deleteFromDb("portionRows", portionId);
  if (!deletePortionRowResponse.ok) {
    console.log(
      "Deleting portion FAILED: could not delete portionRow: " +
        deletePortionRowResponse.status
    );
    return false;
  }
  return true;
}

export async function tryAddPortion(
  fdcId: number,
  fractionOfServing: number,
  clickedSectionIndex: number,
  dayChart: DayChartState
) {
  //add a portionRow with the given data
  const postJson = await postToDbAndReturnJson(
    "portionRows",
    {
      fdcId,
      fractionOfServing,
    },
    "Could not add new portion row"
  );
  if (!postJson) return false;
  const portionRowId = postJson.id;

  //add a dayChartDay with the correct dayId, OR skip if there already is one
  const clickedDayIndex = Math.floor(clickedSectionIndex / sectionsPerDay);
  const existingDay = dayChart.days[clickedDayIndex];
  let dbDayId = existingDay?.dbId;
  if (!existingDay) {
    const postJson = await postToDbAndReturnJson(
      "dayChartDays",
      {
        dayChartId: 1,
        indexInChart: clickedDayIndex,
      },
      "Could not add new day"
    );
    if (!postJson) return false;
    dbDayId = postJson.id;
  }

  //add a daySection with this dayId and the selected indexInDay, OR skip if there is already one with the same values
  //(take note of the id of the daySection created, OR the daySection that already existed)
  const indexInDay = clickedSectionIndex - sectionsPerDay * clickedDayIndex;
  const existingSection =
    existingDay && existingDay.sections && existingDay.sections[indexInDay];
  let dbSectionId = existingSection && existingSection.dbId;
  if (!existingSection) {
    const postJson = await postToDbAndReturnJson(
      "daySections",
      {
        dayId: dbDayId,
        indexInDay,
      },
      "Could not add new section"
    );
    if (!postJson) return false;
    dbSectionId = postJson.id;
  }

  //add a daySectionRow with daySectionId=(previously noted daySection id) and portionRowId=(id of row already added)
  const daySectionRowJson = await postToDbAndReturnJson(
    "daySectionRows",
    {
      daySectionId: dbSectionId,
      portionRowId,
    },
    "Could not add new daySectionRow"
  );
  if (!daySectionRowJson) return false;

  return true;
}