import { daysToShow, sectionsPerDay, unknownFoodName } from "./constants";
import { EndpointJsons, fetchAllFdcFoodJsons } from "./fetch";
import { DayChart } from "./types/DayChartNew";
import { FoodData } from "./types/FoodDataTypes";
import { extractFoodDataFromJson } from "./utility";

export async function updateDayChart(
  userId: number,
  setDayChart: (state: DayChart) => void,
  setIsLoading: (b: boolean) => void,
  failureCb: () => void
) {
  console.log("update day chart");
}

// async function getAllFoodData(fdcIds: number[]) {
//   const allFoodDataJsons = await fetchAllFdcFoodJsons(fdcIds);

//   const allFoodData: FoodData[] = allFoodDataJsons.map((json) =>
//     extractFoodDataFromJson(json)
//   );

//   return allFoodData;
// }

// export async function tryDeletePortion(portionId: number) {
//   const deletePortionRowResponse = await deleteFromDb("portionRows", portionId);
//   if (!deletePortionRowResponse.ok) {
//     console.log(
//       "Deleting portion FAILED: could not delete portionRow: " +
//         deletePortionRowResponse.status
//     );
//     return false;
//   }
//   return true;
// }

// export async function tryAddPortion(
//   fdcId: number,
//   fractionOfServing: number,
//   clickedSectionIndex: number,
//   dayChart: DayChartState
// ) {
//   //add a portionRow with the given data
//   const postJson = await postToDbAndReturnJson(
//     "portionRows",
//     {
//       fdcId,
//       fractionOfServing,
//     },
//     "Could not add new portion row"
//   );
//   if (!postJson) return false;
//   const portionRowId = postJson.id;

//   //add a dayChartDay with the correct dayId, OR skip if there already is one
//   const clickedDayIndex = Math.floor(clickedSectionIndex / sectionsPerDay);
//   const existingDay = dayChart.days[clickedDayIndex];
//   let dbDayId = existingDay?.id;
//   if (!existingDay) {
//     const postJson = await postToDbAndReturnJson(
//       "dayChartDays",
//       {
//         dayChartId: dayChart.dayChartId,
//         indexInChart: clickedDayIndex,
//       },
//       "Could not add new day"
//     );
//     if (!postJson) return false;
//     dbDayId = postJson.id;
//   }

//   //add a daySection with this dayId and the selected indexInDay, OR skip if there is already one with the same values
//   //(take note of the id of the daySection created, OR the daySection that already existed)
//   const indexInDay = clickedSectionIndex - sectionsPerDay * clickedDayIndex;
//   const existingSection =
//     existingDay && existingDay.sections && existingDay.sections[indexInDay];
//   let dbSectionId = existingSection && existingSection.dbId;
//   if (!existingSection) {
//     const postJson = await postToDbAndReturnJson(
//       "daySections",
//       {
//         dayId: dbDayId,
//         indexInDay,
//       },
//       "Could not add new section"
//     );
//     if (!postJson) return false;
//     dbSectionId = postJson.id;
//   }

//   //add a daySectionRow with daySectionId=(previously noted daySection id) and portionRowId=(id of row already added)
//   const daySectionRowJson = await postToDbAndReturnJson(
//     "daySectionRows",
//     {
//       daySectionId: dbSectionId,
//       portionRowId,
//     },
//     "Could not add new daySectionRow"
//   );
//   if (!daySectionRowJson) return false;

//   return true;
// }
