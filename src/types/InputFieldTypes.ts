import { ReactNode } from "react";

type OptionalString = string | undefined;

export type InputErrors = {
  email: OptionalString;
  password: OptionalString;
  passwordConfirm: OptionalString;
};

export type InputFieldProps = {
  name: string;
  id?: string;
  value: any;
  labelText?: string;
  errorText?: string;
  hideablePassword?: boolean;
  buttonChildren?: ReactNode;
  buttonType?: "submit" | undefined;
  changeFunction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  blurFunction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonFunction?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
