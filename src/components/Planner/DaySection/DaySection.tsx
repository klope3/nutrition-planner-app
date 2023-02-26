import { sectionsPerDay } from "../../../constants";
import { useDayChart } from "../../DayChartProvider";
import { PortionRow } from "../PortionRow/PortionRow";
import "./DaySection.css";

type DaySectionProps = {
  indexInDay: number;
  dayId: number | undefined;
  dayIndex: number;
};

export function DaySection(props: DaySectionProps) {
  const { indexInDay, dayId, dayIndex } = props;
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
        daySection.dayId === dayId && daySection.indexInDay === indexInDay
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
        portionRowsHere.map(
          (portionRow, i) =>
            portionRow && <PortionRow key={i} row={portionRow} />
        )}
      <button onClick={clickAddPortion}>+</button>
    </div>
  );
}
