import { combineReducers } from 'redux';
import loading from './loading';
import progress from './progress';

export default combineReducers({
  loading,
  progress
});
