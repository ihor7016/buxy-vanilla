import template from "./app.html";

import { DrawerComponent } from "../drawer/drawer";
import { ToolbarComponent } from "../toolbar/toolbar";
import { TransactionsComponent } from "../transactions/transactions";
import { AddAccountComponent } from "../add-account-dialog/add-account-dialog";
import { AddTagComponent } from "../tags/add-tag-dialog/add-tag-dialog";
import { AboutComponent } from "../about-dialog/about-dialog";
import { PieChartComponent } from "../pie-chart/pie-chart";
import { BarChartComponent } from "../bar-chart/bar-chart";
import { TableTransactionsComponent } from "../table-transactions/table-transactions";
import { StorageService } from "../../services/storage";
import { Tag } from "../../model/tag";
import { TagsComponent } from "../tags/tags-component/tags-component";

export class AppComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.toolbarMountPoint = this.mountPoint.querySelector(
      ".app__container-toolbar-point"
    );
    this.drawerMountPoint = this.mountPoint.querySelector(".app__drawer-point");
    this.transactionsMountPoint = this.mountPoint.querySelector(
      ".app__container-content"
    );
    this.addAccountMountPoint = this.mountPoint.querySelector(
      ".app__add-account-dialog"
    );
    this.addTagMountPoint = this.mountPoint.querySelector(
      ".app__add-tag-dialog"
    );
    this.aboutMountPoint = this.mountPoint.querySelector(".app__about-dialog");
  }

  mountChildren() {
    this.toolBarComponent = new ToolbarComponent(this.toolbarMountPoint, {
      onMenuClicked: this.handleToolbarMenuClick.bind(this),
      onAboutClick: this.handleAboutOnclick.bind(this)
    });
    this.toolBarComponent.mount();
    this.initDrawer();
    this.transactionsComponent = new TransactionsComponent(
      this.transactionsMountPoint
    );
    this.transactionsComponent.mount();
    this.addAccountDialog = new AddAccountComponent(this.addAccountMountPoint);
    this.addAccountDialog.mount();
    this.aboutDialog = new AboutComponent(this.aboutMountPoint);
    this.aboutDialog.mount();
  }

  mountTransactionsComponent(tags) {
    this.transactionsComponent = new TransactionsComponent(
      this.transactionsMountPoint,
      { tags: tags }
    );
    this.transactionsComponent.mount();
  }

  getTags() {
    StorageService.get("tags").then(tags => {
      if (!tags) {
        tags = [];
        StorageService.set("tags", tags);
      }
      this.drawerComponent.initTags(tags);
      this.mountTransactionsComponent(tags);
    });
  }

  initDrawer() {
    this.drawerComponent = new DrawerComponent(this.drawerMountPoint, {
      onAddAccountClick: this.handleAddAccountClick.bind(this),
      addTagMountPoint: this.addTagMountPoint
    });
    this.drawerComponent.mount();
  }

  handleToolbarMenuClick() {
    this.drawerComponent.toggleDrawer();
  }

  handleAboutOnclick() {
    this.aboutDialog.showDialog();
  }

  handleAddAccountClick() {
    this.addAccountDialog.showDialog();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
    this.getTags();
  }
}
