import React from 'react';

const Input = ({name, value, onChange, label}) => {
    return (
      <div className="form-group">
        <label htmlFor="username">{label}</label>
        <input
          name={name}
          onChange={onChange}
          value={value}
          autoFocus
          
          id={name}
          type="text"
          className="form-control"
        />
      </div>
    );
}

export default Input;
