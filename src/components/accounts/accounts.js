import template from "./accounts.html";
import accountItemTemplate from "./account-item.html";
import { ButtonMoreComponent } from "../button-more/button-more";
import { AccountListService } from "../../services/account-service";
import { AddAccountDialogComponent } from "../add-account-dialog/add-account-dialog";
import { TransactionListService } from "../../services/transaction-service";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog";

export class AccountsComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(
      ".accounts__more-button"
    );
    this.addAccountButton = this.mountPoint.querySelector(
      ".accounts__add-account-dialog-activation"
    );
    this.addAccountMountPoint = this.mountPoint.querySelector(
      ".accounts__add-account-dialog"
    );

    this.confirmDialogMountPoint = this.mountPoint.querySelector(
      ".accounts__delete-confirm-dialog"
    );
    this.accountsList = this.mountPoint.querySelector(".accounts__list-items");
  }

  mountChildren() {
    this.initAddAccountDialogComponent();
    this.initConfirmDialog();
  }

  handleAddAccountConfirmed(account) {
    AccountListService.add(account).then(() => {
      this.addAccountToHead(account);
      this.accounts.push(account);
    });
  }

  handleAddAccountClicked() {
    this.addAccountDialogComponent.showDialog(this.accounts);
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

  initAddAccountDialogComponent() {
    this.addAccountDialogComponent = new AddAccountDialogComponent(
      this.addAccountMountPoint,
      {
        onAddAccountConfirm: this.handleAddAccountConfirmed.bind(this)
      }
    );
    this.addAccountDialogComponent.mount();
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
      this.accounts = accounts;
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

  updateAccountDataDelete(transaction) {
    AccountListService.update(
      transaction.account,
      -parseInt(transaction.type + transaction.amount)
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

  handleEditClick() {
    console.log("handleEditClick");
  }

  handleDeleteClick(event) {
    let moreButton = event.target.closest(".button-more");
    this.listItem = moreButton.closest(".accounts__list-item");
    let accountName = this.listItem.querySelector(".accounts__list-item-name")
      .innerText;
    this.confirmDialog.showDialog("account", accountName);
  }

  initConfirmDialog() {
    this.confirmDialog = new ConfirmDialogComponent(
      this.confirmDialogMountPoint,
      {
        onOkClick: this.handleDeleteConfirm.bind(this)
      }
    );
    this.confirmDialog.mount();
  }

  handleDeleteConfirm() {
    this.delAccount(this.listItem);
  }

  delAccount(listItem) {
    let accountId = listItem.dataset.id;
    TransactionListService.deleteByAccountId(accountId)
      .then(() => {
        let index = Array.from(this.accountsList.children).indexOf(listItem);
        return AccountListService.del(index).then(() => {
          this.accountsList.removeChild(listItem);
        });
      })
      .then(() => {
        this.props.onAccountDelete();
      });
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
    this.initMoreBtns();
    this.addEventListeners();
    this.initData();
  }
}
