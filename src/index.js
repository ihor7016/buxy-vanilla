import "./index.scss";

import { AppComponent } from "./components/app/app";
import { DrawerComponent } from "./components/drawer/drawer";

const root = document.querySelector("#root");
new AppComponent(root).mount();
new DrawerComponent(root).mount();
