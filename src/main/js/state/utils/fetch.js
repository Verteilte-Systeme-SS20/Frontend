import axios from 'axios';

export default (url, method, body, token) => {
  const options = {
    method,
    url,
    headers: requestHeaders(token),
    data: method !== 'GET' ? JSON.stringify(body) : null
  };

  console.log('Fetching', options);

  return axios(options)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        console.log('Got data', res.data);
        return res.data;
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return { status: res.status, response: {} };
    });
};
function requestHeaders(token) {
  if (token) {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
  }
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
}
