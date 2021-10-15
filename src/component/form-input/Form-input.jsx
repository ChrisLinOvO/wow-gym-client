import React from "react";

import "./form-input.scss";

const FormInput = ({ handleChange, label, type, ...otherProps }) => (
  <div className="group">
    <input
      onChange={handleChange}
      {...otherProps}
      className="form-input"
      type={type}
      required
    />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
