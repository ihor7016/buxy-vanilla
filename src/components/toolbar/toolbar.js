import template from "./toolbar.html";

export class ToolbarComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = template();
  }
}
