import "./InputField.css";

type InputFieldProps = {
  name: string;
  id?: string;
  value: any;
  labelText?: string;
  errorText?: string;
  changeFunction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  blurFunction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputField(props: InputFieldProps) {
  const {
    errorText,
    labelText,
    name,
    id,
    value,
    changeFunction,
    blurFunction,
  } = props;

  let validationClass = errorText && "field-error";
  if (!errorText && value) validationClass = "field-success";

  return (
    <div className={`input-field-container ${validationClass}`}>
      <label htmlFor={id ? id : name}>{labelText}</label>
      <div className="input-field-sub-container">
        <input
          type="text"
          name={name}
          id={id ? id : name}
          onChange={changeFunction}
          onBlur={blurFunction}
        />
      </div>
      {errorText && <div className="error-text">{errorText}</div>}
    </div>
  );
}
