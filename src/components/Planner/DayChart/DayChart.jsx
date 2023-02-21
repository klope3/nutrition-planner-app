import { useEffect, useState } from "react";
import { sectionsPerDay } from "../../../constants";
import { FoodSearch } from "../../Search/FoodSearch/FoodSearch";
import { Day } from "../Day/Day";
import "./DayChart.css";

export function DayChart() {
  const [showSearch, setShowSearch] = useState(false);
  const [clickedSectionIndex, setClickedSectionIndex] = useState();
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

  function fetchChartData() {
    fetchResource("userDayCharts", setUserDayCharts);
    fetchResource("dayChartDays", setDayChartDays);
    fetchResource("daySections", setDaySections);
    fetchResource("daySectionRows", setDaySectionRows);
    fetchResource("portionRows", setPortionRows);
  }

  async function addPortion(fdcId, fractionOfServing) {
    //add a dayChartDay with the correct dayId, OR skip if there already is one

    //add a daySection with this dayId and the selected indexInDay, OR skip if there is already one with the same values
    //(take note of the id of the daySection created, OR the daySection that already existed)

    //add a daySectionRow with daySectionId=(previously noted daySection id) and

    const dayId = Math.floor(clickedSectionIndex / sectionsPerDay) + 1;
    console.log("Trying to find dayID " + dayId + " in db");
    const dayResponse = await fetch(
      `http://localhost:3000/dayChartDays/${dayId}`,
      {
        method: "GET",
      }
    );
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

  useEffect(() => fetchChartData, []);

  const days = [];
  for (let dayId = 1; dayId <= 4; dayId++) {
    //build out the day for this day number
    const day = {
      sections: new Array(sectionsPerDay).fill({}),
    };

    for (let sectionIndex = 0; sectionIndex < 5; sectionIndex++) {
      const sectionHere = {
        dayId,
        indexInDay: sectionIndex,
      };
      //try to find a daySection for this specific day, at this specific dayIndex
      const foundSection = daySections.find(
        (section) =>
          section.dayId === dayId && section.indexInDay === sectionIndex
      );
      if (foundSection) sectionHere.id = foundSection.id;
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
          return (
            <Day
              key={i}
              day={day}
              setShowSearch={setShowSearch}
              setClickedSectionIndex={setClickedSectionIndex}
              deletePortion={deletePortion}
            />
          );
        })}
      </div>
      {showSearch && (
        <FoodSearch setShowSearch={setShowSearch} addPortion={addPortion} />
      )}
    </>
  );
}
