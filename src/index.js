import "./index.scss";

//import { AppComponent } from "./components/app/app";
import { AddTransactionComponent } from "./components/dialog-add-transaction/dialog-add-transaction";

const root = document.querySelector("#root");
//new AppComponent(root).mount();
new AddTransactionComponent(root).mount();
