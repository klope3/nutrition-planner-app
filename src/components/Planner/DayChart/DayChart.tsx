import { daysToShow } from "../../../constants";
import { useDayChart } from "../../DayChartProvider";
import { FoodSearch } from "../../Search/FoodSearch/FoodSearch";
import { Day } from "../Day/Day";
import "./DayChart.css";

export function DayChart() {
  const { showSearch } = useDayChart();
  const days = new Array(daysToShow).fill({});

  return (
    <>
      <div className="day-chart-container">
        {days.map((day, i) => (
          <Day key={i} indexInChart={i} />
        ))}
      </div>
      {showSearch && <FoodSearch />}
    </>
  );
}
