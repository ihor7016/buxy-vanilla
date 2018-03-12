import template from "./buttonmore.html";
import { MDCMenu } from "@material/menu";

export class ButtonmoreComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.menuRoot = document.querySelector(".menu");
    this.buttonMore = document.querySelector(".button-more__more");
  }

  init() {
    this.menu = new MDCMenu(this.menuRoot);
  }

  addListeners() {
    this.buttonMore.addEventListener("click", e => {
      this.toggle();
    });
  }

  toggle() {
    this.menu.open = !this.menu.open;
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.init();
    this.addListeners();
  }
}
