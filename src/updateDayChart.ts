import { useAccount } from "./components/AccountProvider";
import { daysToShow, sectionsPerDay, unknownFoodName } from "./constants";
import { fakeSingleFoods, useFakeData } from "./fakeData";
import {
  deleteFromDb,
  EndpointJsons,
  fetchAllFdcFoodJsons,
  fetchEndpointJsons,
  postToDbAndReturnJson,
} from "./fetch";
import {
  DayChartDayEntry,
  DayChartEntry,
  DayChartState,
  DaySectionEntry,
  DaySectionRowEntry,
  DayState,
  PortionRowEntry,
  PortionRowState,
  UserDayChartEntry,
} from "./types/DayChartTypes";
import { FoodData } from "./types/FoodDataTypes";
import { extractFoodDataFromJson } from "./utility";

export async function updateDayChart(
  userId: number,
  setDayChart: (state: DayChartState) => void,
  setIsLoading: (b: boolean) => void
) {
  setIsLoading(true);
  const endpointJsons = await fetchEndpointJsons();

  const fdcIds = endpointJsons.portionRows.map(
    (portionRow) => portionRow.fdcId
  );
  if (useFakeData) {
    const fakeData = getAllFakeFoodData(fdcIds);
    const dayChart = buildDayChartState(endpointJsons, userId, fakeData);
    setDayChart(dayChart);
    return;
  }

  const allFoodData = await getAllFoodData(fdcIds);
  if (!allFoodData) return;

  const dayChart: DayChartState = buildDayChartState(
    endpointJsons,
    userId,
    allFoodData
  );

  setDayChart(dayChart);
  setIsLoading(false);
}

async function getAllFoodData(fdcIds: number[]) {
  const allFoodDataJsons = await fetchAllFdcFoodJsons(fdcIds);

  const allFoodData: FoodData[] = allFoodDataJsons.map((json) =>
    extractFoodDataFromJson(json)
  );

  return allFoodData;
}

function getAllFakeFoodData(fdcIds: number[]): FoodData[] {
  const allFakeData: FoodData[] = fdcIds.map((id) => {
    const match = fakeSingleFoods.find((food) => food.fdcId === id);
    const data: FoodData = extractFoodDataFromJson(match);
    return data;
  });
  return allFakeData;
}

function buildDayChartState(
  endpointJsons: EndpointJsons,
  userId: number,
  allFoodData: FoodData[]
): DayChartState {
  const { userDayCharts, dayCharts } = endpointJsons;
  const userDayChartPairFromDb = userDayCharts.find(
    (pair: UserDayChartEntry) => pair.userId === userId
  );
  const dayChartFromDb = dayCharts.find(
    (dayChart: DayChartEntry) =>
      dayChart.id === userDayChartPairFromDb?.dayChartId
  );
  return {
    dayChartId: 1,
    days: Array.from(
      { length: daysToShow },
      (_, dayIndex) =>
        dayChartFromDb &&
        buildDay(dayChartFromDb.id, dayIndex, endpointJsons, allFoodData)
    ),
  };
}

function buildDay(
  dayChartId: number,
  indexInChart: number,
  endpointJsons: EndpointJsons,
  allFoodData: FoodData[]
) {
  const dayFromDb = endpointJsons.dayChartDays.find(
    (dayChartDay) =>
      dayChartDay.dayChartId === dayChartId &&
      dayChartDay.indexInChart === indexInChart
  );
  const day: DayState | undefined = dayFromDb && {
    dbId: dayFromDb.id,
    dayChartId,
    indexInChart,
    sections: Array.from({ length: sectionsPerDay }, (_, sectionIndex) =>
      buildSection(
        dayChartId,
        indexInChart,
        sectionIndex,
        endpointJsons,
        allFoodData
      )
    ),
  };
  return day;
}

function buildSection(
  dayChartId: number,
  dayIndex: number,
  indexInDay: number,
  endpointJsons: EndpointJsons,
  allFoodData: FoodData[]
) {
  const { dayChartDays, daySections, daySectionRows, portionRows } =
    endpointJsons;

  const dayFromDb = dayChartDays.find(
    (dayChartDay: DayChartDayEntry) =>
      dayChartDay.dayChartId === dayChartId &&
      dayChartDay.indexInChart === dayIndex
  );
  const sectionFromDb =
    dayFromDb &&
    daySections.find(
      (daySection: DaySectionEntry) =>
        daySection.dayId === dayFromDb.id &&
        daySection.indexInDay === indexInDay
    );
  const sectionRowPairsFromDb =
    sectionFromDb &&
    daySectionRows.filter(
      (daySectionRow: DaySectionRowEntry) =>
        daySectionRow.daySectionId === sectionFromDb.id
    );
  const rows =
    sectionRowPairsFromDb &&
    sectionRowPairsFromDb.map((daySectionRow: DaySectionRowEntry) =>
      buildRow(daySectionRow, portionRows, allFoodData)
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
  daySectionRow: DaySectionRowEntry,
  portionRows: PortionRowEntry[],
  allFoodData: FoodData[]
) {
  const rowFromDb = portionRows.find(
    (portionRow: PortionRowEntry) =>
      portionRow.id === daySectionRow.portionRowId
  );
  const foodDataMatch = allFoodData.find(
    (foodData) => foodData.fdcId === rowFromDb?.fdcId
  );
  const foodData: FoodData = {
    fdcId: rowFromDb ? rowFromDb.fdcId : 0,
    description: foodDataMatch ? foodDataMatch.description : unknownFoodName,
    nutrients: foodDataMatch ? foodDataMatch.nutrients : [],
  };
  const builtRow: PortionRowState | undefined = rowFromDb &&
    foodData && {
      dbId: rowFromDb.id,
      fdcId: rowFromDb.fdcId,
      foodData,
    };
  return builtRow;
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
