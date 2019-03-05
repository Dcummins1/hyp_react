import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import searchReducer from './search';
import mapsReducer from './maps';
import eventFormReducer from './eventForm'

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  searchState: searchReducer,
  mapsState: mapsReducer,
  eventFormState: eventFormReducer
});

export default rootReducer;