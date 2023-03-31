import { NavigateFunction } from "react-router-dom";
import {
  tryCreateAccount,
  tryGetUser,
  tryValidateUser,
  UserAccount,
} from "../../../accounts";
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
