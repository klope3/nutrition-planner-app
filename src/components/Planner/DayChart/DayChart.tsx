import { daysToShow } from "../../../constants";
import { LoadingIndicator } from "../../Common/LoadingIndicator/LoadingIndicator";
import { useDayChart } from "../../DayChartProvider";
import { FoodSearch } from "../../Search/FoodSearch/FoodSearch";
import { Day } from "../Day/Day";
import { DayChartHeader } from "../DayChartHeader/DayChartHeader";
import "./DayChart.css";

export function DayChart() {
  const { showSearch, isLoading } = useDayChart();
  const days = new Array(daysToShow).fill({});

  return (
    <>
      <DayChartHeader />
      <div className="day-chart-container">
        {days.map((_, i) => (
          <Day key={i} indexInChart={i} />
        ))}
      </div>
      {isLoading && <LoadingIndicator />}
      {showSearch && <FoodSearch />}
    </>
  );
}
