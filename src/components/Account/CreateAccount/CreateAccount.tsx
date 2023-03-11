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

type OptionalString = string | undefined;

type InputErrors = {
  email: OptionalString;
  password: OptionalString;
  passwordConfirm: OptionalString;
};

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

  return (
    <>
      <form
        className="account-box"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <InputField
          name="email"
          labelText={"Email Address"}
          value={email}
          errorText={inputErrors.email}
          changeFunction={(e) => setEmail(e.target.value)}
          blurFunction={(e) => blurField(e)}
        />
        <InputField
          name="password"
          labelText={"Password"}
          value={password}
          errorText={inputErrors.password}
          changeFunction={(e) => setPassword(e.target.value)}
          blurFunction={(e) => blurField(e)}
        />
        <InputField
          name="passwordConfirm"
          labelText={"Confirm Password"}
          value={passwordConfirm}
          errorText={inputErrors.passwordConfirm}
          changeFunction={(e) => setPasswordConfirm(e.target.value)}
          blurFunction={(e) => blurField(e)}
        />
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
    </>
  );
}
