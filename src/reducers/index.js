import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import searchReducer from './search'

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  searchState: searchReducer
});

export default rootReducer;