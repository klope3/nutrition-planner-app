import { exampleSearch } from "../test-responses/search";
import "./App.css";
import { DayChart } from "./components/Planner/DayChart/DayChart";
import { Planner } from "./components/Planner/Planner";
import { FoodSearch } from "./components/Search/FoodSearch/FoodSearch";

function App() {
  return (
    <div className="App">
      <DayChart />
    </div>
  );
}

export default App;
