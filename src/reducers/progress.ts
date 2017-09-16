import { GET_PROGRESS_SUCCESS, UPDATE_PROGRESS_SUCCESS } from '../actions/progress';

export default (state = null, action: any = {}) => {
  switch (action.type) {
    case GET_PROGRESS_SUCCESS:
      console.log("SUCCESS@");
      return action.payload;
    case UPDATE_PROGRESS_SUCCESS:
      console.log("UPDATED! old state: ", state);
      const newState = state.slice();
      return newState.splice(state.findIndex(q => q.id === action.payload.id), 1, action.payload);
    default:
      return state;
  }
};
