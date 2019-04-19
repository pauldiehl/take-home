import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Auth } from "aws-amplify";

import AppliedRoute from './components/appliedRoute.component';

import ListSource from './components/listSource.component';
import ViewSource from './components/viewSource.component';
import Login from './components/login.component';


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

  handleLogout = event => {
    this.userHasAuthenticated(false);
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    const logoutStyle = {cursor: 'pointer', color: 'blue', textDecoration: 'underline'}

    return (
      !this.state.isAuthenticating &&
      <Router childProps={childProps}>
        <div>
          <Link to={'/'} >Home</Link>&nbsp;&nbsp;
            {this.state.isAuthenticated
            ? <span style={ logoutStyle } onClick={this.handleLogout}>Logout</span>
            : <Fragment>
                <Link to="/signup">Signup</Link>&nbsp;&nbsp;
                <Link to="/login">Login</Link>
              </Fragment>
            }
          <Switch>
              <AppliedRoute exact path='/' component={ ListSource } props={childProps}/>
              <AppliedRoute path='/view/:id' component={ ViewSource } props={childProps}/>
              <AppliedRoute path='/login' component={ Login } props={childProps}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
