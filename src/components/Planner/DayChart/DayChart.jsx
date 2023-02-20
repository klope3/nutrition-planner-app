import { useEffect, useState } from "react";
import { fetchDays } from "../../../db-functions";
import { FoodSearch } from "../../Search/FoodSearch/FoodSearch";
import { Day } from "../Day/Day";
import "./DayChart.css";

export function DayChart() {
  const [showSearch, setShowSearch] = useState(false);
  const [userDayCharts, setUserDayCharts] = useState([]);
  const [dayChartDays, setDayChartDays] = useState([]);
  const [daySections, setDaySections] = useState([]);
  const [daySectionRows, setDaySectionRows] = useState([]);
  const [portionRows, setPortionRows] = useState([]);

  function fetchResource(resourceString, cb) {
    return fetch(`http://localhost:3000/${resourceString}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => cb(result));
  }

  useEffect(() => {
    fetchResource("userDayCharts", setUserDayCharts);
    fetchResource("dayChartDays", setDayChartDays);
    fetchResource("daySections", setDaySections);
    fetchResource("daySectionRows", setDaySectionRows);
    fetchResource("portionRows", setPortionRows);
  }, []);

  const days = [];
  for (let dayId = 1; dayId <= 4; dayId++) {
    //build out the day for this day number
    const day = {
      sections: new Array(5).fill({}),
    };

    for (let sectionIndex = 0; sectionIndex < 5; sectionIndex++) {
      //try to find a daySection for this specific day, at this specific dayIndex
      const sectionHere = daySections.find(
        (section) =>
          section.dayId === dayId && section.indexInDay === sectionIndex
      );
      if (!sectionHere) {
        continue;
      }
      day.sections[sectionIndex] = sectionHere;

      //get the rows associated with this section
      const rowsForThisSection = daySectionRows.filter(
        (row) => row.daySectionId === sectionHere.id
      );

      //get the rowIds from the rows we just got
      const rowIds = rowsForThisSection.map((row) => row.portionRowId);
      sectionHere.rows = [];

      //use those ids to ge the actual row objects
      for (const rowId of rowIds) {
        const row = portionRows.find((row) => row.id === rowId);
        if (row) sectionHere.rows.push(row);
      }
    }

    days.push(day);
  }

  return (
    <>
      <div className="day-chart-container">
        {/* Should use context here */}
        {days.map((day, i) => {
          return <Day key={i} day={day} setShowSearch={setShowSearch} />;
        })}
      </div>
      {showSearch && <FoodSearch setShowSearch={setShowSearch} />}
    </>
  );
}
