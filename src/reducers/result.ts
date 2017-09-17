import { CALCULATE_RESULT_SUCCESS } from '../actions/result';

export default (state: Result = null, action: any = {}) => {
  switch (action.type) {
    case CALCULATE_RESULT_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
