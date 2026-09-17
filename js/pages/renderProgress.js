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

  const moduleTransactions = resProgress.data.data.user[0].moduleTransaction;

  document.querySelector(".chart_Progrese").innerHTML =
    createProgressBars(moduleTransactions);
}

const formatBytes = (val) => {
  if (!val || val <= 0) return "0 KB";

  const mb = val / 1000000;

  if (mb < 1) {
    const kb = Math.round(val / 1000);
    return `${kb} KB`;
  }

  const roundedMb = Number.isInteger(mb) ? mb : mb.toFixed(1);

  return `${roundedMb} MB`;
};

function createProgressBars(userData = []) {
  if (userData.length === 0) {
    return `
      <div class="no-progress">
        No progress available
      </div>
    `;
  }

  const sorted = [...userData].sort((a, b) => b.amount - a.amount);

  const maxAmount = Math.max(...sorted.map((item) => item.amount));

  const progressBars = sorted
    .map((item) => {
      const name = item.object?.name || "Task";

      const amount = item.amount || 0;
      console.log(amount, name);

      const percentage =
        maxAmount > 0 ? Math.round((amount / maxAmount) * 100) : 0;

      return `
        <div class="progress-item">

          <div class="progress-header">
            <span class="progress-name">${name}</span>

            <span class="progress-value">
              ${formatBytes(amount)}
            </span>
          </div>

          <div class="progress-bar">
            <div
              class="progress-fill"
              style="width: ${percentage}%"
            ></div>
          </div>

          <div class="progress-footer">
            <span>${percentage}%</span>
            <span>
              ${new Date(item.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

        </div>
      `;
    })
    .join("");

  return `
    <div class="progress-container">
      ${progressBars}
    </div>
  `;
}
