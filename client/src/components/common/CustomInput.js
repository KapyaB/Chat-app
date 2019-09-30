import React from 'react';
import PropTypes from 'prop-types';

const CustomInput = ({
  input: { onChange, value },
  id,
  name,
  placeholder,
  type,
  label,
  autoComplete,
  isRequired
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        name={name}
        placeholder={placeholder}
        className="form-input"
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={isRequired}
      />
    </div>
  );
};

CustomInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  autoComplete: PropTypes.string,
  onChange: PropTypes.func
};

export default CustomInput;
