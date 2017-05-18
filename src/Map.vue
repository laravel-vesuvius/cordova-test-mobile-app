<template>
  <div id="map"></div>
</template>

<script>
  import Api from './services/api'

  let map;

  export default {
    ready: function () {
      let div = document.getElementById("map");

      // Initialize the map view
      map = plugin.google.maps.Map.getMap(div);

      plugin.google.maps.event.addListener(map, 'click', (event) => {
        Api.createPin(event.latLng);
        this.addPin(event.latLng);
      });

      Api.getPins().then((response) => {
        response.pins.forEach((point) => this.addPin(point));
      });
    },
    addPin(point) {
      map.addMarker({
        position: {lat: point.lat, lng: point.lng},
        title: "Me",
        animation: plugin.google.maps.Animation.BOUNCE
      });
    }
  }
</script>
