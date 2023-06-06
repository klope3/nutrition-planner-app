import { useState } from "react";
import { Link } from "react-router-dom";
import { invalidCredentialsError } from "../../../constants";
import { InputFieldProps } from "../../../types/InputFieldTypes";
import { useAccount } from "../../AccountProvider";
import { InputFieldGroup } from "../../Common/InputFieldGroup/InputFieldGroup";
import "../Account.css";
import { AccountBoxHeader } from "../AccountBoxHeader/AccountBoxHeader";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const { signIn } = useAccount();

  function clickSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    if (!email || !password) {
      setSignInError(invalidCredentialsError);
      return;
    }
    console.log("Try sign in with " + email + ", " + password);
    // signIn(email, password, setSignInError);
  }

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
        <form onSubmit={clickSignIn}>
          <InputFieldGroup fieldData={fields} />
          {signInError.length > 0 && (
            <div className="error-text">{signInError}</div>
          )}
          <button type="submit">Sign In</button>
        </form>
        <Link to="/createAccount">Create Account</Link>
      </div>
    </div>
  );
}
