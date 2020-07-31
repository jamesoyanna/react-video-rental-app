import React from 'react';

const Input = ({name, value, onChange, label, error}) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          onChange={onChange}
          value={value}
          autoFocus
          id={name}
          type="text"
          className="form-control"
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
}

export default Input;
