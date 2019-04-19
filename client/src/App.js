import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ListSource from './components/listSource.component';
import ViewSource from './components/viewSource.component';
import CreateSource from './components/createSource.component';
import EditSource from './components/editSource.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to={'/'} >List Sources</Link>
          &nbsp; &nbsp;
          <Link to={'/create'} >Create Source</Link>
          <Switch>
              <Route exact path='/' component={ ListSource } />
              <Route path='/view/:id' component={ ViewSource } />
              <Route path='/create' component={ CreateSource } />
              <Route path='/edit/:id' component={ EditSource } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;