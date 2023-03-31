export const checkValidEmail = (input: string) =>
  /^(?:[a-zA-Z\d]+)@(?:[a-zA-Z\d]+)\.(?:[a-zA-Z]{2,})$/g.test(input);
export const checkValidPassword = (input: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,20}$/g.test(input);

export const validPasswordMessage =
  "Password must be 8-20 characters, including at least one capital letter, at least one small letter, one number and one special character - !@#$%^&*()_+";
export const provideEmailMessage = "Please provide a valid email.";
export const matchPasswordsMessage = "The passwords must match.";
