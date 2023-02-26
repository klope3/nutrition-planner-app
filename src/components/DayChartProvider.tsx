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
import { DayChartData, DayChartDayData } from "../types/DayChartTypes";

type DayChartContext = {
  dayChartData: DayChartData;
  setDayChartData: (data: DayChartData) => void;
  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
  clickedSectionIndex: number;
  setClickedSectionIndex: (i: number) => void;
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

export function useDayChart() {
  const {
    dayChartData: { dayChartDays, daySections, daySectionRows, portionRows },
    setDayChartData,
    showSearch,
    setShowSearch,
    clickedSectionIndex,
    setClickedSectionIndex,
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
    const existingDay = dayChartDays.find(
      (dayChartDay) =>
        dayChartDay.indexInChart === clickedDayIndex &&
        dayChartDay.dayChartId === 1
    );
    let dbDayId = existingDay && existingDay.id;
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
    const existingSection = daySections.find(
      (daySection) =>
        daySection.dayId === dbDayId && daySection.indexInDay === indexInDay
    );
    let dbSectionId = existingSection && existingSection.id;
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

    fetchData(setDayChartData);
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

    fetchData(setDayChartData);
  }

  return {
    dayChartData: {
      dayChartDays,
      daySections,
      daySectionRows,
      portionRows,
    },
    showSearch,
    setShowSearch,
    clickedSectionIndex,
    setClickedSectionIndex,
    addPortion,
    deletePortion,
  };
}

export function DayChartProvider({ children }: ChildrenProps) {
  const [dayChartData, setDayChartData] = useState({} as DayChartData);
  const [showSearch, setShowSearch] = useState(false);
  const [clickedSectionIndex, setClickedSectionIndex] = useState(0);

  useEffect(() => {
    fetchData(setDayChartData);
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
      }}
    >
      {children}
    </DayChartContext.Provider>
  );
}
