export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._dataArray = data;
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderedItems() {
    this._dataArray.forEach(item => {
      this.renderer(item);
    });
  }

  addInitalItems(element) {
    this._container.append(element);
  }

  addItems(element) {
    this._container.prepend(element);
  }
}