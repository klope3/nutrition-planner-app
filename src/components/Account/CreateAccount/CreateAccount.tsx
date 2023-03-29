import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  tryCreateAccount,
  tryGetUser,
  tryValidateUser,
} from "../../../accounts";
import { InputErrors, InputFieldProps } from "../../../types/InputFieldTypes";
import {
  checkValidEmail,
  checkValidPassword,
  matchPasswordsMessage,
  provideEmailMessage,
  validPasswordMessage,
} from "../../../validations";
import { useAccount } from "../../AccountProvider";
import { InputField } from "../../Common/InputField/InputField";
import "../Account.css";
import { AccountBoxHeader } from "../AccountBoxHeader/AccountBoxHeader";

export function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [createAccountError, setCreateAccountError] = useState("");
  const [inputErrors, setInputErrors] = useState({} as InputErrors);
  const navigate = useNavigate();
  const { setActiveUser } = useAccount();

  function getNewErrors() {
    const newErrors: InputErrors = {
      email: checkValidEmail(email) ? undefined : provideEmailMessage,
      password: checkValidPassword(password) ? undefined : validPasswordMessage,
      passwordConfirm:
        password === passwordConfirm ? undefined : matchPasswordsMessage,
    };
    return newErrors;
  }

  function blurField(event: React.ChangeEvent<HTMLInputElement>) {
    const sender = event.target.name as keyof InputErrors;
    const errorsToSet = { ...inputErrors };
    const newErrors = getNewErrors();
    errorsToSet[sender] = newErrors[sender];
    if (sender === "password") {
      errorsToSet.passwordConfirm = newErrors.passwordConfirm;
    }
    setInputErrors(errorsToSet);
  }

  async function clickCreateAccount() {
    const errors = getNewErrors();
    const anyErrors = Object.values(errors).find((value) => !!value);
    if (anyErrors) {
      setInputErrors(errors);
      return;
    }
    const existingUserResponse = await tryGetUser(email);
    if (existingUserResponse.userAccount) {
      setCreateAccountError("An account with that email already exists.");
      return;
    }
    if (existingUserResponse.error === "serverError") {
      setCreateAccountError("Server error - try again later.");
      return;
    }
    const createdAccountResponse = await tryCreateAccount(email, password);
    if (!createdAccountResponse.userAccount) {
      setCreateAccountError("Server error - try again later.");
      return;
    }
    const validated = await tryValidateUser(
      createdAccountResponse.userAccount.dbId
    );
    if (!validated) {
      setCreateAccountError("Server error - try again later.");
      return;
    }
    setActiveUser(createdAccountResponse.userAccount);
    navigate("/chart");
  }

  const fields: InputFieldProps[] = [
    {
      name: "email",
      labelText: "Email Address",
      value: email,
      errorText: inputErrors.email,
      changeFunction: (e) => {
        setEmail(e.target.value);
      },
    },
    {
      name: "password",
      labelText: "Password",
      value: password,
      errorText: inputErrors.password,
      changeFunction: (e) => {
        setPassword(e.target.value);
      },
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
          {fields.map((field) => (
            <InputField
              name={field.name}
              labelText={field.labelText}
              value={field.value}
              errorText={field.errorText}
              changeFunction={field.changeFunction}
              blurFunction={(e) => blurField(e)}
              hideablePassword={field.hideablePassword}
            />
          ))}
          {createAccountError.length > 0 && (
            <div className="error-text">{createAccountError}</div>
          )}
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              clickCreateAccount();
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
