import { DaySection } from "../DaySection/DaySection";
import { NutrientProgressArea } from "../NutrientProgressArea/NutrientProgressArea";
import "./Day.css";

export function Day(props) {
  const {
    day: { sections },
    setShowSearch,
  } = props;
  return (
    <div className="day">
      {sections.map((section, i) => (
        <DaySection key={i} section={section} setShowSearch={setShowSearch} />
      ))}
      <NutrientProgressArea />
    </div>
  );
}

const day = {};
