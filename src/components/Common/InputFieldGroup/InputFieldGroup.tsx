import { InputFieldProps } from "../../../types/InputFieldTypes";
import { InputField } from "../InputField/InputField";

type InputFieldGroupProps = {
  fieldData: InputFieldProps[];
};

export function InputFieldGroup({ fieldData }: InputFieldGroupProps) {
  return (
    <>
      {fieldData.map((field) => (
        <InputField
          name={field.name}
          labelText={field.labelText}
          value={field.value}
          errorText={field.errorText}
          changeFunction={field.changeFunction}
          blurFunction={field.blurFunction}
          hideablePassword={field.hideablePassword}
        />
      ))}
    </>
  );
}
