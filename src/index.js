import "./index.scss";

import { AppComponent } from "./components/app/app";

const root = document.querySelector("#root");
new AppComponent(root).mount();
