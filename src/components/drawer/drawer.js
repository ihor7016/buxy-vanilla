import template from "./drawer.html";

export class DrawerComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = template({ name: "Ihor" });
  }
}
