import { useEffect, useState } from "react";
import { unknownFoodName } from "../../../constants";
import { useFakeData } from "../../../fakeData";
import { fetchSingleFdcFoodJson } from "../../../fetch";
import { PortionRowState } from "../../../types/DayChartTypes";
import { useDayChart } from "../../DayChartProvider";
import "./PortionRow.css";

type PortionRowProps = {
  row: PortionRowState;
};

export function PortionRow(props: PortionRowProps) {
  const {
    row: { dbId, fdcId, foodName },
  } = props;
  const { deletePortion } = useDayChart();

  return (
    <div className="portion-row">
      <div>{foodName}</div>
      <button className="button-x" onClick={() => deletePortion(dbId)}>
        X
      </button>
    </div>
  );
}
