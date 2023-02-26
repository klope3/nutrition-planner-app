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
  console.log("Trying to find a day in db with index " + indexInChart);
  const day =
    dayChartDays &&
    dayChartDays.find(
      (dayChartDay) =>
        dayChartDay.indexInChart === indexInChart &&
        dayChartDay.dayChartId === 1
    );
  console.log(day ? "Found day id " + day.id : "No day found");
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
