import { DaySection } from "../DaySection/DaySection";
import { NutrientProgressArea } from "../NutrientProgressArea/NutrientProgressArea";
import "./Day.css";

export function Day(props) {
  const { setShowSearch } = props;
  return (
    <div className="day">
      <DaySection setShowSearch={setShowSearch} />
      <DaySection setShowSearch={setShowSearch} />
      <DaySection setShowSearch={setShowSearch} />
      <DaySection setShowSearch={setShowSearch} />
      <DaySection setShowSearch={setShowSearch} />
      <NutrientProgressArea />
    </div>
  );
}

const day = {};
