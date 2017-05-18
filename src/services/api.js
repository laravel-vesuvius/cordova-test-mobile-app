import Config from '../config'
import axios from 'axios'
import qs from 'qs'

export default class {

  getPins() {
    return axios.get(Config.api_entry + 'pins');
  }

  createPin(pin) {
    return axios.post(Config.api_entry + 'pins', qs.stringify({pin}));
  }

  setTokenCheck() {
    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      if (response.headers.auth_token) {
        axios.defaults.headers.common['auth_token'] = response.headers.auth_token;
      }

      return response;
    });
  }
}
