import template from "./accounts-component.html";
import accountItemTemplate from "./account-item.html";
import { ButtonMoreComponent } from "../../button-more/button-more";
import { AddAccountDialogComponent } from "../add-account-dialog/add-account-dialog";
import { AccountService } from "../../../services/account-service";

export class AccountsComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
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

  handleAddAccountConfirmed(account) {
    AccountService.add(account);
    this.addAccountToHead(account);
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
    this.props.onAddAccountClicked();
  }

  handleEditClick() {
    console.log("handleEditClick");
  }

  handleDeleteClick() {
    console.log("handleDeleteClick");
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMoreBtns();
    this.addEventListeners();
    this.getCurrentAccounts();
  }
}
