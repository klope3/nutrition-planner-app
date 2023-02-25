import { PortionRowData } from "../../../types/DayChartTypes";
import { useDayChart } from "../../DayChartProvider";
import "./PortionRow.css";

type PortionRowProps = {
  row: PortionRowData
}

export function PortionRow(props: PortionRowProps) {
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
