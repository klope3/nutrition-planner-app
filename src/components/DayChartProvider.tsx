import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  DayChartData,
  DayChartState,
  PortionRowState,
} from "../types/DayChartTypes";
import { updateDayChart } from "../updateDayChart";
import { useAccount } from "./AccountProvider";

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
  ): PortionRowState[] {
    console.log(
      "Getting rows for section " +
        sectionIndexInDay +
        " in day " +
        dayIndexInChart
    );
    return [];
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
  const [dayChartData, setDayChartData] = useState({} as DayChartData);
  const [dayChart, setDayChart] = useState({} as DayChartState);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedSectionIndex, setClickedSectionIndex] = useState(0);
  const { activeUser, setActiveUser } = useAccount();
  const navigate = useNavigate();

  function updateFailure() {
    navigate("/error");
  }

  useEffect(() => {
    if (activeUser.dbId)
      updateDayChart(activeUser.dbId, setDayChart, setIsLoading, updateFailure);
  }, [activeUser]);

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
        updateFailure,
      }}
    >
      {children}
    </DayChartContext.Provider>
  );
}
