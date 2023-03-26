import { useNavigate } from "react-router-dom";
import { useAccount } from "../../AccountProvider";
import { Logo } from "../../Common/Logo/Logo";
import "./DayChartHeader.css";

export function DayChartHeader() {
  const { activeUser } = useAccount();
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="day-chart-header">
      <Logo />
      <div className="day-chart-header-account-container">
        <div>{activeUser.email}</div>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
}
