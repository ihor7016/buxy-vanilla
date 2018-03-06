import template from "./add-transaction-dialog.html";
import button from "./add-transaction-button.html";
// import { MDCSelect } from "@material/select/index";

// console.log(MDCSelect);

// const select = new MDCSelect(document.querySelector(".mdc-select1"));

// console.log(select);

// select.listen("MDCSelect:change", () => {
//   alert(
//     `Selected "${select.selectedOptions[0].textContent}" at index ${
//       select.selectedIndex
//     } ` + `with value "${select.value}"`
//   );
// });

export class AddTransactionComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = template({
      /* name: "Ihor" */
    });
  }
}
