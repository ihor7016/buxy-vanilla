import template from "./button-more.html";
import { MDCMenu } from "@material/menu";

export class ButtonMoreComponent {
  constructor(mountPoint, position) {
    this.mountPoint = mountPoint;
    this.position = position;
  }

  querySelectors() {
    this.menuRoot = this.mountPoint.querySelector(".menu");
    this.buttonMore = this.mountPoint.querySelector(".button-more__more");
  }

  initPosition() {
    switch (this.position) {
      case "left":
        this.menuRoot.classList.add("button-more__popup-left");
        break;
      case "right":
        this.menuRoot.classList.add("button-more__popup-right");
        break;
    }
  }

  initMDC() {
    this.menu = new MDCMenu(this.menuRoot);
  }

  addEventListener() {
    this.buttonMore.addEventListener("click", this.handleBtnClick.bind(this));
  }

  handleBtnClick(event) {
    this.toggle();
  }

  toggle() {
    this.menu.open = !this.menu.open;
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMDC();
    this.addEventListener();
    this.initPosition();
  }
}
