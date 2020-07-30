import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {

    state = {
        account:{username: '', password: ''},
        error: {}
    }

    validate = ()=>{
        return {username: "Username is required"}
    }
//username = React.createRef();

    handleSubmit = e =>{
        e.preventDefault();

     const errors = this.validate()
         this.setState({errors})
         if(errors) return
         
    const username = this.username.current.value;
     }
    

    handleChange = ({currentTarget: input})=>{
        const account = {...this.state};
        account[input.name] = input.value;
        this.setState({account})
    }

    render() {
        const {account} = this.state;
        return (
          <div>
            <h5>Login form</h5>
            <form onSubmit={this.handleSubmit}>
              <Input
                name="username"
                value={account.username}
                onChange={this.handleChange}
                label="Username"
               
              />

              <Input
                name="password"
                value={account.password}
                onChange={this.handleChange}
                label="Password"
              />

              <button className="btn btn-primary">Login</button>
            </form>
          </div>
        );
    }
}

export default LoginForm;
