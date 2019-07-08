import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Auth } from "aws-amplify";

import Routes from "./Routes";


class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    this.setState({ isAuthenticating: false });
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async e => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    const logoutStyle = {cursor: 'pointer', color: 'blue', textDecoration: 'underline'}

    return (
      !this.state.isAuthenticating &&
      <div>
        <Link to={'/'} >Home</Link>&nbsp;&nbsp;
          {this.state.isAuthenticated
          ? <Fragment>
              <Link to="/sources">Source List</Link>&nbsp;&nbsp;
              <span style={ logoutStyle } onClick={this.handleLogout}>Logout</span>
            </Fragment>
          : <Fragment>
              <Link to="/signup">Signup</Link>&nbsp;&nbsp;
              <Link to="/login">Login</Link>
            </Fragment>
          }
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
