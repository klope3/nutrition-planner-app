import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tryGetUser, tryValidateUser } from "../../../accounts";
import { InputFieldProps } from "../../../types/InputFieldTypes";
import { useAccount } from "../../AccountProvider";
import { InputFieldGroup } from "../../Common/InputFieldGroup/InputFieldGroup";
import { LoadingIndicator } from "../../Common/LoadingIndicator/LoadingIndicator";
import "../Account.css";
import { AccountBoxHeader } from "../AccountBoxHeader/AccountBoxHeader";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [tryingAutoSignIn, setTryingAutoSignIn] = useState(true);
  const navigate = useNavigate();
  const { setActiveUser } = useAccount();

  async function trySignIn(
    email: string,
    password: string | undefined,
    signInFailureCb?: () => void,
    otherFailureCb?: () => void
  ) {
    const emptyInput =
      email.length === 0 || (password && password.length === 0);
    if (emptyInput) {
      if (signInFailureCb) signInFailureCb();
      return;
    }

    const userDataResponse = await tryGetUser(email, password);
    if (userDataResponse.error === "serverError") {
      if (otherFailureCb) otherFailureCb();
      return;
    }

    if (!userDataResponse.userAccount) {
      if (signInFailureCb) signInFailureCb();
      return;
    }

    const validated = await tryValidateUser(userDataResponse.userAccount.dbId);
    if (!validated) {
      if (otherFailureCb) otherFailureCb();
      return;
    }

    setSignInError("");
    setActiveUser(userDataResponse.userAccount);
    localStorage.setItem("user", email);
    navigate("/chart");
  }

  function clickSignIn() {
    trySignIn(
      email,
      password,
      () => {
        setSignInError("Invalid username or password.");
      },
      () => {
        setSignInError("Something went wrong. Try again later.");
      }
    );
  }

  useEffect(() => {
    const existingEmail = localStorage.getItem("user");
    if (!existingEmail) {
      setTryingAutoSignIn(false);
      return;
    }
    const cb = () => {
      setTryingAutoSignIn(false);
    };
    trySignIn(existingEmail, undefined, cb, cb);
  }, []);

  const fields: InputFieldProps[] = [
    {
      name: "email",
      labelText: "Email Address",
      value: email,
      changeFunction: (e) => {
        setEmail(e.target.value);
      },
    },
    {
      name: "password",
      labelText: "Password",
      value: password,
      changeFunction: (e) => {
        setPassword(e.target.value);
      },
      hideablePassword: true,
    },
  ];

  return (
    <div className="account-box-container">
      <div className="form-container account-box">
        <AccountBoxHeader />
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <InputFieldGroup fieldData={fields} />
          {signInError.length > 0 && (
            <div className="error-text">{signInError}</div>
          )}
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              clickSignIn();
            }}
          >
            Sign In
          </button>
        </form>
        {tryingAutoSignIn && <LoadingIndicator />}
        <Link to="/createAccount">Create Account</Link>
      </div>
    </div>
  );
}
