import { sectionsPerDay } from "../../../constants";
import { DaySection } from "../DaySection/DaySection";
import { NutrientProgressArea } from "../NutrientProgressArea/NutrientProgressArea";
import "./Day.css";

export function Day(props) {
  const { indexInChart } = props;
  const sections = new Array(sectionsPerDay).fill({});
  return (
    <div className="day">
      {sections.map((section, i) => (
        <DaySection indexInDay={i} dayIndex={indexInChart} />
      ))}
      <NutrientProgressArea />
    </div>
  );
}

const day = {};
