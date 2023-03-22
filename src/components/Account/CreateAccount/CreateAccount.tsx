import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  tryCreateAccount,
  tryGetUser,
  tryValidateUser,
} from "../../../accounts";
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
    const anyErrors = Object.values(inputErrors).find((value) => !!value);
    if (anyErrors) {
      return;
    }
    const existingUser = await tryGetUser(email); //currently there's no way to distinguish between a server error and a missing user here
    if (existingUser) {
      setCreateAccountError("Could not create account.");
      return;
    }
    const createdAccount = await tryCreateAccount(email, password);
    if (!createdAccount) {
      setCreateAccountError("Could not create account.");
      return;
    }
    const validated = await tryValidateUser(createdAccount.dbId);
    if (!validated) {
      setCreateAccountError("Could not create account.");
      return;
    }
    setActiveUser(createdAccount);
    navigate("/chart");
  }

  const fields: InputField[] = [
    {
      name: "email",
      labelText: "Email Address",
      value: email,
      errorText: inputErrors.email,
      changeFunction: setEmail,
    },
    {
      name: "password",
      labelText: "Password",
      value: password,
      errorText: inputErrors.password,
      changeFunction: setPassword,
    },
    {
      name: "passwordConfirm",
      labelText: "Confirm Password",
      value: passwordConfirm,
      errorText: inputErrors.passwordConfirm,
      changeFunction: setPasswordConfirm,
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
              blurFunction={(e) => blurField(e)}
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
