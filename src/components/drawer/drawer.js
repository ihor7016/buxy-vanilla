import template from "./drawer.html";
import { MDCPersistentDrawer } from "@material/drawer";

export class DrawerComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.drawerRoot = this.mountPoint.querySelector(".mdc-drawer--persistent");
    this.drawer = new MDCPersistentDrawer(this.drawerRoot);
    this.menu = this.mountPoint.querySelector(".toolbar__menu");
    this.moreButtons = this.mountPoint.querySelectorAll(".button-more");
  }

  addEventListeners() {
    for (let i = 0; i < this.moreButtons.length; i++) {
      this.moreButtons[i].addEventListener(
        "click",
        this.onMenuClicked.bind(this)
      );
    }
  }

  onMenuClicked(e) {
    this.props.onMenuPopupClicked(e.target);
  }

  toggleDrawer() {
    this.drawer.open = !this.drawer.open;
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.addEventListeners();
  }
}
