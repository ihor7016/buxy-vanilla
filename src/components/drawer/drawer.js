import template from "./drawer.html";
import { MDCPersistentDrawer } from "@material/drawer";

export class DrawerComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.drawerRoot = this.mountPoint.querySelector(".mdc-drawer--persistent");
    this.drawer = new MDCPersistentDrawer(this.drawerRoot);
    this.menu = this.mountPoint.querySelector(".toolbar__menu");
  }

  toggleDrawer() {
    this.drawer.open = !this.drawer.open;
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
  }
}
