import React from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';


class RegisterForm extends Form {
    state = {
        data: { firstname: "", lastname: "", username: "", password: ""},
        errors: {}
    }

// Defining the schema for validation
  schema = {
      username: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).label("Username"),
      password: Joi.string().min(5),
      firstname: Joi.string().required().label("First Name"),
      lastname: Joi.string().required().label("Last Name"),
      
  }

    doSubmit= ()=>{
      console.log("You have successfully registered");
  }



    render() {
        return (
            <div>
                <h1>Register</h1>
        <form onSubmit ={this.handleSubmit}>
           {this.renderInput('username', 'Username')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderInput('firstname', 'First Name')}
            {this.renderInput('lastname', 'Last Name')}
            
            {this.renderButton("Register")}

        </form>

            </div>
        );
    }
}

export default RegisterForm;
