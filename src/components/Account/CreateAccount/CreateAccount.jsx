import { useState } from "react";
import { InputField } from "../../Common/InputField/InputField";

export function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  return (
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
      <button type="submit">Create Account</button>
    </form>
  );
}
