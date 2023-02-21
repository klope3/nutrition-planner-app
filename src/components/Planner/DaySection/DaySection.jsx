import { sectionsPerDay } from "../../../constants";
import { PortionRow } from "../PortionRow/PortionRow";
import "./DaySection.css";

export function DaySection(props) {
  const {
    section: { dayId, indexInDay, rows },
    setShowSearch,
    setClickedSectionIndex,
    deletePortion,
  } = props;

  function clickAddPortion() {
    setShowSearch(true);
    const sectionNumber = (dayId - 1) * sectionsPerDay + indexInDay;
    setClickedSectionIndex(sectionNumber);
  }

  return (
    <div className="day-section">
      {rows &&
        rows.map((row) => (
          <PortionRow row={row} deletePortion={deletePortion} />
        ))}
      <button onClick={clickAddPortion}>+</button>
    </div>
  );
}
