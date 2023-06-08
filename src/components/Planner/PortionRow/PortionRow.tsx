import { Portion } from "../../../types/DayChartNew";
import { useAccount } from "../../AccountProvider";
import { useDayChart } from "../../DayChartProvider";
import "./PortionRow.css";

type PortionRowProps = {
  row: Portion;
};

export function PortionRow(props: PortionRowProps) {
  const {
    row: { id: rowId, fdcId },
  } = props;
  const { deletePortion } = useDayChart();
  const { activeUser } = useAccount();

  return (
    <div className="portion-row">
      <div>{fdcId}</div>
      <button
        className="remove-portion-button"
        onClick={() => deletePortion(activeUser.dbId, rowId)}
      >
        X
      </button>
    </div>
  );
}
