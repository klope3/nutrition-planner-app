import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { DayChart, dayChartSchema, Portion } from "../types/DayChartNew";
import { updateDayChart } from "../updateDayChart";
import { useAccount } from "./AccountProvider";

type DayChartContext = {
  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
  isLoading: boolean;
  setIsLoading: (b: boolean) => void;
  clickedSectionIndex: number;
  setClickedSectionIndex: (i: number) => void;
  dayChart: DayChart;
  setDayChart: (state: DayChart) => void;
  updateFailure: () => void;
};

type ChildrenProps = { children: ReactNode };

const DayChartContext = createContext<DayChartContext>({} as DayChartContext);

export function useDayChart() {
  const {
    showSearch,
    setShowSearch,
    isLoading,
    setIsLoading,
    clickedSectionIndex,
    setClickedSectionIndex,
    dayChart,
    setDayChart,
    updateFailure,
  } = useContext(DayChartContext);

  async function addPortion(userId: number, fdcId: number) {
    console.log("Add fdcId " + fdcId + " for user " + userId);
  }

  async function deletePortion(userId: number, portionId: number) {
    console.log("delete portion " + portionId + " for user " + userId);
  }

  function getRowsForSection(
    dayIndexInChart: number,
    sectionIndexInDay: number
  ): Portion[] {
    const days = dayChart?.days;
    const sections = days && days[dayIndexInChart]?.sections;
    const rows = sections && sections[sectionIndexInDay]?.portions;
    return rows ? rows : [];
  }

  return {
    showSearch,
    setShowSearch,
    isLoading,
    clickedSectionIndex,
    setClickedSectionIndex,
    addPortion,
    deletePortion,
    getRowsForSection,
    dayChart,
    updateDayChart,
  };
}

export function DayChartProvider({ children }: ChildrenProps) {
  const [dayChart, setDayChart] = useState({} as DayChart);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedSectionIndex, setClickedSectionIndex] = useState(0);
  const navigate = useNavigate();

  function updateFailure() {
    navigate("/error");
  }

  useEffect(() => {
    const loggedInId = localStorage.getItem("userId");
    const loggedInToken = localStorage.getItem("token");
    if (loggedInId === undefined || loggedInToken === undefined) {
      navigate("/");
    }

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${loggedInToken}`);
    const requestOptions = {
      method: "GET",
      headers,
    };
    console.log("Trying to get chart for user " + loggedInId);
    fetch(`http://localhost:3000/users/${loggedInId}/chart`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          res
            .clone()
            .json()
            .then((json) => {
              if (json.message !== undefined) {
                throw new Error(json.message);
              }
            });
        }
        return res.json();
      })
      .then((json) => {
        try {
          const parsedDayChart = dayChartSchema.parse(json);
          setDayChart(parsedDayChart);
        } catch (error) {
          console.error(error);
        }
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <DayChartContext.Provider
      value={{
        // dayChartData,
        // setDayChartData,
        showSearch,
        setShowSearch,
        isLoading,
        setIsLoading,
        clickedSectionIndex,
        setClickedSectionIndex,
        dayChart,
        setDayChart,
        updateFailure,
      }}
    >
      {children}
    </DayChartContext.Provider>
  );
}
