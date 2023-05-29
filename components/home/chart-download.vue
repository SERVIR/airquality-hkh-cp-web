<template>
  <v-menu v-model="isDownloadMenuOpen">
    <template #activator="{ props: activatorProps }">
      <v-tooltip location="top" max-width="240" :disabled="sharedState.chart.isShow">
        <template #activator="{ props: templateProps }">
          <div v-bind="{ ...activatorProps, ...templateProps }">
            <v-btn
              class="font-weight-bold"
              variant="text"
              prepend-icon="mdi-download"
              :append-icon="isDownloadMenuOpen ? 'mdi-chevron-down' : 'mdi-chevron-up'"
              :width="146"
              :loading="loading"
              :disabled="!sharedState.chart.isShow"
            >
              {{ $t("dictionary.download") }}
            </v-btn>
          </div>
        </template>
        First click on "Show Chart" to show the chart then click "Download".
      </v-tooltip>
    </template>

    <v-list>
      <template v-for="format in ['PNG', 'JPEG', 'PDF', 'SVG', 'CSV', 'XLS']" :key="format">
        <v-list-item :title="format" link min-height="32" @click="downloadChart(format)" />
        <v-divider v-if="format === 'SVG'" class="my-2"></v-divider>
      </template>
    </v-list>
  </v-menu>

  <img id="tempImage" style="display: none" />
  <canvas id="canvas" style="display: none" />
</template>

<script setup>
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import moment from "moment";
import * as XLSX from "xlsx";

const sharedState = inject("sharedState");
const isDownloadMenuOpen = ref(false);
const loading = ref(false);
const chartSelector = "#c3js-chart";
const getCanvas = () => html2canvas(document.querySelector(chartSelector), { useCORS: true, logging: false });

const downloadPngOrJpeg = async (format) => {
  const canvas = await getCanvas();

  const formatConfig = {
    PNG: { mimeType: "image/png", filename: "chart.png" },
    JPEG: { mimeType: "image/jpeg", filename: "chart.jpeg" },
  }[format];

  const link = document.createElement("a");
  link.href = canvas.toDataURL(formatConfig.mimeType);
  link.download = formatConfig.filename;
  link.click();
};

const downloadPdf = async () => {
  const canvas = await getCanvas();
  const pngData = canvas.toDataURL("image/png");
  const doc = new jspdf();
  doc.addImage(pngData, "PNG", 10, 10, 180, 140);
  doc.save("chart.pdf");
};

const downloadSvg = async () => {
  const svg = document.querySelector(`${chartSelector} svg`).cloneNode(true);
  const styleElement = document.createElementNS("http://www.w3.org/2000/svg", "style");
  const cssText = `
        .c3-region.region-1 {
          fill: rgb(0, 228, 0);
          fill-opacity: 1 !important;
        }
        .c3-region.region-2 {
          fill: rgb(255, 255, 0);
        }
        .c3-region.region-3 {
          fill: rgb(255, 126, 0);
        }
        .c3-region.region-4 {
          fill: rgb(255, 0, 0);
        }
        .c3-region.region-5 {
          fill: rgb(143, 63, 151);
        }
        .c3-region.region-6 {
          fill: rgb(126, 0, 35);
        }

        path {
          fill: none !important;
        }
        text {
          font-size: 13px;
        }
      `;
  styleElement.appendChild(document.createTextNode(cssText));
  svg.appendChild(styleElement);

  const prefix = `<?xml version="1.0" standalone="no"?>
      <?xml-stylesheet href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.css" type="text/css"?>
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink"`;
  const blob = new Blob([prefix + svg.outerHTML.substr(4)], { type: "image/svg+xml;charset=utf-8" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "chart.svg";
  link.click();
};

const downloadCsvOrXls = async (format) => {
  const data = window.HOME_PAGE_CHART.data();
  const names = window.HOME_PAGE_CHART.internal.config.data_names;

  const rows = [["Location (Source)", "PM2p5", "Time (UTC)"]];
  data.forEach(({ values }) => {
    values.forEach(({ id, value, x }) => {
      rows.push([names[id], value, moment(x).format("YYYY-MM-DD HH:mm:ss")]);
    });
  });

  if ("CSV" === format) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv" }));
    link.download = "chart.csv";
    link.click();
  } else {
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const xlsData = XLSX.write(workbook, { bookType: "xls", type: "array" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([xlsData], { type: "application/vnd.ms-excel" }));
    link.download = "chart.xls";
    link.click();
  }
};

const downloadChart = async (format) => {
  loading.value = true;
  setTimeout(() => {
    ({
      PNG: downloadPngOrJpeg,
      JPEG: downloadPngOrJpeg,
      PDF: downloadPdf,
      SVG: downloadSvg,
      CSV: downloadCsvOrXls,
      XLS: downloadCsvOrXls,
    })[format](format);

    loading.value = false;
  }, 1000);
};
</script>

<style lang="scss"></style>
