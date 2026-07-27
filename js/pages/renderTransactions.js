import GetUserTransaction from "./actions/userTransactions.js";
import RenderNavBar from "./renderNavBar.js";

export default async function RenderTransaction() {
  await RenderNavBar();
  const id = localStorage.getItem("user_Id");
  if (!id) {
    window.location.href = "#/login";
    return;
  }

  const res = await GetUserTransaction(id);
  if (!res.success || !res.data?.data) {
    document.querySelector(".dataSection").innerHTML =
      `<div class="error-msg">Unable to load transactions.</div>`;
    return;
  }

  const responseData = res.data.data;
  const transactionList = responseData.transaction || [];
  let totale = 0;
  transactionList.forEach((el) => {
    totale += el.amount || 0;
  });

  totale = totale / 1000;
  const html = await fetch("../../templates/transactionsInfoSection.html").then(
    (res) => res.text(),
  );

  document.querySelector(".dataSection").innerHTML = html;

  document.querySelector(".Totale_xp_value").innerHTML =
    totale >= 1000 ? `${Math.round(totale)} MB` : `${Math.round(totale)} KB`;
  document.querySelector(".Totale_transaction_value").innerHTML =
    transactionList.length;

  const currentLevel = responseData.levele?.[0]?.amount ?? 0;
  document.querySelector(".current_level_value").innerHTML = currentLevel;

  const alltransaction = transactionList
    .map((el) => {
      const type = el.object?.type || "Unknown";
      const name = el.object?.name || "Untitled";
      const status = el.progress?.isDone ? "Finished" : "Waiting";
      return `
    <div class="sigle_transaction_contaner">
      <div class="type_transaction">${type} -> ${name}</div>
      <div class="transaction_xp">${el.amount || 0}</div>
      <div class="transaction_time">${status}</div>
    </div>
  `;
    })
    .join("");

  document.querySelector(".main_Transaction").innerHTML = alltransaction;
}
