import { useEffect, useState } from "react";
import { unknownFoodName, useFakeSearch } from "../../../constants";
import { fetchSingleFdcFoodJson } from "../../../fetch";
import { PortionRowData } from "../../../types/DayChartTypes";
import { useDayChart } from "../../DayChartProvider";
import "./PortionRow.css";

type PortionRowProps = {
  row: PortionRowData;
};

export function PortionRow(props: PortionRowProps) {
  const {
    row: { fdcId, id },
  } = props;
  const [name, setName] = useState("");
  const { deletePortion } = useDayChart();
  useEffect(() => {
    async function fetchName() {
      if (useFakeSearch) {
        setName("Food Portion");
        return;
      }
      const json = await fetchSingleFdcFoodJson(fdcId);
      setName(json ? json.description : unknownFoodName);
    }
    fetchName();
  }, []);

  return (
    <div className="portion-row">
      {name && <div>{name}</div>}
      <button className="button-x" onClick={() => deletePortion(id)}>
        X
      </button>
    </div>
  );
}
