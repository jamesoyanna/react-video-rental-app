import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {

    state = {
        account:{username: "", password: ""},
        errors: {}
    }

    validate = ()=>{
        const errors = {};
        const {account} = this.state;
        if(account.username.trim()==='')
        errors.username = "Username is required"

        if (account.password.trim()==='')
             errors.password = "Password is required";
        return Object.keys(errors).length ===0 ? null : errors;
    };

//username = React.createRef();
//const username = this.username.current.value;

    handleSubmit = e =>{
        e.preventDefault();
     const errors = this.validate()
     console.log(errors);
         this.setState({errors: errors || {}})
         if(errors) return;

         console.log("submitted");
     };

     
    

    handleChange = ({currentTarget: input})=>{
        const account = {...this.state};
        account[input.name] = input.value;
        this.setState({account})
    }

    render() {
        const {account, errors} = this.state;
        return (
          <div>
            <h5>Login form</h5>
            <form onSubmit={this.handleSubmit}>
              <Input
                name="username"
                value={account.username}
                onChange={this.handleChange}
                label="Username"
                error={errors.username}
              />

              <Input
                name="password"
                value={account.password}
                onChange={this.handleChange}
                label="Password"
                error={errors.password}
              />

              <button className="btn btn-primary">Login</button>
            </form>
          </div>
        );
    }
}

export default LoginForm;
