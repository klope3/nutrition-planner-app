import { useDayChart } from "../../DayChartProvider";
import "./PortionRow.css";

export function PortionRow(props) {
  const {
    row: { fdcId, id },
  } = props;

  const { deletePortion } = useDayChart();

  return (
    <div className="portion-row">
      {fdcId}
      <button className="button-x" onClick={() => deletePortion(id)}>
        X
      </button>
    </div>
  );
}
