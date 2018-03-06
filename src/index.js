import "./index.scss";

//import { AppComponent } from "./components/app/app";
import { AddTransactionComponent } from "./components/add-transaction-dialog/add-transaction-dialog";

const root = document.querySelector("#root");
//new AppComponent(root).mount();
new AddTransactionComponent(root).mount();
