/**
 * @param  {string}target @return Array of elements
 */
class Dom {
  constructor(el) {
    this.getDom(el);
    if (!(this instanceof Dom)) {
      return new Dom(el);
    }
  }
  getDom(el) {
    this._el = document.querySelector(el);
    return this;
  }
  insertDom() {}
  updateDom() {}
  renderDom() {}
}

export default Dom;