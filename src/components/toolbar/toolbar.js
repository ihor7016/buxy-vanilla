import template from "./toolbar.html";

export class ToolbarComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.menu = this.mountPoint.querySelector(".toolbar__menu");
    this.aboutButton = this.mountPoint.querySelector(
      ".toolbar__about-dialog-activation"
    );
  }

  addEventListeners() {
    this.menu.addEventListener("click", this.handleMenuClick.bind(this));
    this.aboutButton.addEventListener(
      "click",
      this.handleAboutClick.bind(this)
    );
  }

  handleMenuClick() {
    this.props.onMenuClick();
  }

  handleAboutClick() {
    this.props.onAboutClick();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.addEventListeners();
  }
}
