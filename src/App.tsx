import "./App.css";
import { DayChartProvider } from "./components/DayChartProvider";
import { DayChart } from "./components/Planner/DayChart/DayChart";

function App() {
  return (
    <div className="App">
      <DayChartProvider>
        <DayChart />
      </DayChartProvider>
    </div>
  );
}

export default App;
