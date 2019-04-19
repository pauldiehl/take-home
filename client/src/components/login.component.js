import React, { Component } from "react";
import { Auth } from "aws-amplify";

export default class Login extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        email: "",
        password: ""
      };
    }
  
    handleSubmit = async e => {
        e.preventDefault();

        try {
            await Auth.signIn(this.state.email, this.state.password);
            this.props.userHasAuthenticated(true);
          } catch (e) {
            alert(e.message);
          }

      }

    handleChange = e => {
      this.setState({
        [e.target.id]: e.target.value
      });
    }

    validateFields() {
        return this.state.email.length && this.state.password.length;
      }
  
    render() {
      return (
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <p>Email</p>
            <input type="email" value={this.state.email} onChange={this.handleChange} id="email" />
            <p>Password</p>
            <input type="password" value={this.state.password} onChange={this.handleChange} id="password" />
            <br />
            <br />
            <input type="submit" value="LOGIN" disabled={!this.validateFields()}/>
          </form>
        </div>
      );
    }
  }