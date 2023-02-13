import { PortionRow } from "../PortionRow/PortionRow";
import "./DaySection.css";

export function DaySection() {
  return (
    <div className="day-section">
      <PortionRow />
      <PortionRow />
      <button>+</button>
    </div>
  );
}
