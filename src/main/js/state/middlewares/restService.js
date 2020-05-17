import { fetch } from '../utils';
import history from '../history';

// eslint-disable-next-line no-undef
const baseUrl = `http://${window.location.hostname}${window.location.port !== 0 ? ":" + window.location.port : ""}/api`;

const restService = store => next => (action) => {
  const result = next(action);
  if (!action.meta || !action.meta.async) {
    return result;
  }

  const {
    path, method = 'GET', body, token
  } = action.meta;

  if (!path) {
    throw new Error(`'path' not specified for async action ${action.type}`);
  }

  const url = `${baseUrl}${path}`;

  return fetch(url, method, body, token)
    .then(
      res => {
        handleResponse(res, action, next);
      },
      err => handleErrors(err, action, next)
    );
};

export default restService;

function handleErrors(err, action, next) {
  next({
    type: `${action.type}_FAILED`,
    payload: err.toString(),
    meta: action.meta
  });
  console.log(err);
}

function handleResponse(res, action, next) {
  if (typeof res.error !== 'undefined') {
    handleErrors(res.error, action, next);
    return;
  }
  if (action.redirect) {
    history.push(action.redirect);
  }
  next({
    type: `${action.type}_COMPLETED`,
    payload: res,
    meta: action.meta
  });
}
