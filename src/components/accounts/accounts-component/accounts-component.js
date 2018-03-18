import template from "./accounts-component.html";
import accountItemTemplate from "./account-item.html";
import { ButtonMoreComponent } from "../../button-more/button-more";
import { AddAccountComponent } from "../add-account-dialog/add-account-dialog";
import { AccountService } from "../../../services/account-service";

export class AccountsComponent {
  constructor(mountPoint, addAccountMountPoint, props) {
    this.mountPoint = mountPoint;
    this.addAccountMountPoint = addAccountMountPoint;
    this.props = props;
  }

  querySelectors() {
    this.accountsRoot = this.mountPoint.querySelector(".accounts");
    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(
      ".account__more-button"
    );
    this.addAccountButton = this.mountPoint.querySelector(
      ".account__add-account-dialog-activation"
    );
    this.accList = this.mountPoint.querySelector(".account__list");
  }

  initDialogComponent() {
    this.addAccountComponent = new AddAccountComponent(
      this.addAccountMountPoint,
      {
        onAddAccountConfirmed: this.handleAddAccountConfirmed.bind(this)
      }
    );
  }

  handleAddAccountConfirmed(account) {
    AccountService.add(account);
    this.props.onAddAccountConfirmed(account);
  }

  initMoreBtns() {
    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(
      ".account__more-button"
    );
    Array.from(this.moreBtnMountPoints).forEach(point => {
      new ButtonMoreComponent(point, {
        position: "right",
        onDeleteClicked: this.handleDeleteClick.bind(this),
        onEditClicked: this.handleEditClick.bind(this)
      }).mount();
    });
  }

  initAccounts(accounts) {
    accounts.forEach(item => {
      this.addAccount(item);
    });
  }

  getCurrentAccounts() {
    AccountService.get().then(accounts => {
      if (!accounts) {
        accounts = [];
        AccountService.set(accounts);
      }
      this.initAccounts(accounts);
    });
  }

  addEventListeners() {
    this.addAccountButton.addEventListener(
      "click",
      this.handleAddAccountClick.bind(this)
    );
  }

  addAccountToHead(account) {
    let element = document.createElement("div");
    element.innerHTML = accountItemTemplate({ account: account });
    let childNode = this.accList.childNodes[2];
    this.accList.insertBefore(element.firstChild, childNode);
    this.initMoreBtns();
  }

  addAccount(account) {
    let element = document.createElement("div");
    element.innerHTML = accountItemTemplate({ account: account });
    this.accList.appendChild(element.firstChild);
    this.initMoreBtns();
  }

  handleAddAccountClick() {
    this.addAccountComponent.mount();
    this.addAccountComponent.showDialog();
  }

  handleEditClick() {
    console.log("handleEditClick");
  }

  handleDeleteClick(event) {
    let moreButton = event.target.closest(".button-more");
    let listItem = moreButton.closest(".account__list-item");
    let index = Array.from(this.accList.children).indexOf(listItem) - 1;
    AccountService.remove(index);
    this.accList.removeChild(listItem);
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initDialogComponent();
    this.initMoreBtns();
    this.addEventListeners();
    this.getCurrentAccounts();
  }
}
