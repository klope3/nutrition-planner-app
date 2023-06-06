import { sectionsPerDay } from "../../../constants";
import { useDayChart } from "../../DayChartProvider";
import { PortionRow } from "../PortionRow/PortionRow";
import "./DaySection.css";

type DaySectionProps = {
  indexInDay: number;
  // dayId: number | undefined;
  dayIndex: number;
};

export function DaySection(props: DaySectionProps) {
  const { indexInDay, dayIndex } = props;
  const { setShowSearch, setClickedSectionIndex } = useDayChart();

  function clickAddPortion() {
    setShowSearch(true);
    const sectionNumber = dayIndex * sectionsPerDay + indexInDay;
    setClickedSectionIndex(sectionNumber);
  }

  const { getRowsForSection } = useDayChart();
  // const day = dayChart.days && dayChart.days[dayIndex];
  // const section = day && day.sections[indexInDay];
  // const portionRowsHere = section && section.rows;
  const portionRowsHere = getRowsForSection(dayIndex, indexInDay);

  return (
    <div className="day-section sub-container">
      {portionRowsHere.map(
        (portionRow, i) => portionRow && <PortionRow key={i} row={portionRow} />
      )}
      <div>
        <button className="add-portion-button" onClick={clickAddPortion}>
          <span>+</span>
        </button>
      </div>
    </div>
  );
}
