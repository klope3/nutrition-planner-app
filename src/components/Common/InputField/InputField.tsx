import { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./InputField.css";
import { InputFieldProps } from "../../../types/InputFieldTypes";

export function InputField(props: InputFieldProps) {
  const {
    errorText,
    labelText,
    name,
    id,
    value,
    hideablePassword,
    changeFunction,
    blurFunction,
    buttonFunction,
    buttonChildren,
    buttonType,
  } = props;
  const [hidePassword, setHidePassword] = useState(true);

  let validationClass = errorText && "field-error";
  if (!errorText && value) validationClass = "field-success";

  return (
    <div className={`input-field-container ${validationClass}`}>
      <label htmlFor={id ? id : name}>{labelText}</label>
      <div className="input-field-sub-container">
        <input
          type={hideablePassword && hidePassword ? "password" : "text"}
          name={name}
          id={id ? id : name}
          onChange={changeFunction}
          onBlur={blurFunction}
        />
        {hideablePassword && (
          <button
            className="hide-password-button"
            onClick={() => setHidePassword(!hidePassword)}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
        )}
        {(buttonFunction || buttonChildren) && (
          <button type={buttonType} onClick={buttonFunction}>
            {buttonChildren}
          </button>
        )}
      </div>
      {errorText && <div className="error-text">{errorText}</div>}
    </div>
  );
}
