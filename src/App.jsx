import { exampleSearch } from "../test-responses/search";
import "./App.css";
import { CreateAccount } from "./components/Account/CreateAccount/CreateAccount";
import { SignIn } from "./components/Account/SignIn/SignIn";
import { DayChart } from "./components/Planner/DayChart/DayChart";
import { Planner } from "./components/Planner/Planner";
import { FoodSearch } from "./components/Search/FoodSearch/FoodSearch";

function App() {
  return (
    <div className="App">
      <SignIn />
    </div>
  );
}

export default App;
