export default class Section {
  constructor({items, renderer}, containerSelector){
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

  }

  rendererItems = () => {
    this._initialArray.forEach((item) => {
    this._renderer(item);
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }

  addIconRemove() {
    this._iconPlace = this._container.querySelector('.gallery__crash-button');
  }
}
