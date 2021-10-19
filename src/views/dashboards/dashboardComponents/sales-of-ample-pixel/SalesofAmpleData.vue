<script>
export default {
  SalesAmpleChart: {
    series: [
      {
        name: "Deliverable",
        data: [0, 4, 3, 24, 9, 10, 18, 15, 44, 17, 19, 51]
      },
      {
        name: "Valid but Risky",
        data: [0, 3, 10, 16, 12, 8, 28, 14, 20, 41, 15, 38]
      },
      {
        name: "Invalid",
        data: [0, 8, 12, 10, 24, 6, 12, 4, 21, 15, 44, 24]
      },
      {
        name: "Unknown",
        data: [0, 1, 5, 10, 24, 6, 12, 4, 21, 15, 24, 20]
      }
    ],
    chartOptions: {
      grid: {
        show: true,
        borderColor: "rgba(0, 0, 0, .3)",
        strokeDashArray: 3,
        padding: {
          left: 0,
          right: 30,
          bottom: 0
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "22%",
          endingShape: "flat"
        }
      },
      colors: [
        // "rgba(30, 172, 190, .3)",
        "#7460ee",
        "rgba(38, 198, 218, .7)",
        "#f62d51",
        "#9e9e9e"
      ],
      fill: {
        type: "solid",
        opacity: 1
      },
      markers: {
        size: 1,
        strokeColors: "rgba(30, 172, 190, .7)"
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
        curve: "smooth",
        width: 0
      },
      tooltip: {
        theme: "dark"
      }
    }
  }
};
</script>
