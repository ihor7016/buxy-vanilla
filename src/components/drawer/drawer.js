import template from "./drawer.html";
import {
  MDCPersistentDrawer,
  MDCPersistentDrawerFoundation,
  util
} from "@material/drawer";

export class DrawerComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.drawer = new MDCPersistentDrawer(
      document.querySelector(".mdc-drawer--persistent")
    );
    this.menu = document.querySelector(".menu");
  }

  addEventListeners() {
    this.menu.addEventListener(
      "click",
      () => (this.drawer.open = !this.drawer.open)
    );
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.addEventListeners();
  }
}
