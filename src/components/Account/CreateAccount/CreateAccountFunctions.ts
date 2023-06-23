import { NavigateFunction } from "react-router-dom";
import { UserAccount } from "../../../accounts";
import { createAccountFetch } from "../../../fetch";
import { InputErrors } from "../../../types/InputFieldTypes";
import {
  checkValidEmail,
  checkValidPassword,
  matchPasswordsMessage,
  provideEmailMessage,
  validPasswordMessage,
} from "../../../validations";

export async function clickCreateAccount(
  email: string,
  password: string,
  passwordConfirm: string,
  setInputErrors: (errors: InputErrors) => void,
  setCreateAccountError: (error: string) => void,
  setActiveUser: (user: UserAccount) => void,
  navigate: NavigateFunction
) {
  const errors = getNewErrors(email, password, passwordConfirm);
  const anyErrors = Object.values(errors).find((value) => !!value);
  if (anyErrors) {
    setInputErrors(errors);
    return;
  }

  createAccountFetch(email, password)
    .then((parsedJson) => {
      localStorage.setItem("token", parsedJson.token);
      localStorage.setItem("userId", `${parsedJson.id}`);
      localStorage.setItem("userEmail", email);
      navigate("/chart");
    })
    .catch((e) => console.error(e));
}

export function getNewErrors(
  email: string,
  password: string,
  passwordConfirm: string
) {
  const newErrors: InputErrors = {
    email: checkValidEmail(email) ? undefined : provideEmailMessage,
    password: checkValidPassword(password) ? undefined : validPasswordMessage,
    passwordConfirm:
      password === passwordConfirm ? undefined : matchPasswordsMessage,
  };
  return newErrors;
}

export function blurField(
  event: React.ChangeEvent<HTMLInputElement>,
  inputErrors: InputErrors,
  email: string,
  password: string,
  passwordConfirm: string,
  setInputErrors: (errorst: InputErrors) => void
) {
  const sender = event.target.name as keyof InputErrors;
  const errorsToSet = { ...inputErrors };
  const newErrors = getNewErrors(email, password, passwordConfirm);
  errorsToSet[sender] = newErrors[sender];
  if (sender === "password") {
    errorsToSet.passwordConfirm = newErrors.passwordConfirm;
  }
  setInputErrors(errorsToSet);
}
