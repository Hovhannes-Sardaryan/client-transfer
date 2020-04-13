import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCMN2uZUj8qiswHN22AorDJvhLHvGwhXC8",
  authDomain: "transfer-project-319a8.firebaseapp.com",
  databaseURL: "https://transfer-project-319a8.firebaseio.com",
  projectId: "transfer-project-319a8",
  storageBucket: "transfer-project-319a8.appspot.com",
  messagingSenderId: "586459832956",
  appId: "1:586459832956:web:98c403bd456e3d10281ff9"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'Clients',
};
// Init firebase instance
firebase.initializeApp(firebaseConfig);

// Init firestore
export const firestore = firebase.firestore()

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

// Create initial state
const initialState = {};

// Create store
export const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);


