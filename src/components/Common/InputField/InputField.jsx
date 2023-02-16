export function InputField(props) {
  const { errorText, labelText, name, id, value, changeFunction } = props;

  return (
    <div className="input-field-container">
      <label htmlFor={id ? id : name}>{labelText}</label>
      <input
        type="text"
        name={name}
        id={id ? id : name}
        onChange={changeFunction}
      />
      {errorText && <div className="error-text">{errorText}</div>}
    </div>
  );
}
