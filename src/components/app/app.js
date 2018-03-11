import template from "./app.html";
import { DrawerComponent } from "../drawer/drawer";
import { ToolbarComponent } from "../toolbar/toolbar";
import { PopupComponent } from "../popup/popup";

export class AppComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.toolbarMountPoint = this.mountPoint.querySelector(
      ".app__container-toolbar-point"
    );
    this.drawerMountPoint = this.mountPoint.querySelector(".app__drawer-point");
    this.popupMountPoint = document.querySelector(".popup_mount_point");
  }

  mountChildren() {
    this.toolBarComponent = new ToolbarComponent(this.toolbarMountPoint, {
      onMenuClicked: this.handleToolbarMenuClick.bind(this)
    });
    this.toolBarComponent.mount();
    this.drawerComponent = new DrawerComponent(this.drawerMountPoint, {
      onMenuPopupClicked: this.handlePopupMenuClick.bind(this)
    });
    this.drawerComponent.mount();
    this.popup = new PopupComponent(this.popupMountPoint);
    this.popup.mount();
  }

  handleToolbarMenuClick() {
    this.drawerComponent.toggleDrawer();
  }
  handlePopupMenuClick(target) {
    this.popup.toggle();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
  }
}
