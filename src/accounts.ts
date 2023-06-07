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
