import { exampleSearch } from "../test-responses/search";
import "./App.css";
import { Planner } from "./components/Planner/Planner";
import { FoodSearch } from "./components/Search/FoodSearch/FoodSearch";

function App() {
  return (
    <div className="App">
      <Planner />
    </div>
  );
}

export default App;
