import template from "./add-transaction-dialog.html";
import button from "./add-transaction-button.html";
import { MDCDialog, MDCDialogFoundation, util } from "@material/dialog";
import { MDCSelect } from "@material/select";

export class AddTransactionComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  addTag() {
    //
  }

  addAccount() {
    //
  }

  querySelectors() {
    this.addTransactionButton = this.mountPoint.querySelector(
      ".add-transaction__activation"
    );
    this.addTransactionDialog = this.mountPoint.querySelector(
      ".add-transaction__dialog"
    );
    this.accountTransactionSelect = this.mountPoint.querySelector(
      ".add-transaction__account"
    );
    this.tagTransactionSelect = this.mountPoint.querySelector(
      ".add-transaction__tag"
    );
  }

  initMDC() {
    this.dialog = new MDCDialog(this.addTransactionDialog);
    this.accountSelect = new MDCSelect(this.accountTransactionSelect);
    this.tagSelect = new MDCSelect(this.tagTransactionSelect);
  }

  addEventListeners() {
    this.addTransactionButton.addEventListener(
      "click",
      this.handlerOnclickBtnShow.bind(this)
    );
    this.dialog.listen("MDCDialog:accept", this.handlerAccept.bind(this));
    this.dialog.listen("MDCDialog:cancel", this.handlerDecline.bind(this));
    this.accountSelect.listen(
      "MDCSelect:change",
      this.handleAccountSelect.bind(this)
    );
    this.tagSelect.listen("MDCSelect:change", this.handleTagSelect.bind(this));
  }

  handlerOnclickBtnShow(evt) {
    this.dialog.lastFocusedTarget = evt.target;
    this.dialog.show();
  }

  handlerAccept() {
    console.log("accepted");
  }

  handlerDecline() {
    console.log("declined");
  }

  handleAccountSelect() {
    console.log(
      `Selected "${
        this.accountSelect.selectedOptions[0].textContent
      }" at index ${this.accountSelect.selectedIndex} ` +
        `with value "${this.accountSelect.value}"`
    );
  }

  handleTagSelect() {
    console.log(
      `Selected "${this.tagSelect.selectedOptions[0].textContent}" at index ${
        this.tagSelect.selectedIndex
      } ` + `with value "${this.tagSelect.value}"`
    );
  }

  mount() {
    this.mountPoint.innerHTML += button();
    this.mountPoint.innerHTML += template({
      accounts: ["Private", "Cash"],
      tags: ["Transport", "Groceries", "Entertainment"]
    });
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
  }
}
