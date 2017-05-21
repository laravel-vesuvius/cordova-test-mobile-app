import Config from '../config'
import GeocoderResult from './geocoder-result'
import axios from 'axios'
import qs from 'qs'

let currentPosition;

export default class {

  getPins() {
    return axios.get(Config.api_entry + 'pins');
  }

  computeDistanceToCurrent(latLng) {
    return new Promise((resolve, reject) => {
      this.getCurrentPosition().then((currentPin) => {
        let currentLatLng = new google.maps.LatLng(currentPin.lat, currentPin.lng);

        if (!(latLng instanceof google.maps.LatLng)) {
          latLng = new google.maps.LatLng(latLng.lat, latLng.lng);
        }

        resolve(google.maps.geometry.spherical.computeDistanceBetween(latLng, currentLatLng));
      }).catch((error) => {
        reject(error);
      })
    });
  }

  getCurrentPosition() {
    return new Promise(function (resolve, reject) {
      if (currentPosition) {
        resolve(currentPosition);
      }

      navigator.geolocation.getCurrentPosition((position) => {
        resolve(currentPosition = {lat: position.coords.latitude, lng: position.coords.longitude});
      }, (error) => {
        reject(error);
      }, {enableHighAccuracy: true})
    });
  }

  getPinExtra(pin) {
    let latlng = new google.maps.LatLng(pin.lat, pin.lng);

    return new Promise((resolve, reject) => {
      let geocoder = new google.maps.Geocoder();

      geocoder.geocode({'latLng': latlng}, function (rawResults, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          let result = new GeocoderResult(rawResults);

          resolve({
            city: result.getComponentByType('administrative_area_level_1').long_name,
            country: result.getComponentByType('country').long_name,
            formatted_address: rawResults[0] ? rawResults[0].formatted_address : null
          });

          return;
        }
        reject("Geocoder failed due to: " + status);
      });
    });
  }

  createPin(data) {
    return this.getPinExtra(data).then((extraData) => {
      let pin = Object.assign({}, data, {
        country: extraData.country,
        city: extraData.city,
        formatted_address: extraData.formatted_address
      });

      return axios.post(Config.api_entry + 'pins', qs.stringify({pin}));
    });
  }

  static setTokenCheck() {
    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      if (response.headers.auth_token) {
        axios.defaults.headers.common['auth_token'] = response.headers.auth_token;
      }

      return response;
    });
  }
}
