import GetProgressAction from "./actions/userProgressAction.js";
import RenderNavBar from "./renderNavBar.js";
import RenderProfile from "./renderProfile.js";

export default async function RenderProgress() {
  await RenderNavBar();
  const id = localStorage.getItem("user_Id");

  if (!id) {
    window.location.href = "#/";
    return;
  }
  const resProgress = await GetProgressAction(id);

  const html = await fetch("../../templates/progress.html").then((res) =>
    res.text(),
  );
  document.querySelector(".dataSection").innerHTML = html;
  document.querySelector(".chart_Progrese").innerHTML = createDynamicGraphSVG(
    resProgress.data.data.user[0].moduleTransaction,
  );
}

const formatBytes = (val) => {
  if (!val || val <= 0) return "0 KB";

  const mb = val / 1000000;

  if (mb < 1) {
    const kb = Math.round(val / 1000);
    return `${kb} KB`;
  } else {
    const roundedMb = Number.isInteger(mb) ? mb : mb.toFixed(1);
    return `${roundedMb} MB`;
  }
};

function createDynamicGraphSVG(userData = [], options = {}) {
  const {
    width = 800,
    height = 400,
    padding = 60,
    lineColor = "#d9d5d5",
    fillColor = "#636363",
    gridColor = "#000000",
    textColor = "#636363",
  } = options;
  const sorted = userData.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  );

  let cumulativeSum = 0;
  const processedData = sorted.map((item) => {
    cumulativeSum += item.amount;
    return {
      date: new Date(item.createdAt),
      amount: item.amount,
      cumAmount: cumulativeSum,
      name: item.object?.name || "Task",
    };
  });

  const maxVal = Math.max(...processedData.map((d) => d.cumAmount));

  if (userData.length === 0) {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="50%" text-anchor="middle" fill="${textColor}">No data available</text>
    </svg>`;
  }

  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;
  const points = processedData.map((d, index) => {
    let x =
      padding +
      (processedData.length > 1
        ? (index / (processedData.length - 1)) * graphWidth
        : graphWidth / 2);

    const y = height - padding - (d.cumAmount / maxVal) * graphHeight;
    return { x, y, ...d };
  });

  const pathD = points.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x},${pt.y}`,
    "",
  );

  const areaD = `${pathD} L ${points[points.length - 1].x},${
    height - padding
  } L ${points[0].x},${height - padding} Z`;

  const gridSteps = 5;
  let gridLines = "";
  for (let i = 0; i <= gridSteps; i++) {
    const yVal = (maxVal / gridSteps) * i;
    const yPos = height - padding - (yVal / maxVal) * graphHeight;

    const formattedVal = formatBytes(yVal);

    gridLines += `
      <line x1="${padding}" y1="${yPos}" x2="${
        width - padding
      }" y2="${yPos}" stroke="${gridColor}" stroke-dasharray="4,4" />
      <text x="${
        padding - 8
      }" y="${yPos + 4}" font-size="11" text-anchor="end" fill="${textColor}">${formattedVal}</text>
    `;
  }

  const xLabelsCount = Math.min(processedData.length, 5);
  let xLabels = "";
  for (let i = 0; i < xLabelsCount; i++) {
    const idx = Math.floor(
      (i / (xLabelsCount - 1)) * (processedData.length - 1),
    );
    const pt = points[idx];
    const dateStr = pt.date.toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });

    xLabels += `
      <text x="${pt.x}" y="${
        height - padding + 20
      }" font-size="11" text-anchor="middle" fill="${textColor}">${dateStr}</text>
    `;
  }

  const circles = points
    .map(
      (pt) => `
    <g class="pointGroup">
      <circle cx="${pt.x}" cy="${
        pt.y
      }" r="4" fill="${lineColor}" stroke="#ffffff" stroke-width="2" />
      <title>${pt.name} (${pt.date.toISOString().split("T")[0]})\n+${formatBytes(pt.amount)} | Total: ${formatBytes(pt.cumAmount)}</title>
    </g>
  `,
    )
    .join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="font-family: sans-serif; background: #151515; border-radius: 8px;">
      <style>
        .pointGroup { cursor: pointer; transition: transform 0.2s; }
        .pointGroup:hover circle { r: 6; fill: #636363; }
      </style>
      ${gridLines}
      <path d="${areaD}" fill="${fillColor}" />
      <path d="${pathD}" fill="none" stroke="${lineColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      ${circles}
      ${xLabels}
      <line x1="${padding}" y1="${height - padding}" x2="${
        width - padding
      }" y2="${height - padding}" stroke="#9ca3af" stroke-width="1.5" />
      <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${
        height - padding
      }" stroke="#9ca3af" stroke-width="1.5" />
    </svg>
  `.trim();
}
