import React from 'react';

const Input = ({name, label, value, onChange,errors}) => {
  return ( 
    <div className="form-group">
      <label htmlFor="Username">{label}</label>
      <input
        value={value}
        onChange={onChange}
        autoFocus
        id={name}
        type="text"
        name={name}
        className="form-control" />
      {errors && <div className="alert alert-danger">{errors}</div> }
          </div>
        
   );
}
 
export default Input;