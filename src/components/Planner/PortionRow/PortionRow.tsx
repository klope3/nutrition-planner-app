import { useEffect, useState } from "react";
import { unknownFoodName } from "../../../constants";
import { useFakeData } from "../../../fakeData";
import { fetchSingleFdcFoodJson } from "../../../fetch";
import { PortionRowState } from "../../../types/DayChartTypes";
import { useAccount } from "../../AccountProvider";
import { useDayChart } from "../../DayChartProvider";
import "./PortionRow.css";

type PortionRowProps = {
  row: PortionRowState;
};

export function PortionRow(props: PortionRowProps) {
  const {
    row: { dbId: rowId, fdcId, foodData },
  } = props;
  const { deletePortion } = useDayChart();
  const { activeUser } = useAccount();

  return (
    <div className="portion-row">
      <div>{foodData.description}</div>
      <button
        className="remove-portion-button"
        onClick={() => deletePortion(activeUser.dbId, rowId)}
      >
        X
      </button>
    </div>
  );
}
