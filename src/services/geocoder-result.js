export default class {
  constructor(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  getComponentByType(type) {
    if (this.data[0]) {
      let components = this.data[0].address_components;

      // search component by type name
      for (let i = 0; i < components.length; i++) {
        if (components[i].types.indexOf(type) !== -1) {
          return components[i];
        }
      }
    }
  }
}
