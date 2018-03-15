import template from "./pie-chart.html";
import Chart from "chart.js";

export class PieChartComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.colors = [];
  }

  querySelectors() {
    this.pieChartCtx = this.mountPoint.querySelector(".chart__visual");
  }

  drawFromList(list) {
    let data = {
      tags: [],
      amounts: []
    };
    const expenceList = list.filter(row => {
      return row.type == "-";
    });
    expenceList.forEach(row => {
      if (data.tags.indexOf(row.tag) == -1) {
        data.tags.push(row.tag);
        data.amounts.push(row.amount);
      } else {
        data.amounts[data.tags.indexOf(row.tag)] += row.amount;
      }
    });
    this.drawPieChart(data.tags, data.amounts);
  }

  randomColorGenerator() {
    return "#" + (Math.random().toString(16) + "0000000").slice(2, 8);
  }

  drawPieChart(tags, amounts) {
    while (this.colors.length < tags.length) {
      this.colors.push(this.randomColorGenerator());
    }
    if (this.pieChart) {
      this.pieChart.data.datasets[0].data = amounts;
      this.pieChart.data.datasets[0].backgroundColor = this.colors;
      this.pieChart.data.labels = tags;
      this.pieChart.update();
    } else {
      this.pieChart = new Chart(this.pieChartCtx, {
        type: "pie",
        data: {
          datasets: [
            {
              data: amounts,
              backgroundColor: this.colors
            }
          ],
          labels: tags
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
  }
}
