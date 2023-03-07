import { nutrientInfo, sectionsPerDay } from "./constants";
import { fakeSingleFoods, useFakeData } from "./fakeData";
import {
  deleteFromDb,
  EndpointJsons,
  fetchEndpointJsons,
  fetchSingleFdcFood,
  postToDbAndReturnJson,
} from "./fetch";
import {
  DayChartDayEntry,
  DayChartState,
  DaySectionEntry,
  DaySectionRowEntry,
  DayState,
  FoodData,
  Nutrient,
  NutrientInfo,
  PortionRowEntry,
  PortionRowState,
} from "./types/DayChartTypes";

export async function updateDayChart(
  setDayChart: (state: DayChartState) => void
) {
  const endpointJsons = await fetchEndpointJsons();

  const fdcIds = endpointJsons.portionRows.map(
    (portionRow) => portionRow.fdcId
  );
  if (useFakeData) {
    const fakeData = getAllFakeFoodData(fdcIds);
    const dayChart = buildDayChartState(endpointJsons, fakeData);
    setDayChart(dayChart);
    return;
  }

  const allFoodData = await getAllFoodData(fdcIds);
  if (!allFoodData) return;

  const dayChart: DayChartState = buildDayChartState(
    endpointJsons,
    allFoodData
  );

  setDayChart(dayChart);
}

async function getAllFoodData(fdcIds: number[]) {
  const allFoodDataResponses = await Promise.all(
    fdcIds.map((id) => fetchSingleFdcFood(id))
  );
  const failedResponse = allFoodDataResponses.find((response) => !response.ok);
  if (failedResponse) {
    console.error(
      "Updating chart FAILED because one or more food data could not be retrieved; status was " +
        failedResponse.status
    );
    return;
  }
  const allFoodDataJsons = await Promise.all(
    allFoodDataResponses.map((response) => response.json())
  );

  const allFoodData: FoodData[] = allFoodDataJsons.map((json) => ({
    fdcId: json.fdcId,
    description: json.description,
    nutrients: foodNutrientsObjToNutrientsArr(json.foodNutrients),
  }));

  return allFoodData;
}

function getAllFakeFoodData(fdcIds: number[]): FoodData[] {
  const allFakeData: FoodData[] = fdcIds.map((id) => {
    console.log("trying to find a fake food with id " + id + "; result:");
    const match = fakeSingleFoods.find((food) => food.fdcId === id);
    console.log(match);
    const data: FoodData = {
      fdcId: match ? match.fdcId : 0,
      description: match ? match.description : "Unknown food",
      nutrients: match
        ? foodNutrientsObjToNutrientsArr(match.foodNutrients)
        : [],
    };
    return data;
  });
  return allFakeData;
}

function buildDayChartState(
  endpointJsons: EndpointJsons,
  allFoodData: FoodData[]
): DayChartState {
  return {
    dayChartId: 1,
    days: Array.from({ length: 4 }, (_, dayIndex) =>
      buildDay(dayIndex, endpointJsons, allFoodData)
    ),
  };
}

function buildDay(
  indexInChart: number,
  endpointJsons: EndpointJsons,
  allFoodData: FoodData[]
) {
  const dayFromDb = endpointJsons.dayChartDays.find(
    (dayChartDay) =>
      dayChartDay.dayChartId === 1 && dayChartDay.indexInChart === indexInChart
  );
  const day: DayState | undefined = dayFromDb && {
    dbId: dayFromDb.id,
    dayChartId: 1,
    indexInChart,
    sections: Array.from({ length: sectionsPerDay }, (_, sectionIndex) =>
      buildSection(indexInChart, sectionIndex, endpointJsons, allFoodData)
    ),
  };
  return day;
}

function buildSection(
  dayIndex: number,
  indexInDay: number,
  endpointJsons: EndpointJsons,
  allFoodData: FoodData[]
) {
  const { dayChartDays, daySections, daySectionRows, portionRows } =
    endpointJsons;

  const dayFromDb = dayChartDays.find(
    (dayChartDay: DayChartDayEntry) =>
      dayChartDay.dayChartId === 1 && dayChartDay.indexInChart === dayIndex
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
    description: foodDataMatch ? foodDataMatch.description : "Unknown food",
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

//
function foodNutrientsObjToNutrientsArr(foodNutrients: any[]): Nutrient[] {
  return foodNutrients.map((foodNutrient: any) => {
    const fdcName = foodNutrient.nutrient.name;
    const matchingInfo = nutrientInfo.find((info) => info.fdcName === fdcName);
    const nutrient: Nutrient = {
      fdcName,
      displayName: matchingInfo
        ? matchingInfo.displayName
        : "Nutrient name not found",
      amount: foodNutrient.amount,
      unit: foodNutrient.nutrient.unitName,
      dailyValue: matchingInfo ? matchingInfo.dailyValue : 0,
      isMajorNutrient: matchingInfo ? matchingInfo.isMajorNutrient : false,
    };
    return nutrient;
  });
}
