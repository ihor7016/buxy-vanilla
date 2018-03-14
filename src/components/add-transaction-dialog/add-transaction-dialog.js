import template from "./add-transaction-dialog.html";
import { MDCDialog } from "@material/dialog";
import { MDCSelect } from "@material/select";
import { MDCTextField } from "@material/textfield";
import { MDCRadio } from "@material/radio";

export class AddTransactionComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  showDialog() {
    this.dialog.show();
  }

  querySelectors() {
    this.addTransactionDialog = this.mountPoint.querySelector(
      ".add-transaction-dialog"
    );
    this.accountTransactionSelect = this.mountPoint.querySelector(
      ".add-transaction-dialog__account"
    );
    this.tagTransactionSelect = this.mountPoint.querySelector(
      ".add-transaction-dialog__tag"
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
    this.accountSelect = new MDCSelect(this.accountTransactionSelect);
    this.tagSelect = new MDCSelect(this.tagTransactionSelect);
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

  handleOk() {
    console.log("accepted");
    this.props.addTransaction(
      this.income.checked,
      this.date.value,
      this.amount.value,
      this.description.value,
      this.tagSelect.value,
      this.accountSelect.value
    );
  }

  handleCancel() {
    console.log("declined");
  }

  mount() {
    this.mountPoint.innerHTML = template({
      accounts: ["Private", "Cash"],
      tags: ["Transport", "Groceries", "Entertainment"]
    });
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
  }
}
