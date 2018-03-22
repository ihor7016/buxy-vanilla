import template from "./transaction-dialog.html";

import { MDCDialog } from "@material/dialog";
import { MDCSelect } from "@material/select";
import { MDCTextField } from "@material/textfield";
import { MDCRadio } from "@material/radio";

import { CustomSelectComponent } from "../custom-select/custom-select";

import { AccountListService } from "../../services/account-service";
import { TagListService } from "../../services/tag-service";

export class TransactionDialogComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  getStoredAccounts() {
    return AccountListService.get().then(accounts =>
      this.showAccounts(accounts)
    );
  }

  showAccounts(accounts) {
    if (accounts && accounts.length > 0) {
      this.accounts = accounts;
      this.accountSelect.addItems(accounts.map(item => item.name));
    }
  }

  getStoredTags() {
    return TagListService.get().then(tags => this.showTags(tags));
  }

  showTags(tags) {
    if (tags && tags.length > 0) {
      this.tagSelect.addItems(tags);
    }
  }

  fillData(data) {
    this.description.value = data.desc;
    this.amount.value = data.amount;
    this.date.value = data.date;
    if (data.type === "+") {
      this.income.checked = true;
    } else {
      this.expence.checked = true;
    }
    this.accountSelect.makeSelected(data.account);
    this.tagSelect.makeSelected(data.tag);
  }

  showDialog(data) {
    Promise.all([this.getStoredAccounts(), this.getStoredTags()]).then(() => {
      if (data) {
        this.fillData(data);
      }
      this.dialog.show();
    });
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
    this.dialog.listen("MDCDialog:accept", this.handleOk.bind(this));
    this.dialog.listen("MDCDialog:cancel", this.handleCancel.bind(this));
  }

  getType() {
    return this.income.checked ? "+" : "-";
  }

  getAccount() {
    return this.accounts.find(
      item => this.accountSelect.getValue() === item.name
    );
  }

  handleOk() {
    this.props.addTransaction({
      type: this.getType(),
      date: this.date.value,
      amount: parseInt(this.amount.value),
      desc: this.description.value,
      tag: this.tagSelect.getValue(),
      account: this.getAccount(),
      id: Date.now().toString()
    });
    this.cleanDialog();
  }

  handleCancel() {
    this.cleanDialog();
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
    this.mountPoint.innerHTML = template({ type: this.props.type });
    this.querySelectors();
    this.mountChildren();
    this.initMDC();
    this.addEventListeners();
  }
}
