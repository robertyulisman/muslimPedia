import {combineReducers} from 'redux';
import bookmarkReducer from './bookmarkReducer';
import firestoreReducer from './firestoreReducer';

import locationReducer from './locationReducer';
import sholatReducer from './sholatReducer';

export default combineReducers({
  location: locationReducer,
  sholat: sholatReducer,
  bookmark: bookmarkReducer,
  firestore: firestoreReducer,
});
