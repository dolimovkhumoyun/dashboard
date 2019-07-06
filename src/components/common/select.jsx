import React from "react";

const Select = ({ name, label, value, error, options, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} />
      {label}
      <select autoFocus {...rest} name={name} className="form-control">
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Select;
