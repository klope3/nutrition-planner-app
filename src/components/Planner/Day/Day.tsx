import { sectionsPerDay } from "../../../constants";
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
  const {
    dayChartData: { dayChartDays },
  } = useDayChart();
  const day =
    dayChartDays &&
    dayChartDays.find(
      (dayChartDay) =>
        dayChartDay.indexInChart === indexInChart &&
        dayChartDay.dayChartId === 1
    );
  return (
    <div className="day">
      {sections.map((section, i) => (
        <DaySection
          key={i}
          indexInDay={i}
          dayId={day && day.id}
          dayIndex={indexInChart}
        />
      ))}
      <NutrientProgressArea />
    </div>
  );
}

const day = {};
