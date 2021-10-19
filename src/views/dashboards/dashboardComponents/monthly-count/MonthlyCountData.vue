<script>
export default {
  CountChart: {
    series: [
      {
        name: "Single checks",
        data: [9, 5, 3, 7, 5, 10, 3, 9, 5, 3, 7, 5]
      },
      {
        name: "Bulk checks",
        data: [6, 3, 9, 5, 4, 6, 4, 6, 3, 9, 5, 4]
      },
      {
        name: "API checks",
        data: [5, 6, 4, 5, 7, 2, 8, 5, 6, 4, 5, 7]
      }
    ],
    chartOptions: {
      grid: {
        show: true,
        borderColor: "rgba(0, 0, 0, .3)",
        strokeDashArray: 5,
        padding: {
          left: 0,
          right: 0,
          bottom: 0
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          endingShape: "flat"
        }
      },
      colors: ["#7460ee", "#26c6da", "#f62d51"],
      fill: {
        type: "solid",
        opacity: 1
      },
      chart: {
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      legend: {
        show: false
      },
      xaxis: {
        type: "category",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        labels: {
          style: {
            cssClass: "grey--text lighten-2--text fill-color"
          }
        }
      },
      yaxis: {
        show: true,
        labels: {
          style: {
            cssClass: "grey--text lighten-2--text fill-color"
          }
        }
      },
      stroke: {
        // curve: "straight",
        // width: 2
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      tooltip: {
        theme: "dark"
      }
    }
  }
};
</script>
