import template from "./accounts.html";
import accountItemTemplate from "./account-item.html";
import { ButtonMoreComponent } from "../../button-more/button-more";
import { AccountListService } from "../../../services/account-service";

export class AccountsComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.accountsRoot = this.mountPoint.querySelector(".accounts");
    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(
      ".accounts__more-button"
    );
    this.addAccountButton = this.mountPoint.querySelector(
      ".accounts__add-account-dialog-activation"
    );
    this.accountsList = this.mountPoint.querySelector(".accounts__list-items");
  }

  handleAddAccountConfirmed(account) {
    AccountListService.add(account);
    this.addAccountToHead(account);
  }

  initMoreBtns() {
    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(
      ".accounts__more-button"
    );
    Array.from(this.moreBtnMountPoints).forEach(point => {
      new ButtonMoreComponent(point, {
        position: "right",
        onDeleteClick: this.handleDeleteClick.bind(this),
        onEditClick: this.handleEditClick.bind(this)
      }).mount();
    });
  }

  initAccounts(accounts) {
    accounts.forEach(item => {
      this.addAccount(item);
    });
  }

  initData() {
    this.accountsList.innerHTML = "";
    AccountListService.get().then(accounts => {
      if (!accounts) {
        accounts = [];
        AccountListService.set(accounts);
      }
      this.initAccounts(accounts);
    });
  }

  updateAccountData(transaction) {
    AccountListService.update(
      transaction.account,
      parseInt(transaction.type + transaction.amount)
    ).then(() => {
      this.initData();
    });
  }

  addEventListeners() {
    this.addAccountButton.addEventListener(
      "click",
      this.handleAddAccountClick.bind(this)
    );
  }

  addAccountToHead(account) {
    this.accountsList.innerHTML =
      accountItemTemplate({ account: account }) + this.accountsList.innerHTML;
    this.initMoreBtns();
  }

  addAccount(account) {
    this.accountsList.innerHTML += accountItemTemplate({ account: account });
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
    this.initData();
  }
}