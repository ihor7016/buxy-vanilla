import template from "./drawer.html";
import { MDCPersistentDrawer } from "@material/drawer";
import { ButtonmoreComponent } from "../buttonMore/buttonmore";

export class DrawerComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.drawerRoot = this.mountPoint.querySelector(".mdc-drawer--persistent");
    this.menu = this.mountPoint.querySelector(".toolbar__menu");
    this.moreButtons = this.mountPoint.querySelectorAll(".button-more");

    this.addAccountButton = this.mountPoint.querySelector(
      ".drawer__add-account-dialog-activation"
    );
    this.addTagButton = this.mountPoint.querySelector(
      ".drawer__add-tag-dialog-activation"
    );

    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(".more_btn");
  }

  initMDC() {
    this.drawer = new MDCPersistentDrawer(this.drawerRoot);
  }

  initMoreBtns() {
    for (let i = 0; i < this.moreBtnMountPoints.length; i++) {
      new ButtonmoreComponent(this.moreBtnMountPoints[i], {
        onMoreBtnClicked: this.onMoreBtnClick.bind(this)
      }).mount();
    }
  }

  addEventListeners() {
    this.addAccountButton.addEventListener(
      "click",
      this.handleAddAccountClick.bind(this)
    );
    this.addTagButton.addEventListener(
      "click",
      this.handleAddTagOnclick.bind(this)
    );
  }

  onMoreBtnClick(e) {
    let all = this.mountPoint.querySelectorAll(".drawer__list-item");
    for (let i = 0; i < all.length; i++) {
      all[i].classList.remove("drawer__buttonmore-zorder");
    }
    e.target
      .closest(".drawer__list-item")
      .classList.toggle("drawer__buttonmore-zorder");
  }

  handleAddAccountClick() {
    this.props.onAddAccountClick();
  }

  handleAddTagOnclick() {
    this.props.onAddTagClick();
  }

  toggleDrawer() {
    this.drawer.open = !this.drawer.open;
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMDC();
    this.initMoreBtns();
    this.addEventListeners();
  }
}
