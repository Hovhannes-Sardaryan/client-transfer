import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import './common/fontAwesome/css/all.min.css'

import App from './App';
import { Provider } from 'react-redux';
import { store } from './Store';



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));




/*
export default compose(
  firestoreConnect([{ collection: 'Clients' }]),
  connect((state) => {
    return { clients: state.firestore.ordered.Clients }
  })
)(Home);    */