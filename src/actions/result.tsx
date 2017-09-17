export const CALCULATE_RESULT_STARTED = 'CALCULATE_RESULT_STARTED';
export const CALCULATE_RESULT_SUCCESS = 'CALCULATE_RESULT_SUCCESS';
export const CALCULATE_RESULT_FAILURE = 'CALCULATE_RESULT_FAILURE';

export const calculateResultStarted = () => ({ type: CALCULATE_RESULT_STARTED });
export const calculateResultSuccess = payload => ({ type: CALCULATE_RESULT_SUCCESS, payload });
export const calculateResultFailure = () => ({ type: CALCULATE_RESULT_FAILURE });

export const calculateResult = (name: string) => {
  return dispatch => {
    dispatch(calculateResultStarted());
    fetch(`/api/result/${name}`, {
      method: 'GET',
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(data => dispatch(calculateResultSuccess(data)))
      .catch(() => dispatch(calculateResultFailure()));
  };
};
