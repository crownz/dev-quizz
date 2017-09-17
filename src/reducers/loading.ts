import { GET_PROGRESS_STARTED, GET_PROGRESS_SUCCESS, VALIDATE_STARTED, VALIDATE_SUCCESS } from '../actions/progress';
import { CALCULATE_RESULT_STARTED, CALCULATE_RESULT_SUCCESS } from '../actions/result';

export default (state: boolean = false, action: any = {}) => {
  switch (action.type) {
    case GET_PROGRESS_STARTED:
    case VALIDATE_STARTED:
    case CALCULATE_RESULT_STARTED:
      return true;
    case GET_PROGRESS_SUCCESS:
    case VALIDATE_SUCCESS:
    case CALCULATE_RESULT_SUCCESS:
      return false;
    default:
      return state;
  }
};
