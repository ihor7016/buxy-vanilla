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

  mount() {
    this.mountPoint.innerHTML = template({ name: "Ihor" });
    let drawer = new MDCPersistentDrawer(
      document.querySelector(".mdc-drawer--persistent")
    );
    document
      .querySelector(".menu")
      .addEventListener("click", () => (drawer.open = !drawer.open));
  }
}
