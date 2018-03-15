import template from "./pie-chart.html";
import Chart from "chart.js";

export class PieChartComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.pieChartCtx = this.mountPoint.querySelector(".chart__visual");
  }

  drawFromList(list) {
    let data = [];
    let tags = [];
    let colors = [];
    list.reduce((prev, curr, index, array) => {
      // something
    }, data);

    this.drawPieChart(data, tags, colors);
  }

  randomColorGenerator() {
    return "#" + (Math.random().toString(16) + "0000000").slice(2, 8);
  }

  drawPieChart(data, tags, colors) {
    if (this.pieChart) {
      this.pieChart.data.datasets[0].data = data;
      this.pieChart.data.datasets[0].backgroundColor = colors;
      this.pieChart.data.labels = tags;
      this.pieChart.udate();
    } else {
      this.pieChart = new Chart(this.pieChartCtx, {
        type: "pie",
        data: {
          datasets: [
            {
              data: [10, 20, 30],
              backgroundColor: ["#673AB7", "#F44336", "#FFC107"]
            }
          ],
          labels: ["Transport", "Groceries", "Entertainment"]
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
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.drawPieChart();
  }
}
