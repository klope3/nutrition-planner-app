import { useNavigate } from "react-router-dom";
import { daysToShow } from "../../../constants";
import { useAccount } from "../../AccountProvider";
import { LoadingIndicator } from "../../Common/LoadingIndicator/LoadingIndicator";
import { useDayChart } from "../../DayChartProvider";
import { FoodSearch } from "../../Search/FoodSearch/FoodSearch";
import { Day } from "../Day/Day";
import "./DayChart.css";

export function DayChart() {
  const { showSearch, isLoading } = useDayChart();
  const days = new Array(daysToShow).fill({});
  const { activeUser } = useAccount();
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <>
      <div className="day-chart-container">
        {days.map((day, i) => (
          <Day key={i} indexInChart={i} />
        ))}
      </div>
      {isLoading && <LoadingIndicator />}
      {showSearch && <FoodSearch />}
      <button onClick={signOut}>Log Out</button>
      <p>{activeUser.email}</p>
    </>
  );
}
