import "./index.scss";

import { AppComponent } from "./components/app/app";
import { PieChartComponent } from "./components/pie-chart/pie-chart";

const root = document.querySelector("#root");
new AppComponent(root).mount();
new PieChartComponent(root).mount();
