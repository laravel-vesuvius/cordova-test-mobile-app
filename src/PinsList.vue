<template>
  <f7-page>
    <!-- Material Theme Navbar -->
    <f7-navbar>
      <f7-nav-center sliding>List</f7-nav-center>
      <f7-nav-right>
        <f7-link icon="icon-bars" open-panel="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <div v-for="city in cities">
      <div class="content-block-title">{{city.name}}</div>

      <PinItem v-for="pin in city.pins" :pin="pin"/>
    </div>
  </f7-page>
</template>

<script>
  import PinManager from './services/pin-manager'
  import PinItem from './PinItem.vue'

  let pinManager = new PinManager();

  export default {
    created: function () {
      pinManager.getPins().then((response) => {
        this.pins = response.data.pins;
      }).catch(() => {
        alert('Failed to load pins');
      })
    },
    data: function () {
      return {
        pins: []
      }
    },
    components: {
      PinItem: PinItem
    },
    computed: {
      cities: function () {
        let cities = {};

        // Group by cities
        this.pins.forEach(function (pin) {
          if (!cities[pin.city]) {
            cities[pin.city] = {name: pin.city, pins: []};
          }

          cities[pin.city].pins.push(pin);
        });
        cities = Object.keys(cities).map(function (key) {
          return cities[key];
        });

        cities.sort(function (a, b) {

          return (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0);
        });

        return cities;
      }
    }
  }
</script>
