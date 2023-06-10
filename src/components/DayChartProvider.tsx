import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { getFoodDataFor, loadUserDayChart } from "../fetch";
import { DayChart, dayChartSchema, Portion } from "../types/DayChartNew";
import { FoodData } from "../types/FoodDataNew";
import { updateDayChart } from "../updateDayChart";
import { getPortionsFromDayChart } from "../utility";
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
  foodData: FoodData[];
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
    foodData,
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
    foodData,
  };
}

export function DayChartProvider({ children }: ChildrenProps) {
  const [dayChart, setDayChart] = useState({} as DayChart);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedSectionIndex, setClickedSectionIndex] = useState(0);
  const [foodData, setFoodData] = useState([] as FoodData[]);
  const navigate = useNavigate();

  function updateFailure() {
    navigate("/error");
  }

  useEffect(() => {
    const loggedInId = localStorage.getItem("userId");
    const loggedInToken = localStorage.getItem("token");
    if (!loggedInId || !loggedInToken) {
      navigate("/");
      return;
    }

    loadUserDayChart(loggedInId, loggedInToken)
      .then((dayChart) => {
        if (!dayChart) {
          throw new Error("Error loading dayChart");
        }
        setDayChart(dayChart);
        return dayChart;
      })
      .then((dayChart) => {
        const allPortions = getPortionsFromDayChart(dayChart);
        const allIds = allPortions.map((portion) => portion.fdcId);
        return getFoodDataFor(allIds);
      })
      .then((foodData) => {
        setFoodData(foodData);
        setIsLoading(false);
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
        foodData,
      }}
    >
      {children}
    </DayChartContext.Provider>
  );
}
