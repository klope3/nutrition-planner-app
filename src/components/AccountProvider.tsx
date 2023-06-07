import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserAccount } from "../accounts";

type ChildrenProps = {
  children: ReactNode;
};

type AccountContextType = {
  activeUser: UserAccountSimple;
  setActiveUser: (user: UserAccount) => void;
  signIn: (
    email: string,
    password: string,
    setSignInError: (error: string) => void
  ) => void;
};

type UserAccountSimple = Omit<UserAccount, "password">;

const AccountContext = createContext({} as AccountContextType);

export function useAccount() {
  return useContext(AccountContext);
}

export function AccountProvider({ children }: ChildrenProps) {
  const [activeUser, setActiveUser] = useState({} as UserAccountSimple);
  const navigate = useNavigate();

  function signIn(
    email: string,
    password: string,
    setSignInError: (error: string) => void
  ) {
    trySignIn(
      (user: any) => user.email === email && user.password === password,
      setSignInError
    );
  }

  function trySignIn(
    checkCredentialsCb: (user: any) => void,
    setSignInError?: (error: string) => void
  ) {
    console.log("try sign in ");
  }

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return;
    trySignIn((user: any) => user.email === savedUser);
  }, []);

  return (
    <AccountContext.Provider value={{ activeUser, setActiveUser, signIn }}>
      {children}
    </AccountContext.Provider>
  );
}
