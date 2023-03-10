import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { tryGetUser, tryValidateUser } from "../../../accounts";
import { useAccount } from "../../AccountProvider";
import { InputField } from "../../Common/InputField/InputField";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const navigate = useNavigate();
  const { setActiveUser } = useAccount();

  async function trySignIn() {
    const user = await tryGetUser(email, password);
    if (user) {
      const validated = await tryValidateUser(user.dbId);
      if (!validated) {
        setSignInError("Something went wrong. Try again later.");
        return;
      }
      setSignInError("");
      setActiveUser(user);
      navigate("/chart");
    } else {
      setSignInError("Invalid username or password.");
    }
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
        {signInError.length > 0 && (
          <div className="error-text">{signInError}</div>
        )}
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
