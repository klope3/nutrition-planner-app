import "./NutrientProgressBar.css";

export function NutrientProgressBar() {
  const style = { right: "30%" };
  return (
    <div className="nutrient-progress-bar-container">
      <div className="nutrient-progress-bar" style={style}></div>
      <div className="nutrient-progress-text">Progress Bar</div>
    </div>
  );
}
