import { createContext } from "react";

const AppContext = createContext({});

export function AppProvider({ children }) {
  return <AppContext.Provider>{children}</AppContext.Provider>;
}
