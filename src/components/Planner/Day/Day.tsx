import { sectionsPerDay } from "../../../constants";
import { DaySection } from "../DaySection/DaySection";
import { NutrientProgressArea } from "../NutrientProgressArea/NutrientProgressArea";
import "./Day.css";

type DayProps = {
  indexInChart: number
}

export function Day(props: DayProps) {
  const { indexInChart } = props;
  const sections = new Array(sectionsPerDay).fill({});
  return (
    <div className="day">
      {sections.map((section, i) => (
        <DaySection key={i} indexInDay={i} dayIndex={indexInChart} />
      ))}
      <NutrientProgressArea />
    </div>
  );
}

const day = {};
