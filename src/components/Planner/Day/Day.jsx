import { DaySection } from "../DaySection/DaySection";
import { NutrientProgressArea } from "../NutrientProgressArea/NutrientProgressArea";
import "./Day.css";

export function Day(props) {
  const {
    day: { sections },
    setShowSearch,
    setClickedSectionIndex,
    deletePortion,
  } = props;
  return (
    <div className="day">
      {sections.map((section, i) => (
        <DaySection
          key={i}
          section={section}
          setShowSearch={setShowSearch}
          setClickedSectionIndex={setClickedSectionIndex}
          deletePortion={deletePortion}
        />
      ))}
      <NutrientProgressArea />
    </div>
  );
}

const day = {};
