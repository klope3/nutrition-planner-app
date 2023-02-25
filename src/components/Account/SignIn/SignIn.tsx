import { useState } from "react";
import { InputField } from "../../Common/InputField/InputField";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      className="account-box"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <InputField
        name="email"
        labelText="Email Address"
        value={email}
        changeFunction={(e) => setEmail(e.target.value)}
      />
      <InputField
        name="password"
        labelText="Password"
        value={password}
        changeFunction={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
    </form>
  );
}
