<template>
  <v-card-title>
    <emission-chart-header @refresh="generateChart" />
    <div class="text-center my-2" style="min-height: 16px">{{ title }}</div>
  </v-card-title>

  <div class="emission-chart-wrapper">
    <v-progress-circular v-if="sharedState.chart.isLoading" color="primary" indeterminate :size="60" :width="6" />
    <div id="emission-chart" :class="{ 'pb-8': sharedState.isMobile }" />
  </div>
</template>

<script setup>
import c3 from "c3";
import * as api from "@/api";

const sharedState = inject("sharedState");
const title = ref("");

let chart;
const bindto = "#emission-chart";
const generateChart = async ({ type, inventory, pollutant, sector, year }) => {
  chart?.destroy();

  sharedState.value.chart.isLoading = true;

  switch (type) {
    case "Selector share (%)":
      title.value = `${inventory} - ${pollutant} (${year})`;
      await drawSelectorShareChart({ inventory, pollutant, year });
      break;
    case "Selector contribution":
      title.value = `${inventory} - ${pollutant} (${year})`;
      await drawSelectorContributionChart({ inventory, pollutant, year });
      break;
    case "Time series":
      title.value = `${inventory} ${pollutant} ${sector}`;
      await drawTimeseriesChart({ inventory, pollutant, sector });
      break;
    case "Inventory comparison":
      title.value = `${pollutant} - ${sector} (${year})`;
      await drawInventoryComparisonChart({ pollutant, sector, year });
  }

  sharedState.value.chart.isLoading = false;
};

const drawSelectorShareChart = async ({ inventory, pollutant, year }) => {
  const apiResponse = await api.getEmissionChartData({
    cascaderValue: [inventory, pollutant, year],
    plotType: "SectorShare",
  });
  const chartData = apiResponse.data.data.reduce((map, { name, y }) => {
    map[name] = y;
    return map;
  }, {});

  chart = c3.generate({
    bindto,
    size: {
      //   width: 472,
      height: 160,
    },
    data: {
      columns: [
        ["Energy", chartData["Energy"]],
        ["Industry", chartData["Industry"]],
        ["Residential", chartData["Residential"]],
        ["Transport", chartData["Transport"]],
      ],
      type: "pie",
      color: {
        Energy: "rgb(124, 181, 236)",
        Industry: "rgb(67, 67, 72)",
        Residential: "rgb(144, 237, 125)",
        Transport: "rgb(247, 163, 92)",
      },
    },
    legend: {
      position: "right",
    },
    tooltip: {
      format: {
        title: () => "Sector",
      },
    },
    padding: {
      right: 20,
    },
  });
};

const drawSelectorContributionChart = async ({ inventory, pollutant, year }) => {
  const apiResponse = await api.getEmissionChartData({
    cascaderValue: [inventory, pollutant, year],
    plotType: "SectorContribution",
  });

  const columns = [];
  const categories = [];
  apiResponse.data.data.forEach(({ name, y }) => {
    categories.push(name);
    columns.push(y);
  });
  // const maxValue = Math.max(...columns);
  // const firstTick = Math.ceil(maxValue / 4);
  // const ticks = [0, firstTick, firstTick * 2, firstTick * 3, firstTick * 4];

  chart = c3.generate({
    bindto,
    size: {
      //   width: 472,
      height: 190,
    },
    data: {
      columns: [["Emission (kt)", ...columns]],
      type: "bar",
      color: function () {
        const index = arguments[1].index;
        const colors = ["rgb(124, 181, 236)", "rgb(67, 67, 72)", "rgb(144, 237, 125)"];
        return colors[index];
      },
    },
    bar: {
      width: 50,
    },
    axis: {
      x: {
        label: {
          text: "",
          position: "outer-center",
        },
        type: "category",
        categories,
        tick: {
          centered: true,
        },
      },
      y: {
        label: {
          text: "Emission (kt)",
          position: "outer-middle",
        },
        tick: {
          count: 5,
        },
      },
    },
    grid: {
      lines: {
        front: false,
      },
      y: {
        show: true,
        // lines: ticks.map((value) => ({ value })),
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      format: {
        title: () => "Sector",
        name: (name, ratio, id, index) => categories[index],
        value: (value, ratio, id, index) => columns[index] + " kt",
      },
    },
    padding: {
      right: 20,
    },
  });
};

const drawTimeseriesChart = async ({ inventory, pollutant, sector }) => {
  const apiResponse = await api.getEmissionChartData({
    cascaderValue: [inventory, pollutant, sector],
    plotType: "Timeseries",
  });

  const timestamps = [];
  const values = [];
  apiResponse.data.data.forEach(([timestamp, value]) => {
    timestamps.push(timestamp);
    values.push(value);
  });

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const yGridSectionSize = (maxValue - minValue) / 4;

  chart = c3.generate({
    bindto,
    size: {
      //   width: 472,
      height: 190,
    },
    data: {
      x: "x",
      columns: [
        ["x", ...timestamps],
        ["Pollutant", ...values],
      ],
      colors: {
        Pollutant: "#68ace6",
      },
    },
    axis: {
      x: {
        type: "timeseries",
        tick: {
          format: "%Y",
        },
      },
      y: {
        label: {
          text: "Emission (kt)",
          position: "outer-middle",
        },
        padding: 0,
        tick: {
          count: 5,
          format: (val) => val.toFixed(2),
        },
        min: minValue - yGridSectionSize,
        max: maxValue + yGridSectionSize,
      },
    },
    grid: {
      lines: {
        front: false,
      },
      y: {
        show: true,
      },
    },
    legend: {
      show: false,
    },
    padding: {
      right: 20,
    },
  });
};

const drawInventoryComparisonChart = async ({ pollutant, sector, year }) => {
  const apiResponse = await api.getEmissionChartData({
    cascaderValue: [pollutant, sector, year],
    plotType: "InventriesComparison",
  });

  const columns = [];
  const categories = [];
  apiResponse.data.data.forEach(({ name, y }) => {
    categories.push(name);
    columns.push(y);
  });

  chart = c3.generate({
    bindto,
    size: {
      //   width: 472,
      height: 190,
    },
    data: {
      columns: [["Emission (kt)", ...columns]],
      type: "bar",
      color: function () {
        const index = arguments[1].index;
        const colors = ["rgb(124, 181, 236)", "rgb(67, 67, 72)", "rgb(144, 237, 125)"];
        return colors[index];
      },
    },
    bar: {
      width: 40,
    },
    axis: {
      x: {
        label: {
          text: "",
          position: "outer-center",
        },
        type: "category",
        categories,
        tick: {
          centered: true,
        },
      },
      y: {
        label: {
          text: "Emission (kt)",
          position: "outer-middle",
        },
        tick: {
          count: 5,
          format: (val) => val.toFixed(2),
        },
      },
    },
    grid: {
      lines: {
        front: false,
      },
      y: {
        show: true,
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      format: {
        title: () => "Sector",
        name: (name, ratio, id, index) => categories[index],
        value: (value, ratio, id, index) => columns[index] + " kt",
      },
    },
    padding: {
      right: 20,
    },
  });
};
</script>

<style lang="scss">
@import "c3/c3.min.css";

.emission-chart-wrapper {
  height: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.c3-line {
  stroke-width: 2.5px;
}
</style>
