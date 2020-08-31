import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { Provider } from 'react-redux';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from './config/xequeFbConfig'
import { BrowserRouter } from 'react-router-dom';

const store = createStore(rootReducer);

const rrfConfig = {
  userProfile: 'admin',
  useFirestoreForProfile: true,
}

const rrfProps = {
  firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
 }

ReactDOM.render(
    <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();