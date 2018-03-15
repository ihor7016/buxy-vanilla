import template from "./accounts-component.html";
import { ButtonMoreComponent } from "../button-more/button-more";
import { Account } from "../../services/model/account";
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
  }

  initMoreBtns() {
    Array.from(this.moreBtnMountPoints).forEach(point => {
      new ButtonMoreComponent(point, {
        position: "right",
        onDeleteClicked: this.handleDeleteClick.bind(this),
        onEditClicked: this.handleEditClick.bind(this)
      }).mount();
    });
  }

  addEventListeners() {
    this.addAccountButton.addEventListener(
      "click",
      this.handleAddAccountClick.bind(this)
    );
  }

  handleAddAccountClick() {
    this.props.onAddAccountClick();
  }

  handleEditClick() {
    console.log("handleEditClick");
  }

  handleDeleteClick() {
    console.log("handleDeleteClick");
  }

  mount() {
    this.mountPoint.innerHTML = template({
      accounts: [new Account("Privat", "", 200), new Account("Privat", "", 200)]
    });
    this.querySelectors();
    this.initMoreBtns();
    this.addEventListeners();
  }
}
