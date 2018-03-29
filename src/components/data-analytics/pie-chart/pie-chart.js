import template from "./pie-chart.html";
import Chart from "chart.js";

import { CurrencyConverterUAHService } from "../../../services/currency-converter-uah";
import { ColorGeneratorService } from "../../../services/color-generator";

export class PieChartComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.dataset = { tags: [], amounts: [], colors: [] };
  }

  querySelectors() {
    this.chartCtx = this.mountPoint.querySelector(".chart__visual");
    this.emptyState = this.mountPoint.querySelector(".chart__empty-state");
    this.chartBox = this.mountPoint.querySelector(".chart__box");
  }

  updateAdd(data) {
    if (data.type === "+") {
      return;
    }
    this.dataset = this.addCurrData(this.dataset, data);
    this.drawChanged();
  }

  updateDel(data) {
    if (data.type === "+") {
      return;
    }
    this.dataset = this.delCurrData(this.dataset, data);
    this.drawChanged();
  }

  updateEdit(oldData, newData) {
    if (oldData.type === "+" && newData.type === "+") {
      return;
    }
    if (oldData.type === "+" && newData.type === "-") {
      this.dataset = this.addCurrData(this.dataset, newData);
    } else if (oldData.type === "-" && newData.type === "+") {
      this.dataset = this.delCurrData(this.dataset, oldData);
    } else {
      this.dataset = this.addCurrData(this.dataset, newData);
      this.dataset = this.delCurrData(this.dataset, oldData);
    }
    this.drawChanged();
  }

  createFromList(list) {
    this.dataset.tags = [];
    this.dataset.amounts = [];
    let expenceList = list.filter(item => item.type === "-").reverse();
    this.dataset = expenceList.reduce(this.addCurrData, this.dataset);
    this.drawChanged();
  }

  addCurrData(data, item) {
    let amount = item.amount;
    if (item.account.currency !== "UAH") {
      amount = CurrencyConverterUAHService.convert(
        item.account.currency,
        amount
      );
    }
    const i = data.tags.indexOf(item.tag);
    if (i < 0) {
      data.tags.push(item.tag);
      data.amounts.push(amount);
      data.colors.push(ColorGeneratorService.get());
    } else {
      data.amounts[i] += amount;
    }
    return data;
  }

  delCurrData(data, item) {
    let amount = item.amount;
    if (item.account.currency !== "UAH") {
      amount = CurrencyConverterUAHService.convert(
        item.account.currency,
        amount
      );
    }
    const i = data.tags.indexOf(item.tag);
    data.amounts[i] -= amount;
    if (data.amounts[i] < 0.01) {
      data.tags.splice(i, 1);
      data.amounts.splice(i, 1);
      data.colors.splice(i, 1);
    }
    return data;
  }

  drawChanged() {
    if (!this.dataset.amounts.length) {
      this.chartBox.classList.add("chart__box--hidden");
      this.emptyState.classList.remove("chart__empty-state--hidden");
    } else {
      this.chartBox.classList.remove("chart__box--hidden");
      this.emptyState.classList.add("chart__empty-state--hidden");
    }
    this.chart.data.datasets[0].data = this.dataset.amounts;
    this.chart.data.datasets[0].backgroundColor = this.dataset.colors;
    this.chart.data.labels = this.dataset.tags;
    this.chart.update();
  }

  draw() {
    this.chart = new Chart(this.chartCtx, {
      type: "pie",
      data: {
        datasets: [
          {
            data: this.dataset.amounts,
            backgroundColor: this.dataset.colors
          }
        ],
        labels: this.dataset.tags
      },
      options: {
        legend: {
          position: "right",
          labels: {
            fontFamily: "Roboto, sans-serif",
            fontSize: 14
          }
        }
      }
    });
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.draw();
  }
}
