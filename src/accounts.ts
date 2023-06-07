import { z } from "zod";
import { invalidSignInError, miscError } from "./constants";
import { FORBIDDEN, NOT_FOUND } from "./statusCodes";

export type UserAccount = {
  dbId: number;
  email: string;
  password: string;
};

export async function tryValidateUser(userId: number) {
  console.log("Try to validate user " + userId);
}

export async function tryGetUser(
  emailToMatch: string,
  passwordToMatch?: string
) {
  console.log(
    "try to get user with " + emailToMatch + " and " + passwordToMatch
  );
}

export async function tryCreateAccount(email: string, password: string) {
  console.log("try to create account with " + email + " and " + password);
}

export async function trySignIn(email: string, password: string) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const body = JSON.stringify({ email, password });
  const requestOptions = {
    method: "POST",
    headers,
    body,
  };

  return fetch("http://localhost:3000/auth/login", requestOptions)
    .then((res) => {
      if ([FORBIDDEN, NOT_FOUND].includes(res.status)) {
        throw new Error(invalidSignInError);
      } else if (!res.ok) {
        throw new Error(miscError);
      }
      return res.json();
    })
    .then((json) => {
      try {
        const schema = z.object({
          userId: z.number(),
          token: z.string(),
        });
        const parsed = schema.parse(json);
        localStorage.setItem("userId", `${parsed.userId}`);
        localStorage.setItem("token", parsed.token);
      } catch (error) {
        console.error("The response did not have the correct data shape.");
        throw new Error(miscError);
      }
    });
}
