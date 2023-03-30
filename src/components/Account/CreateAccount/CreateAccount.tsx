import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputErrors, InputFieldProps } from "../../../types/InputFieldTypes";
import { useAccount } from "../../AccountProvider";
import { InputFieldGroup } from "../../Common/InputFieldGroup/InputFieldGroup";
import "../Account.css";
import { AccountBoxHeader } from "../AccountBoxHeader/AccountBoxHeader";
import { blurField, clickCreateAccount } from "./CreateAccountFunctions";

export function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [createAccountError, setCreateAccountError] = useState("");
  const [inputErrors, setInputErrors] = useState({} as InputErrors);
  const navigate = useNavigate();
  const { setActiveUser } = useAccount();

  const blur = (e: React.ChangeEvent<HTMLInputElement>) => {
    blurField(e, inputErrors, email, password, passwordConfirm, setInputErrors);
  };
  const fields: InputFieldProps[] = [
    {
      name: "email",
      labelText: "Email Address",
      value: email,
      errorText: inputErrors.email,
      changeFunction: (e) => {
        setEmail(e.target.value);
      },
      blurFunction: blur,
    },
    {
      name: "password",
      labelText: "Password",
      value: password,
      errorText: inputErrors.password,
      changeFunction: (e) => {
        setPassword(e.target.value);
      },
      blurFunction: blur,
      hideablePassword: true,
    },
    {
      name: "passwordConfirm",
      labelText: "Confirm Password",
      value: passwordConfirm,
      errorText: inputErrors.passwordConfirm,
      changeFunction: (e) => {
        setPasswordConfirm(e.target.value);
      },
      blurFunction: blur,
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
          {createAccountError.length > 0 && (
            <div className="error-text">{createAccountError}</div>
          )}
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              clickCreateAccount(
                email,
                password,
                passwordConfirm,
                setInputErrors,
                setCreateAccountError,
                setActiveUser,
                navigate
              );
            }}
          >
            Create Account
          </button>
        </form>
        <Link to="/">Sign In</Link>
      </div>
    </div>
  );
}
