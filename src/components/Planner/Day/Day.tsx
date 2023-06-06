import { dayNames, sectionsPerDay } from "../../../constants";
import { useDayChart } from "../../DayChartProvider";
import { DaySection } from "../DaySection/DaySection";
import { NutrientProgressArea } from "../NutrientProgressArea/NutrientProgressArea";
import "./Day.css";

type DayProps = {
  indexInChart: number;
};

export function Day(props: DayProps) {
  const { indexInChart } = props;
  const sections = new Array(sectionsPerDay).fill({});
  // const { dayChart } = useDayChart();
  // const day = dayChart.days && dayChart.days[indexInChart];
  return (
    <div>
      <div className="day-title">{dayNames[indexInChart]}</div>
      <div className="day">
        {sections.map((_, i) => (
          <DaySection
            key={i}
            indexInDay={i}
            // dayId={day && day.id}
            dayIndex={indexInChart}
          />
        ))}
        <NutrientProgressArea dayIndex={indexInChart} />
      </div>
    </div>
  );
}
