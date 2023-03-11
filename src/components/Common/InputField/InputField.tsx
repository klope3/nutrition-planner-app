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

  return (
    <div className="input-field-container">
      <label htmlFor={id ? id : name}>{labelText}</label>
      <input
        type="text"
        name={name}
        id={id ? id : name}
        onChange={changeFunction}
        onBlur={blurFunction}
      />
      {errorText && <div className="error-text">{errorText}</div>}
    </div>
  );
}
