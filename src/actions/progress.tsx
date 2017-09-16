export const GET_PROGRESS_STARTED = 'GET_PROGRESS_STARTED';
export const GET_PROGRESS_SUCCESS = 'GET_PROGRESS_SUCCESS';
export const GET_PROGRESS_FAILURE = 'GET_PROGRESS_FAILURE';

export const UPDATE_PROGRESS_STARTED = 'UPDATE_PROGRESS_STARTED';
export const UPDATE_PROGRESS_SUCCESS = 'UPDATE_PROGRESS_SUCCESS';
export const UPDATE_PROGRESS_FAILURE = 'UPDATE_PROGRESS_FAILURE';

export const getProgressStarted = () => ({ type: GET_PROGRESS_STARTED });
export const getProgressSuccess = payload => ({ type: GET_PROGRESS_SUCCESS, payload });
export const getProgressFailure = () => ({ type: GET_PROGRESS_FAILURE });

export const updateProgressStarted = () => ({ type: UPDATE_PROGRESS_STARTED });
export const updateProgressSuccess = payload => ({ type: UPDATE_PROGRESS_SUCCESS, payload });
export const updateProgressFailure = () => ({ type: UPDATE_PROGRESS_FAILURE });


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

export const updateProgress = (name: string, id: string, value: any) => {
  return dispatch => {
    dispatch(updateProgressStarted());
    fetch(`/progress`, {
      method: 'PUT',
      credentials: 'same-origin',
      body: JSON.stringify({ name, id, value }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => dispatch(updateProgressSuccess(data)))
      .catch(() => dispatch(updateProgressFailure()));
  };
};
