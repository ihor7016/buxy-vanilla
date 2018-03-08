import template from "./app.html";

export class AppComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = template({ name: "Ihor" });
  }
}
