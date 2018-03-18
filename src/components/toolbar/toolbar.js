import template from "./toolbar.html";

import { AboutComponent } from "../about-dialog/about-dialog";

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
    this.aboutMountPoint = this.mountPoint.querySelector(
      ".toolbar__about-dialog"
    );
  }

  mountChildren() {
    this.aboutDialog = new AboutComponent(this.aboutMountPoint);
    this.aboutDialog.mount();
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
    this.aboutDialog.showDialog();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
    this.addEventListeners();
  }
}
