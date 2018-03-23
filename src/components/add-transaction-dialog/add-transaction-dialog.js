import template from "./add-transaction-dialog.html";

import { MDCDialog } from "@material/dialog";
import { MDCSelect } from "@material/select";
import { MDCTextField } from "@material/textfield";
import { MDCRadio } from "@material/radio";

import { CustomSelectComponent } from "../custom-select/custom-select";

import { AccountListService } from "../../services/account-service";
import { TagListService } from "../../services/tag-service";

export class AddTransactionComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  getStoredAccounts() {
    AccountListService.get().then(accounts => this.showAccounts(accounts));
  }

  showAccounts(accounts) {
    if (accounts && accounts.length > 0) {
      this.accounts = accounts;
      this.accountSelect.addItems(accounts.map(item => item.name));
    }
  }

  getStoredTags() {
    TagListService.get().then(tags => this.showTags(tags));
  }

  showTags(tags) {
    if (tags && tags.length > 0) {
      this.tagSelect.addItems(tags);
    }
  }

  showDialog() {
    this.getStoredAccounts();
    this.getStoredTags();
    this.date.value = new Date().toISOString().slice(0, 10);
    this.dialog.show();
  }

  querySelectors() {
    this.addTransactionDialog = this.mountPoint.querySelector(
      ".add-transaction-dialog"
    );
    this.accountSelectMountPoint = this.mountPoint.querySelector(
      ".add-transaction-dialog__account-point"
    );
    this.tagSelectMountPoint = this.mountPoint.querySelector(
      ".add-transaction-dialog__tag-point"
    );
    this.descriptionTextField = this.mountPoint.querySelector(
      ".add-transaction-dialog__description"
    );
    this.amountTextField = this.mountPoint.querySelector(
      ".add-transaction-dialog__amount"
    );
    this.dateTextField = this.mountPoint.querySelector(
      ".add-transaction-dialog__date"
    );
    this.incomeRadio = this.mountPoint.querySelector(
      ".add-transaction-dialog__income"
    );
    this.expenceRadio = this.mountPoint.querySelector(
      ".add-transaction-dialog__expence"
    );
    this.submit = this.mountPoint.querySelector(".transaction-dialog__submit");
  }

  mountChildren() {
    this.tagSelect = new CustomSelectComponent(this.tagSelectMountPoint, {
      type: "tag"
    });
    this.tagSelect.mount();
    this.accountSelect = new CustomSelectComponent(
      this.accountSelectMountPoint,
      {
        type: "account"
      }
    );
    this.accountSelect.mount();
  }

  initMDC() {
    this.dialog = new MDCDialog(this.addTransactionDialog);
    this.description = new MDCTextField(this.descriptionTextField);
    this.amount = new MDCTextField(this.amountTextField);
    this.date = new MDCTextField(this.dateTextField);
    this.income = new MDCRadio(this.incomeRadio);
    this.expence = new MDCRadio(this.expenceRadio);
  }

  addEventListeners() {
    this.dialog.listen("MDCDialog:cancel", this.handleCancel.bind(this));
    this.submit.addEventListener("click", this.handleOk.bind(this));
  }

  getType() {
    return this.income.checked ? "+" : "-";
  }

  getAccount() {
    return this.accounts.find(
      item => this.accountSelect.getValue() === item.name
    );
  }

  handleOk(e) {
    if (!this.validate(data)) {
      return;
    }
    const data = {
      type: this.getType(),
      date: this.date.value,
      amount: parseInt(this.amount.value),
      desc: this.description.value,
      tag: this.tagSelect.getValue(),
      account: this.getAccount(),
      id: Date.now().toString()
    };
    this.props.addTransaction(data);
    this.dialog.close();
    this.cleanDialog();
  }

  handleCancel() {
    this.cleanDialog();
  }

  validate() {
    let valid = true;
    if (!this.description.valid) {
      valid = false;
      // this.description.valid = false;
    }
    if (!this.date.valid) {
      valid = false;
      // this.date.valid = false;
    }
    if (!this.amount.valid) {
      valid = false;
      // this.amount.valid = false;
    }
    if (!this.tagSelect.getValue()) {
      valid = false;
    }
    this.tagSelect.toggleValid();
    if (!this.getAccount()) {
      valid = false;
    }
    this.accountSelect.toggleValid();
    return valid;
  }

  cleanDialog() {
    this.expence.checked = true;
    this.date.value = "";
    this.amount.value = "";
    this.description.value = "";
    this.tagSelect.clean();
    this.accountSelect.clean();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
    this.initMDC();
    this.addEventListeners();
  }
}
