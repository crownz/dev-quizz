import { combineReducers } from 'redux';
import loading from './loading';
import progress from './progress';
import result from './result';

export default combineReducers({
  loading,
  progress,
  result
});
