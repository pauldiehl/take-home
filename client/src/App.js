import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ListSource from './components/listSource.component';
import ViewSource from './components/viewSource.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to={'/'} >Sources</Link>
          <Switch>
              <Route exact path='/' component={ ListSource } />
              <Route path='/view/:id' component={ ViewSource } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
