import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  tryCreateAccount,
  tryGetUser,
  tryValidateUser,
} from "../../../accounts";
import { useAccount } from "../../AccountProvider";
import { InputField } from "../../Common/InputField/InputField";

export function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [createAccountError, setCreateAccountError] = useState("");
  const navigate = useNavigate();
  const { setActiveUser } = useAccount();

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
          changeFunction={(e) => setEmail(e.target.value)}
        />
        <InputField
          name="password"
          labelText={"Password"}
          value={password}
          changeFunction={(e) => setPassword(e.target.value)}
        />
        <InputField
          name="password-confirm"
          labelText={"Confirm Password"}
          value={passwordConfirm}
          changeFunction={(e) => setPasswordConfirm(e.target.value)}
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
