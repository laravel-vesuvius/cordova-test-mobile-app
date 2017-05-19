<template>
  <f7-page>
    <!-- Material Theme Navbar -->
    <f7-navbar>
      <f7-nav-center sliding>Map</f7-nav-center>
      <f7-nav-right>
        <f7-link icon="icon-bars" open-panel="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <div class="map"></div>
  </f7-page>
</template>

<script>
  import PinManager from './services/pin-manager'

  const bluePinImage = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
  const redPinImage = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

  let map, pinManager = new PinManager();

  export default {
    mounted: function () {
      let div = this.$el.getElementsByClassName("map")[0];

      // Initialize the map view
      map = new google.maps.Map(div, {zoom: 15});

      map.addListener('click', (event) => {
        pinManager.createPin({lat: event.latLng.lat(), lng: event.latLng.lng()});
        this.addPin(event.latLng);
      });

      // Move to current location
      pinManager.getCurrentPosition().then((pin) => {
        map.setCenter(pin);
        this.addPin(pin, true);
      }).catch((error) => {
        alert(error.message);
      });

      // Render pins
      pinManager.getPins().then((response) => {
        response.data.pins.forEach((point) => this.addPin(point));
      }).catch(() => {
        alert('Failed to load pins');
      });
    },
    methods: {
      addPin(point, isCurrent = false) {
        let marker = new google.maps.Marker({
          position: point,
          map: map,
          title: 'Me',
          animation: google.maps.Animation.BOUNCE,
          icon: isCurrent ? bluePinImage : redPinImage
        });

        if (!isCurrent) {
          marker.addListener('click', this.notCurrentPinClickHandler.bind(this));
        }

        return marker;
      },
      notCurrentPinClickHandler(e) {
        pinManager.computeDistanceToCurrent(e.latLng).then((distance) => {
          alert(`Distance to current: ${distance} m.`);
        }).catch((error) => {
          alert(error.message);
        });
      }
    }
  }
</script>

<style>
  .map {
    width: 100%;
    height: 100%;
  }
</style>
