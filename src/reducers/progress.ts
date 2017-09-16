import { GET_PROGRESS_SUCCESS } from '../actions/progress';

export default (state: Question[] = null, action: any = {}) => {
  switch (action.type) {
    case GET_PROGRESS_SUCCESS:
      console.log("SUCCESS@");
      return action.payload;
    default:
      return state;
  }
};
