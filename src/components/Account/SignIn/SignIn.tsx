import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { InputField } from "../../Common/InputField/InputField";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function trySignIn() {
    console.log("sign in attempt");
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
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            trySignIn();
          }}
        >
          Sign In
        </button>
      </form>
      <Link to="/createAccount">Create Account</Link>
    </>
  );
}
