import moment from "moment";

const regions = [
  { axis: "y", start: 0, end: 12, class: "region-1", opacity: 0.8 },
  { axis: "y", start: 12.1, end: 35.4, class: "region-2", opacity: 0.8 },
  { axis: "y", start: 35.5, end: 55.4, class: "region-3", opacity: 0.8 },
  { axis: "y", start: 55.5, end: 150.4, class: "region-4", opacity: 0.8 },
  { axis: "y", start: 150.5, end: 250.4, class: "region-5", opacity: 0.8 },
  { axis: "y", start: 250.5, end: 500.4, class: "region-6", opacity: 0.8 },
];

const formatDate = (m) => m.utcOffset(0).format("YYYY-MM-DDTHH:") + "00:00Z";
const gridLinesADayAgo = formatDate(moment().subtract(1, "day"));
const gridLinesNow = formatDate(moment());

const convertCircleToRect = (circle) => {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", circle.getAttribute("cx") - circle.getAttribute("r"));
  rect.setAttribute("y", circle.getAttribute("cy") - circle.getAttribute("r"));
  rect.setAttribute("width", circle.getAttribute("r") * 2);
  rect.setAttribute("height", circle.getAttribute("r") * 2);
  rect.setAttribute("fill", getComputedStyle(circle).color);
  circle.replaceWith(rect);
};

const convertCircleToTriangle = (circle) => {
  // create a new SVG polygon element
  const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

  // calculate the coordinates of the triangle vertices
  const cx = parseFloat(circle.getAttribute("cx"));
  const cy = parseFloat(circle.getAttribute("cy"));
  const r = parseFloat(circle.getAttribute("r")) + 1;
  const x1 = cx - r;
  const y1 = cy;
  const x2 = cx + r * Math.cos(Math.PI / 3);
  const y2 = cy + r * Math.sin(Math.PI / 3);
  const x3 = cx + r * Math.cos(-Math.PI / 3);
  const y3 = cy + r * Math.sin(-Math.PI / 3);

  // set the coordinates of the polygon vertices
  polygon.setAttribute("points", x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3);

  // set the fill color of the polygon
  polygon.setAttribute("fill", getComputedStyle(circle).color);

  // set the rotation angle to 90 degrees
  const angle = 90;

  // set the rotation point to the center of the polygon
  const cx2 =
    (parseFloat(polygon.getAttribute("points").split(" ")[0].split(",")[0]) +
      parseFloat(polygon.getAttribute("points").split(" ")[1].split(",")[0]) +
      parseFloat(polygon.getAttribute("points").split(" ")[2].split(",")[0])) /
    3;
  const cy2 =
    (parseFloat(polygon.getAttribute("points").split(" ")[0].split(",")[1]) +
      parseFloat(polygon.getAttribute("points").split(" ")[1].split(",")[1]) +
      parseFloat(polygon.getAttribute("points").split(" ")[2].split(",")[1])) /
    3;

  // set the transform attribute to apply the rotation transformation
  polygon.setAttribute("transform", "rotate(" + angle + "," + cx2 + "," + cy2 + ")");

  // replace the circle element with the polygon element
  circle.replaceWith(polygon);
};

const convertCircleToStar = (circle) => {
  // Get the SVG circle element and its attributes
  const cx = circle.getAttribute("cx");
  const cy = circle.getAttribute("cy");
  const r = circle.getAttribute("r");

  // Define the properties of the star shape
  const numPoints = 5;
  const innerRadius = r * 0.75;
  const outerRadius = 1.5 * r;

  // Calculate the coordinates of the points of the star shape using the center coordinates and radius of the circle
  let points = "";
  for (let i = 0; i < numPoints; i++) {
    const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
    const x1 = parseFloat(cx) + innerRadius * Math.cos(angle);
    const y1 = parseFloat(cy) + innerRadius * Math.sin(angle);
    const x2 = parseFloat(cx) + outerRadius * Math.cos(angle + Math.PI / numPoints);
    const y2 = parseFloat(cy) + outerRadius * Math.sin(angle + Math.PI / numPoints);
    points += `${x1},${y1} ${x2},${y2} `;
  }

  // Replace the SVG circle element with a polygon element with the calculated coordinates
  const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  polygon.setAttribute("points", points.trim());
  polygon.setAttribute("fill", getComputedStyle(circle).color);
  circle.replaceWith(polygon);
};

export default ({ names, xs, json, colors }) => ({
  bindto: "#c3js-chart",
  data: {
    xFormat: "%Y-%m-%dT%H:%M:%SZ",
    names,
    xs,
    json,
    colors,
  },
  axis: {
    x: {
      type: "timeseries",
      label: {
        text: "Time (UTC)",
        position: "outer-center",
      },
    },
    y: {
      label: {
        text: "PM 2.5 (μg/m3)",
        position: "outer-middle",
      },
      min: 0,
      padding: {
        bottom: 0,
        top: 50,
      },
    },
  },
  regions,
  grid: {
    x: {
      lines: [
        {
          value: gridLinesADayAgo,
          text: "24 hours ago",
        },
        {
          value: gridLinesNow,
          text: "now",
        },
      ],
    },
  },
  legend: {
    show: false,
  },
  tooltip: {
    grouped: false,
    format: {
      title: (d) => `${moment(d).format("dddd, MMM D, HH:mm")} UTC   (PM2p5)`,
    },
  },
  padding: {
    top: 12,
  },
  onrendered() {
    const dataNames = this.config?.data_names;
    if (!dataNames) return;

    document.querySelectorAll(`#c3js-chart .c3-chart-line`).forEach((chartLine) => {
      const chartLineClass = chartLine.getAttribute("class");
      if (!chartLineClass) return;

      const dataKey = chartLineClass.match(/data(\d)+/)[0];
      if (!dataNames[dataKey]) return;

      const source = dataNames[dataKey].match(/\(([^)]+)\)/)[1];
      const circles = chartLine.querySelectorAll(`.c3-circles-${dataKey} .c3-circle`);

      if ("AERONET" == source) {
        circles.forEach(convertCircleToRect);
      } else if ("GEOS" == source) {
        circles.forEach(convertCircleToTriangle);
      } else if ("Terra-MODIS" == source) {
        circles.forEach(convertCircleToStar);
      }
    });
  },
});
