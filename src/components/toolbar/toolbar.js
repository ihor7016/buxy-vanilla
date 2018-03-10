import template from "./toolbar.html";

export class ToolbarComponent {
  constructor(mountPoint, onMenuClickListener) {
    this.mountPoint = mountPoint;
    this.onMenuClickListener = onMenuClickListener;
  }

  querySelectors() {
    this.menu = this.mountPoint.querySelector(".toolbar__menu");
  }

  addEventListeners() {
    this.menu.addEventListener("click", () =>
      this.onMenuClickListener.onMenuClicked()
    );
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.addEventListeners();
  }
}
