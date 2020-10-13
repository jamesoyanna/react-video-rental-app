import React from 'react';
import Joi from 'joi-browser';
import Form from './common/Form';

class LoginForm extends Form {
 state = {
   data: {username: "", password: ""},
   errors: {}
 }

 //Using Joi for validation
 schema = {
   username: Joi.string().required().label("Username"),
   password: Joi.string().required().label("Password")
 }



  doSubmit = ()=>{
    //call to server
    console.log("Form submitted");
  }
 

  render() {
    return (
      <div>
        <h1>Login Form</h1>
      <form onSubmit={this.handleSubmit}>
       
       {this.renderInput('username', 'Username')}
        {this.renderInput('password', 'Password', 'password')}

      {this.renderButton("Login")}
      
        </form>
      </div>
    );
  }
}

export default LoginForm;
