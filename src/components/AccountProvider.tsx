import {
  ReactNode,
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserAccount } from "../accounts";
import { invalidCredentialsError, miscError } from "../constants";
import { fetchFromDb } from "../fetch";

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
    fetchFromDb("users")
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        } else {
          return res.json();
        }
      })
      .then((res) => res.find(checkCredentialsCb))
      .then((res) => {
        if (res) {
          const user: UserAccountSimple = {
            dbId: res.id,
            email: res.email,
          };
          setActiveUser(user);
          localStorage.setItem("user", user.email);
          navigate("/chart");
        } else {
          throw new Error(invalidCredentialsError);
        }
      })
      .catch((error: Error) => {
        let errorMessage =
          error.message === invalidCredentialsError
            ? invalidCredentialsError
            : miscError;
        if (setSignInError) setSignInError(errorMessage);
      });
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
