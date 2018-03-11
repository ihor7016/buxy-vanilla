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
    this.menuButton = document.querySelector("#menu-button");
    this.popupMountPoint = document.querySelector(".popup_mount_point");
  }

  mountChildren() {
    this.toolBarComponent = new ToolbarComponent(this.toolbarMountPoint, {
      onMenuClicked: this.handleToolbarMenuClick.bind(this)
    });
    this.toolBarComponent.mount();
    this.drawerComponent = new DrawerComponent(this.drawerMountPoint);
    this.drawerComponent.mount();
    this.popup = new PopupComponent(this.popupMountPoint);
    this.popup.mount();
    this.menuButton.addEventListener("click", () => {
      this.popup.toggle();
    });
  }

  handleToolbarMenuClick() {
    this.drawerComponent.toggleDrawer();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
  }
}
