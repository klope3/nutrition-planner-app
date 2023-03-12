type OptionalString = string | undefined;

type InputErrors = {
  email: OptionalString;
  password: OptionalString;
  passwordConfirm: OptionalString;
};

type InputField = {
  name: string;
  labelText: string;
  value: string;
  errorText?: string;
  changeFunction: (value: string) => void;
};
