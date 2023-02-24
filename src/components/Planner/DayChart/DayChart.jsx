import { useEffect, useState } from "react";
import { sectionsPerDay } from "../../../constants";
import { useDayChart } from "../../DayChartProvider";
import { FoodSearch } from "../../Search/FoodSearch/FoodSearch";
import { Day } from "../Day/Day";
import "./DayChart.css";

export function DayChart() {
  const { showSearch } = useDayChart();
  const days = new Array(4).fill({});

  return (
    <>
      <div className="day-chart-container">
        {days.map((day, i) => (
          <Day indexInChart={i} />
        ))}
      </div>
      {showSearch && <FoodSearch addPortion={addPortion} />}
    </>
  );
}
