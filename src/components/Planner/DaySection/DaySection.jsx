import { sectionsPerDay } from "../../../constants";
import { useDayChart } from "../../DayChartProvider";
import { PortionRow } from "../PortionRow/PortionRow";
import "./DaySection.css";

export function DaySection(props) {
  const { indexInDay, dayIndex } = props;

  const { setShowSearch, setClickedSectionIndex } = useDayChart();

  function clickAddPortion() {
    setShowSearch(true);
    const sectionNumber = dayIndex * sectionsPerDay + indexInDay;
    setClickedSectionIndex(sectionNumber);
  }

  const {
    dayChartData: { portionRows, daySectionRows, daySections },
  } = useDayChart();

  const section =
    daySections &&
    daySections.find(
      (daySection) =>
        daySection.dayId === dayIndex + 1 &&
        daySection.indexInDay === indexInDay
    );
  const daySectionRowsHere =
    section &&
    daySectionRows.filter(
      (daySectionRow) => daySectionRow.daySectionId === section.id
    );
  const portionRowsHere =
    daySectionRowsHere &&
    daySectionRowsHere.map((daySectionRow) =>
      portionRows.find(
        (portionRow) => portionRow.id === daySectionRow.portionRowId
      )
    );

  return (
    <div className="day-section">
      {portionRowsHere &&
        portionRowsHere.map((portionRow) => (
          <PortionRow key={portionRow.fdcId} row={portionRow} />
        ))}
      <button onClick={clickAddPortion}>+</button>
    </div>
  );
}
