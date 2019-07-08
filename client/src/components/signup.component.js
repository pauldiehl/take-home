import React, { Component } from "react";
import { Auth } from "aws-amplify";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({
        newUser
      });
    } catch (e) {
      alert(e.message);
    }

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);

      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
          <p>Confirmation Code:</p>
          <input type="input" value={this.state.confirmationCode} onChange={this.handleChange}/>
          <p>Please check your email for the code.</p>
          <br />
          {!this.state.isLoading ? <input disabled={!this.validateConfirmationForm()} type="submit" value="Verify" /> : <p>Verifying...<p></p></p>}
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Email:</p>
        <input type="email" id="email" value={this.state.email} onChange={this.handleChange}/>
        <p>Password:</p>
        <input type="password" id="password" value={this.state.password} onChange={this.handleChange}/>
        <p>Confirm Password:</p>
        <input type="password" id="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange}/>
        <br />
        <br />
        {!this.state.isLoading ? <input disabled={!this.validateForm()} type="submit" value="Verify" /> : <p>Verifying...</p>}
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
