import template from "./add-transaction-dialog.html";

import { MDCDialog } from "@material/dialog";
import { MDCSelect } from "@material/select";
import { MDCTextField } from "@material/textfield";
import { MDCRadio } from "@material/radio";

import { TransactionSelectComponent } from "../transaction-dialog-select/transaction-dialog-select";

import { AccountListService } from "../../services/account-service";
import { TagListService } from "../../services/tag-service";
import { Transaction } from "../../models/transaction";

export class AddTransactionComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  getStoredAccounts() {
    AccountListService.get()
      .then(accounts => this.showAccounts(accounts))
      .catch(e => console.error(e.message));
  }

  showAccounts(accounts) {
    this.accountSelect = new TransactionSelectComponent(
      this.accountTransactionSelect,
      {
        type: "account",
        items: accounts
      }
    );
    this.accountSelect.mount();
  }

  getStoredTags() {
    TagListService.get()
      .then(tags => this.showTags(tags))
      .catch(e => console.error(e.message));
  }

  showTags(tags) {
    this.tagSelect = new TransactionSelectComponent(this.tagTransactionSelect, {
      type: "tag",
      items: tags
    });
    this.tagSelect.mount();
  }

  showDialog() {
    this.getStoredAccounts();
    this.getStoredTags();
    this.dialog.show();
  }

  querySelectors() {
    this.addTransactionDialog = this.mountPoint.querySelector(
      ".add-transaction-dialog"
    );
    this.accountTransactionSelect = this.mountPoint.querySelector(
      ".add-transaction-dialog__account-point"
    );
    this.tagTransactionSelect = this.mountPoint.querySelector(
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

  handleOk() {
    const transaction = new Transaction(
      this.getType(),
      this.date.value,
      parseInt(this.amount.value),
      this.description.value,
      this.tagSelect.getValue(),
      this.accountSelect.getAccount()
    );
    this.props.addTransaction(transaction);
    this.cleanDialog();
  }

  handleCancel() {
    this.cleanDialog();
  }

  cleanDialog() {
    this.income.checked = true;
    this.date.value = "";
    this.amount.value = "";
    this.description.value = "";
    this.tagSelect.clean();
    this.accountSelect.clean();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
  }
}
