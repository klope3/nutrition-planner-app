import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { tryGetUser, tryValidateUser } from "../../../accounts";
import { useAccount } from "../../AccountProvider";
import { InputField } from "../../Common/InputField/InputField";
import { LoadingIndicator } from "../../Common/LoadingIndicator/LoadingIndicator";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [tryingAutoSignIn, setTryingAutoSignIn] = useState(true);
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
      localStorage.setItem("user", email);
      navigate("/chart");
    } else {
      setSignInError("Invalid username or password.");
    }
  }

  useEffect(() => {
    async function tryAutoSignIn(email: string) {
      const user = await tryGetUser(email);
      if (user) {
        const validated = await tryValidateUser(user.dbId);
        if (!validated) {
          setTryingAutoSignIn(false);
          return;
        }
        setActiveUser(user);
        navigate("/chart");
      } else {
        setTryingAutoSignIn(false);
      }
    }
    const existingEmail = localStorage.getItem("user");
    if (!existingEmail) {
      setTryingAutoSignIn(false);
      return;
    }
    tryAutoSignIn(existingEmail);
  }, []);

  const fields: InputField[] = [
    {
      name: "email",
      labelText: "Email Address",
      value: email,
      changeFunction: setEmail,
    },
    {
      name: "password",
      labelText: "Password",
      value: password,
      changeFunction: setPassword,
    },
  ];

  return (
    <>
      <form
        className="account-box"
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
          />
        ))}
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
      {tryingAutoSignIn && <LoadingIndicator />}
      <Link to="/createAccount">Create Account</Link>
    </>
  );
}
