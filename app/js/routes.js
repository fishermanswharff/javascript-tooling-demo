import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import TimeManagementApp from './components/timeManagementApp.js';
import Dashboard from './components/dashboard.js';

const routes = (
  <Router history={ browserHistory }>
    <Route path='/' component={ TimeManagementApp }>
      <IndexRoute component={ Dashboard } />
    </Route>
  </Router>
);

export default routes;
