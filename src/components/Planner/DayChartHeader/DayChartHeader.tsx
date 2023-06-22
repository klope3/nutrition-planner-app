import { useNavigate } from "react-router-dom";
import { Logo } from "../../Common/Logo/Logo";
import "./DayChartHeader.css";

export function DayChartHeader() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  function signOut() {
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="day-chart-header">
      <Logo />
      <div className="day-chart-header-account-container">
        <div>{email}</div>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
}
