import { useState } from "react";
import { FoodSearch } from "../../Search/FoodSearch/FoodSearch";
import { Day } from "../Day/Day";
import "./DayChart.css";

export function DayChart() {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <>
      <div className="day-chart-container">
        <Day setShowSearch={setShowSearch} />
        <Day setShowSearch={setShowSearch} />
        <Day setShowSearch={setShowSearch} />
        <Day setShowSearch={setShowSearch} />
      </div>
      {showSearch && <FoodSearch setShowSearch={setShowSearch} />}
    </>
  );
}
