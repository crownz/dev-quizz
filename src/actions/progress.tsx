export const GET_PROGRESS_STARTED = 'GET_PROGRESS_STARTED';
export const GET_PROGRESS_SUCCESS = 'GET_PROGRESS_SUCCESS';
export const GET_PROGRESS_FAILURE = 'GET_PROGRESS_FAILURE';

export const getProgressStarted = () => ({ type: GET_PROGRESS_STARTED });
export const getProgressSuccess = payload => ({ type: GET_PROGRESS_SUCCESS, payload });
export const getProgressFailure = () => ({ type: GET_PROGRESS_FAILURE });


export const getProgress = (name: string) => {
  return dispatch => {
    dispatch(getProgressStarted());
    fetch(`/progress/${name}`, {
      method: 'GET',
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(data => dispatch(getProgressSuccess(data)))
      .catch(() => dispatch(getProgressFailure()));
  };
};
