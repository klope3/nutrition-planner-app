import { sectionsPerDay } from "../../../constants";
import { useDayChart } from "../../DayChartProvider";
import { PortionRow } from "../PortionRow/PortionRow";
import "./DaySection.css";

type DaySectionProps = {
  indexInDay: number;
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
  const portionRowsHere = getRowsForSection(dayIndex, indexInDay);

  return (
    <div className="day-section sub-container">
      {portionRowsHere.map((portionRow, i) => (
        <PortionRow key={i} row={portionRow} />
      ))}
      <div>
        <button className="add-portion-button" onClick={clickAddPortion}>
          <span>+</span>
        </button>
      </div>
    </div>
  );
}
