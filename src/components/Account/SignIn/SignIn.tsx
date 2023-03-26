import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { tryGetUser, tryValidateUser } from "../../../accounts";
import { useAccount } from "../../AccountProvider";
import { InputField } from "../../Common/InputField/InputField";
import { LoadingIndicator } from "../../Common/LoadingIndicator/LoadingIndicator";
import { Logo } from "../../Common/Logo/Logo";
import { AccountBoxHeader } from "../AccountBoxHeader/AccountBoxHeader";
import "../Account.css";

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
    validateFailureCb?: () => void,
    signInFailureCb?: () => void
  ) {
    const user = await tryGetUser(email, password);
    if (user) {
      const validated = await tryValidateUser(user.dbId);
      if (!validated) {
        if (validateFailureCb) validateFailureCb();
        return;
      }
      setSignInError("");
      setActiveUser(user);
      localStorage.setItem("user", email);
      navigate("/chart");
    } else {
      if (signInFailureCb) signInFailureCb();
    }
  }

  function clickSignIn() {
    trySignIn(
      email,
      password,
      () => {
        setSignInError("Something went wrong. Try again later.");
      },
      () => {
        setSignInError("Invalid username or password.");
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

  const fields: InputField[] = [
    {
      name: "email",
      labelText: "Email Address",
      value: email,
      changeFunction: setEmail,
    },
    {
      name: "password",
      labelText: "Password",
      value: password,
      changeFunction: setPassword,
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
          {fields.map((field) => (
            <InputField
              name={field.name}
              labelText={field.labelText}
              value={field.value}
              errorText={field.errorText}
              changeFunction={(e) => field.changeFunction(e.target.value)}
            />
          ))}
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
