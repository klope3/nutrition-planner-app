import { PortionRow } from "../PortionRow/PortionRow";
import "./DaySection.css";

export function DaySection(props) {
  const { setShowSearch } = props;
  return (
    <div className="day-section">
      <PortionRow />
      <PortionRow />
      <button onClick={() => setShowSearch(true)}>+</button>
    </div>
  );
}
