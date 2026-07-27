import GetUserTransaction from "./actions/userTransactions.js";
import RenderNavBar from "./renderNavBar.js";

export default async function RenderTransaction() {
  await RenderNavBar();
  const id = localStorage.getItem("user_Id");
  if (!id) {
    window.location.href = "#/login";
    return;
  }

  let res = await GetUserTransaction(id);
  res = res.data;
  let totale = 0;
  res.data.transaction.map((el) => {
    totale += el.amount;
  });

  totale = totale / 1000;
  const html = await fetch("../../templates/transactionsInfoSection.html").then(
    (res) => res.text(),
  );

  document.querySelector(".dataSection").innerHTML = html;

  document.querySelector(".Totale_xp_value").innerHTML =
    totale >= 1000 ? `${Math.round(totale)} MB` : `${Math.round(totale)} KB`;
  document.querySelector(".Totale_transaction_value").innerHTML =
    res.data.transaction.length;
  document.querySelector(".current_level_value").innerHTML =
    res.data.levele[0].amount;

  let alltransaction = "";
  res.data.transaction.map((el) => {
    alltransaction += `
    <div class="sigle_transaction_contaner">
    <div class="type_transaction">${el.object.type} -> ${el.object.name}</div>
    <div class="transaction_xp">${el.amount}</div>
    <div class="transaction_time">${el.progress ? "Finished" : "Waiting"}</div>
    </div>
  `;
  });

  document.querySelector(".main_Transaction").innerHTML = alltransaction;
}
