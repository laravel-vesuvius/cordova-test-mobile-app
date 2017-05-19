import axios from 'axios'

export default class {
  static setTokenCheck() {
    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      if (response.headers['auth-token']) {
        axios.defaults.headers.common['auth-token'] = response.headers['auth-token'];
      }

      return response;
    });
  }
}
