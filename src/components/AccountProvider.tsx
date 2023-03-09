import { ReactNode, useState, createContext, useContext } from "react";
import { UserAccount } from "../accounts";

type ChildrenProps = {
  children: ReactNode;
};

type AccountContextType = {
  activeUser: UserAccount;
  setActiveUser: (user: UserAccount) => void;
};

const AccountContext = createContext({} as AccountContextType);

export function useAccount() {
  return useContext(AccountContext);
}

export function AccountProvider({ children }: ChildrenProps) {
  const [activeUser, setActiveUser] = useState({} as UserAccount);

  return (
    <AccountContext.Provider value={{ activeUser, setActiveUser }}>
      {children}
    </AccountContext.Provider>
  );
}
