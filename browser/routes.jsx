import React from 'react';  
import { Route, IndexRoute } from 'react-router';  
import App from './AppContainer';  
import HomePage from './components/HomePage';  
import Room from './components/Room'

export default (  
  <Route path="/" component={App} />
);