import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DB_URL, sectionsPerDay } from "../constants";
import {
  deleteFromDb,
  fetchFromDb,
  postToDb,
  postToDbAndReturnJson,
} from "../fetch";
import {
  DayChartData,
  DayChartDayData,
  DayChartState,
  DaySectionData,
  DaySectionRowData,
  DayState,
  PortionRowData,
  PortionRowState,
} from "../types/DayChartTypes";

type DayChartContext = {
  dayChartData: DayChartData;
  setDayChartData: (data: DayChartData) => void;
  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
  clickedSectionIndex: number;
  setClickedSectionIndex: (i: number) => void;
  dayChart: DayChartState;
  setDayChart: (state: DayChartState) => void;
};

type ChildrenProps = { children: ReactNode };

const DayChartContext = createContext<DayChartContext>({} as DayChartContext);

async function fetchData(setDayChartData: (data: DayChartData) => void) {
  const endpoints = [
    "dayChartDays",
    "daySections",
    "daySectionRows",
    "portionRows",
  ];
  const responses = await Promise.all(
    endpoints.map((endpoint) => fetchFromDb(endpoint))
  );
  const [dayChartDays, daySections, daySectionRows, portionRows] =
    await Promise.all(responses.map((response) => response.json()));
  setDayChartData({
    dayChartDays,
    daySections,
    daySectionRows,
    portionRows,
  });
}
async function updateDayChart(setDayChart: (state: DayChartState) => void) {
  const endpoints = [
    "dayChartDays",
    "daySections",
    "daySectionRows",
    "portionRows",
  ];
  const responses = await Promise.all(
    endpoints.map((endpoint) => fetchFromDb(endpoint))
  );
  const jsons = await Promise.all(responses.map((response) => response.json()));
  const dayChartDays: DayChartDayData[] = jsons[0];
  const daySections: DaySectionData[] = jsons[1];
  const daySectionRows: DaySectionRowData[] = jsons[2];
  const portionRows: PortionRowData[] = jsons[3];

  const dayChart: DayChartState = {
    dayChartId: 1,
    days: Array.from({ length: 4 }, (_, dayIndex) => {
      const dayFromDb = dayChartDays.find(
        (dayChartDay) =>
          dayChartDay.dayChartId === 1 && dayChartDay.indexInChart === dayIndex
      );
      const day: DayState | undefined = dayFromDb && {
        dbId: dayFromDb.id,
        dayChartId: 1,
        indexInChart: dayIndex,
        sections: Array.from({ length: sectionsPerDay }, (_, sectionIndex) => {
          const dayFromDb = dayChartDays.find(
            (dayChartDay: DayChartDayData) =>
              dayChartDay.dayChartId === 1 &&
              dayChartDay.indexInChart === dayIndex
          );
          const sectionFromDb =
            dayFromDb &&
            daySections.find(
              (daySection: DaySectionData) =>
                daySection.dayId === dayFromDb.id &&
                daySection.indexInDay === sectionIndex
            );
          const sectionRowPairs =
            sectionFromDb &&
            daySectionRows.filter(
              (daySectionRow: DaySectionRowData) =>
                daySectionRow.daySectionId === sectionFromDb.id
            );
          const rows =
            sectionRowPairs &&
            sectionRowPairs.map((daySectionRow: DaySectionRowData) => {
              const row = portionRows.find(
                (portionRow: PortionRowData) =>
                  portionRow.id === daySectionRow.portionRowId
              );
              const rowState: PortionRowState | undefined = row && {
                dbId: row.id,
                fdcId: row.fdcId,
                foodName: `Placeholder for ${row.fdcId}`,
              };
              return rowState;
            });
          return (
            sectionFromDb && {
              dbId: sectionFromDb.id,
              indexInDay: sectionIndex,
              rows,
            }
          );
        }),
      };
      return day;
    }),
  };

  setDayChart(dayChart);
}

export function useDayChart() {
  const {
    setDayChartData,
    showSearch,
    setShowSearch,
    clickedSectionIndex,
    setClickedSectionIndex,
    dayChart,
    setDayChart,
  } = useContext(DayChartContext);

  async function addPortion(fdcId: number, fractionOfServing: number) {
    //add a portionRow with the given data
    const postJson = await postToDbAndReturnJson(
      "portionRows",
      {
        fdcId,
        fractionOfServing,
      },
      "Could not add new portion row"
    );
    if (!postJson) return;
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
      if (!postJson) return;
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
      if (!postJson) return;
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
    if (!daySectionRowJson) return;

    updateDayChart(setDayChart);
  }

  async function deletePortion(portionId: number) {
    const deletePortionRowResponse = await deleteFromDb(
      "portionRows",
      portionId
    );
    if (!deletePortionRowResponse.ok) {
      console.log(
        "Deleting portion FAILED: could not delete portionRow: " +
          deletePortionRowResponse.status
      );
      return;
    }

    updateDayChart(setDayChart);
  }

  return {
    showSearch,
    setShowSearch,
    clickedSectionIndex,
    setClickedSectionIndex,
    addPortion,
    deletePortion,
    dayChart,
    updateDayChart,
  };
}

export function DayChartProvider({ children }: ChildrenProps) {
  const [dayChartData, setDayChartData] = useState({} as DayChartData);
  const [dayChart, setDayChart] = useState({} as DayChartState);
  const [showSearch, setShowSearch] = useState(false);
  const [clickedSectionIndex, setClickedSectionIndex] = useState(0);

  useEffect(() => {
    updateDayChart(setDayChart);
  }, []);

  return (
    <DayChartContext.Provider
      value={{
        dayChartData,
        setDayChartData,
        showSearch,
        setShowSearch,
        clickedSectionIndex,
        setClickedSectionIndex,
        dayChart,
        setDayChart,
      }}
    >
      {children}
    </DayChartContext.Provider>
  );
}
