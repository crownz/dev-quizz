import { GET_PROGRESS_STARTED, GET_PROGRESS_SUCCESS } from '../actions/progress';

export default (state: boolean = false, action: any = {}) => {
  switch (action.type) {
    case GET_PROGRESS_STARTED:
      console.log("LOADING STARTED!");
      return true;
    case GET_PROGRESS_SUCCESS:
      console.log("LOADING DONE!");
      return false;
    default:
      return state;
  }
};
