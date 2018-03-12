import template from "./popup.html";
import { MDCMenu } from "@material/menu";

export class PopupComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.menuRoot = document.querySelector(".menu");
  }

  init() {
    this.menu = new MDCMenu(this.menuRoot);
  }

  toggle() {
    this.menu.open = !this.menu.open;
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.init();
  }
}
