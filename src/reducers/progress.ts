import { GET_PROGRESS_SUCCESS, UPDATE_PROGRESS_SUCCESS, RESET_PROGRESS } from '../actions/progress';

export default (state = null, action: any = {}) => {
  switch (action.type) {
    case GET_PROGRESS_SUCCESS:
      return action.payload;
    case UPDATE_PROGRESS_SUCCESS:
      return updatedState(state, action.payload);
    case RESET_PROGRESS:
      return null;
    default:
      return state;
  }
};

const updatedState = (state, question) => {
  const newState = state.slice();
  const index = state.findIndex(q => q.id === question.id);
  newState.splice(index, 1, question);
  return newState;
};
