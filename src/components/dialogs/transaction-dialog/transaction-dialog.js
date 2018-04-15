import template from "./transaction-dialog.html";

import { MDCDialog } from "@material/dialog";
import { MDCSelect } from "@material/select";
import { MDCTextField } from "@material/textfield";
import { MDCRadio } from "@material/radio";

import { CustomSelectComponent } from "../../ui/custom-select/custom-select";

import { AccountListService } from "../../../services/models/account-service";
import { TagListService } from "../../../services/models/tag-service";

export class TransactionDialogComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.accounts = [];
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
      this.expense.checked = true;
    }
    this.accountSelect.makeSelected(data.account);
    this.tagSelect.makeSelected(data.tag);
  }

  showDialog(data) {
    Promise.all([this.getStoredAccounts(), this.getStoredTags()]).then(() => {
      if (data) {
        this.fillData(data);
      } else {
        this.expense.checked = true;
      }
      this.date.value = new Date().toISOString().slice(0, 10);
      this.dialog.show();
    });
  }

  querySelectors() {
    this.addTransactionDialog = this.mountPoint.querySelector(
      ".transaction-dialog"
    );
    this.accountSelectMountPoint = this.mountPoint.querySelector(
      ".transaction-dialog__account-point"
    );
    this.tagSelectMountPoint = this.mountPoint.querySelector(
      ".transaction-dialog__tag-point"
    );
    this.descriptionTextField = this.mountPoint.querySelector(
      ".transaction-dialog__description"
    );
    this.amountTextField = this.mountPoint.querySelector(
      ".transaction-dialog__amount"
    );
    this.dateTextField = this.mountPoint.querySelector(
      ".transaction-dialog__date"
    );
    this.incomeRadio = this.mountPoint.querySelector(
      ".transaction-dialog__income"
    );
    this.expenseRadio = this.mountPoint.querySelector(
      ".transaction-dialog__expense"
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
    this.expense = new MDCRadio(this.expenseRadio);
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
    if (this.validate()) {
      const data = {
        type: this.getType(),
        date: this.date.value,
        amount: parseInt(this.amount.value),
        desc: this.description.value,
        tag: this.tagSelect.getValue(),
        account: this.getAccount(),
        id: Date.now().toString()
      };
      this.props.onDialogSubmit(data);
      this.dialog.close();
      this.cleanDialog();
    }
  }

  handleCancel() {
    this.cleanDialog();
  }

  validate() {
    let valid = true;
    if (!this.description.valid) {
      valid = false;
      this.descriptionTextField.classList.add("mdc-text-field--invalid");
    }
    if (!this.date.valid || !this.date.value) {
      valid = false;
      this.dateTextField.classList.add("mdc-text-field--invalid");
    }
    if (!this.amount.valid) {
      valid = false;
      this.amountTextField.classList.add("mdc-text-field--invalid");
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
    this.amount.value = "";
    this.description.value = "";
    this.amountTextField.classList.remove("mdc-text-field--invalid");
    this.descriptionTextField.classList.remove("mdc-text-field--invalid");
    this.dateTextField.classList.remove("mdc-text-field--invalid");
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
