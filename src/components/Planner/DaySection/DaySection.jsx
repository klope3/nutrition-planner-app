import { PortionRow } from "../PortionRow/PortionRow";
import "./DaySection.css";

export function DaySection(props) {
  const {
    section: { rows },
    setShowSearch,
  } = props;
  return (
    <div className="day-section">
      {rows && rows.map((row) => <PortionRow row={row} />)}
      <button onClick={() => setShowSearch(true)}>+</button>
    </div>
  );
}
