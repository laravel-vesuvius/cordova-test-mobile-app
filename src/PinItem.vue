<template>
  <div class="card" @click="cardClickHandler">
    <div class="card-header">
      <div class="pin-title">
        {{pin.formatted_address}}
      </div>
    </div>
    <div class="card-content" v-if="active">
      <div class="card-content-inner">
        <div class="list-block">
          <ul>
            <li class="item-content">
              <div class="item-inner pin-info">
                <b>Address:</b> {{pin.formatted_address}}
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner pin-info">
                <b>Created date:</b> {{pin.created_at}}
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner pin-info">
                <b>Distance to current:</b> {{distanceToCurrent === null ? 'loading...' : distanceToCurrent}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PinManager from './services/pin-manager'

  let pinManager = new PinManager();

  export default {
    props: ['pin'],
    created: function () {
      pinManager.computeDistanceToCurrent(this.pin).then((distance) => {
        this.distanceToCurrent = distance;
      }).catch((error) => {
        alert(error.message);
      });
    },
    data: function () {
      return {
        distanceToCurrent: null,
        active: false
      }
    },
    methods: {
      cardClickHandler() {
        this.active = !this.active;
      }
    }
  }
</script>

<style>
  .pin-title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
  }

  .list-block .item-inner.pin-info {
    display: block;
  }
</style>
