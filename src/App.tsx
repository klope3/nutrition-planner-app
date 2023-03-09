import { Routes } from "react-router";
import { Route } from "react-router-dom";
import "./App.css";
import { CreateAccount } from "./components/Account/CreateAccount/CreateAccount";
import { SignIn } from "./components/Account/SignIn/SignIn";
import { AccountProvider } from "./components/AccountProvider";
import { DayChartProvider } from "./components/DayChartProvider";
import { DayChart } from "./components/Planner/DayChart/DayChart";

function App() {
  return (
    <div className="App">
      <AccountProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route
            path="/chart"
            element={
              <DayChartProvider>
                <DayChart />
              </DayChartProvider>
            }
          />
        </Routes>
      </AccountProvider>
    </div>
  );
}

export default App;
