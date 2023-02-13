import { DaySection } from "../DaySection/DaySection";
import { NutrientProgressArea } from "../NutrientProgressArea/NutrientProgressArea";
import "./Day.css";

export function Day() {
  return (
    <div className="day">
      <DaySection />
      <DaySection />
      <DaySection />
      <DaySection />
      <DaySection />
      <NutrientProgressArea />
    </div>
  );
}
