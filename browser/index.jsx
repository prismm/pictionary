import React from 'react';  
import { render } from 'react-dom';    
import { Provider } from 'react-redux';  
import store from './store';
import AppContainer from './AppContainer.jsx'

render(  
  <Provider store={store}>
      <AppContainer />
  </Provider>,
 document.getElementById('main')
);
