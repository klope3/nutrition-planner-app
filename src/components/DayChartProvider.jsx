import { createContext, useContext, useEffect, useState } from "react";
import { DB_URL, sectionsPerDay } from "../constants";
import { fetchFromDb } from "../fetch";

const DayChartContext = createContext({});

async function fetchData(setDayChartData) {
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

  async function addPortion(fdcId, fractionOfServing) {
    //add a dayChartDay with the correct dayId, OR skip if there already is one

    //add a daySection with this dayId and the selected indexInDay, OR skip if there is already one with the same values
    //(take note of the id of the daySection created, OR the daySection that already existed)

    //add a daySectionRow with daySectionId=(previously noted daySection id) and

    const dayId = Math.floor(clickedSectionIndex / sectionsPerDay) + 1;
    console.log("Trying to find dayID " + dayId + " in db");
    const dayResponse = await fetch(`${DB_URL}/dayChartDays/${dayId}`, {
      method: "GET",
    });
    if (!dayResponse.ok) {
      console.error("Couldn't contact db");
      return;
    }
    const day = await dayResponse.json();
    console.log(day ? "adding to existing day" : "adding new day");
  }

  async function deletePortion(portionId) {
    const response = await fetch(
      `http://localhost:3000/portionRows/${portionId}`,
      {
        method: "DELETE",
      }
    );
    console.log(response);
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

export function DayChartProvider({ children }) {
  const [dayChartData, setDayChartData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [clickedSectionIndex, setClickedSectionIndex] = useState();

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
