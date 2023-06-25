import { useState } from "react";
import { Portion } from "../../../types/DayChartNew";
import { FoodData } from "../../../types/FoodDataNew";
import { useDayChart } from "../../DayChartProvider";
import "./PortionRow.css";

type PortionRowProps = {
  row: Portion;
};

export function PortionRow(props: PortionRowProps) {
  const {
    row: { id: rowId, fdcId },
  } = props;
  const { deletePortion, foodData } = useDayChart();
  const data = foodData.find((data) => data.fdcId === fdcId);
  const text = data ? data.description : "Unknown Item";

  return (
    <div className="portion-row">
      <div>{text}</div>
      <button
        className="remove-portion-button"
        onClick={() => {
          const id = localStorage.getItem("userId");
          if (!id) return;
          deletePortion(+id, rowId);
        }}
      >
        X
      </button>
    </div>
  );
}
