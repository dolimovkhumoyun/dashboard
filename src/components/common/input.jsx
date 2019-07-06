import React from "react";

const Input = ({ name, label, value, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} />
      {label}
      <input autoFocus {...rest} name={name} className="form-control" />
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Input;
