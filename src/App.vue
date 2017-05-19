<template>
  <div id="app">
    <f7-panel right cover layout="dark">
      <f7-view id="right-panel-view" navbar-through :dynamic-navbar="true">
        <f7-pages>
          <f7-page>
            <f7-list>
              <f7-list-item link="/" title="Map" link-view="#main-view" data-ignore-cache="true"
                            link-close-panel></f7-list-item>
              <f7-list-item link="/list/" title="List" link-view="#main-view" data-ignore-cache="true"
                            link-close-panel></f7-list-item>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>

    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main url="/">
        <f7-pages></f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<script>
  export default {}
</script>
