import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DayChartData, DayChartState } from "../types/DayChartTypes";
import {
  tryAddPortion,
  tryDeletePortion,
  updateDayChart,
} from "../updateDayChart";

type DayChartContext = {
  dayChartData: DayChartData;
  setDayChartData: (data: DayChartData) => void;
  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
  isLoading: boolean;
  setIsLoading: (b: boolean) => void;
  clickedSectionIndex: number;
  setClickedSectionIndex: (i: number) => void;
  dayChart: DayChartState;
  setDayChart: (state: DayChartState) => void;
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
  } = useContext(DayChartContext);

  async function addPortion(fdcId: number, fractionOfServing: number) {
    const added = await tryAddPortion(
      fdcId,
      fractionOfServing,
      clickedSectionIndex,
      dayChart
    );
    if (added) updateDayChart(setDayChart, setIsLoading);
  }

  async function deletePortion(portionId: number) {
    const deleted = await tryDeletePortion(portionId);
    if (deleted) updateDayChart(setDayChart, setIsLoading);
  }

  return {
    showSearch,
    setShowSearch,
    isLoading,
    clickedSectionIndex,
    setClickedSectionIndex,
    addPortion,
    deletePortion,
    dayChart,
    updateDayChart,
  };
}

export function DayChartProvider({ children }: ChildrenProps) {
  const [dayChartData, setDayChartData] = useState({} as DayChartData);
  const [dayChart, setDayChart] = useState({} as DayChartState);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedSectionIndex, setClickedSectionIndex] = useState(0);

  useEffect(() => {
    updateDayChart(setDayChart, setIsLoading);
  }, []);

  return (
    <DayChartContext.Provider
      value={{
        dayChartData,
        setDayChartData,
        showSearch,
        setShowSearch,
        isLoading,
        setIsLoading,
        clickedSectionIndex,
        setClickedSectionIndex,
        dayChart,
        setDayChart,
      }}
    >
      {children}
    </DayChartContext.Provider>
  );
}
