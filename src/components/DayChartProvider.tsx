import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { tryGetUser } from "../accounts";
import { DayChartData, DayChartState } from "../types/DayChartTypes";
import {
  tryAddPortion,
  tryDeletePortion,
  updateDayChart,
} from "../updateDayChart";
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

  async function addPortion(
    userId: number,
    fdcId: number,
    fractionOfServing: number
  ) {
    const added = await tryAddPortion(
      fdcId,
      fractionOfServing,
      clickedSectionIndex,
      dayChart
    );
    if (added) updateDayChart(userId, setDayChart, setIsLoading, updateFailure);
  }

  async function deletePortion(userId: number, portionId: number) {
    const deleted = await tryDeletePortion(portionId);
    if (deleted)
      updateDayChart(userId, setDayChart, setIsLoading, updateFailure);
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
  const [isLoading, setIsLoading] = useState(true);
  const [clickedSectionIndex, setClickedSectionIndex] = useState(0);
  const { activeUser, setActiveUser } = useAccount();
  const navigate = useNavigate();

  function updateFailure() {
    navigate("/error");
  }

  useEffect(() => {
    const initial = async () => {
      let userData = activeUser;
      const notActiveUser = activeUser.email === undefined;
      if (notActiveUser) {
        const savedEmail = localStorage.getItem("user");
        if (savedEmail) {
          const user = await tryGetUser(savedEmail, undefined);
          if (user && user.userAccount) {
            setActiveUser(user.userAccount);
            userData = user.userAccount;
          } else {
            navigate("/error");
            return;
          }
        }
      }
      updateDayChart(userData.dbId, setDayChart, setIsLoading, updateFailure);
    };
    initial();
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
        updateFailure,
      }}
    >
      {children}
    </DayChartContext.Provider>
  );
}
