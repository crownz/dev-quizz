export const GET_PROGRESS_STARTED = 'GET_PROGRESS_STARTED';
export const GET_PROGRESS_SUCCESS = 'GET_PROGRESS_SUCCESS';
export const GET_PROGRESS_FAILURE = 'GET_PROGRESS_FAILURE';

export const UPDATE_PROGRESS_SUCCESS = 'UPDATE_PROGRESS_SUCCESS';
export const UPDATE_PROGRESS_FAILURE = 'UPDATE_PROGRESS_FAILURE';

export const RESET_PROGRESS = 'RESET_PROGRESS';

export const VALIDATE_STARTED = 'VALIDATE_STARTED';
export const VALIDATE_SUCCESS = 'VALIDATE_SUCCESS';
export const VALIDATE_FAILURE = 'VALIDATE_FAILURE';

export const getProgressStarted = () => ({ type: GET_PROGRESS_STARTED });
export const getProgressSuccess = payload => ({ type: GET_PROGRESS_SUCCESS, payload });
export const getProgressFailure = () => ({ type: GET_PROGRESS_FAILURE });

export const updateProgressSuccess = payload => ({ type: UPDATE_PROGRESS_SUCCESS, payload });
export const updateProgressFailure = () => ({ type: UPDATE_PROGRESS_FAILURE });

export const resetProgress = () => ({ type: RESET_PROGRESS });

export const validateStarted = () => ({ type: VALIDATE_STARTED });
export const validateSuccess = () => ({ type: VALIDATE_SUCCESS });
export const validateFailure = () => ({ type: VALIDATE_FAILURE });

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

export const cleanProgress = () => {
  return dispatch => {
    dispatch(resetProgress());
  };
};

export const validateHTML = html => {
  return dispatch => {
    dispatch(validateStarted());
    return fetch(`/validate`, {
      method: 'PUT',
      credentials: 'same-origin',
      body: JSON.stringify({html}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      dispatch(validateSuccess());
      return response.json();
    })
    .catch(() => dispatch(validateFailure()));
  };
};
