import dom, { getElemByClass } from "./lib/dom";
class Startcss {
  constructor(options = {}) {
    this.opt = options;
  }

  init() {}
}

let app = getElemByClass("test");
console.log(app);
