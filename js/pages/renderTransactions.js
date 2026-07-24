import GetUserInfoAction from "./actions/userInfroAction.js";
import GetUserTransaction from "./actions/userTransactions.js";
import GetUserInfo from "./getUserInfo.js";
import RenderProfile from "./renderProfile.js";

export default async function RenderTransaction() {
  let res = await GetUserInfoAction();
  console.log(res);
  if (!res.success) {
    //Banner
    return;
  }
  console.log(res.data.user[0].id);

  localStorage.setItem("user_Id", res.data.user[0].id);

  RenderProfile(res);
   res = await GetUserTransaction();
  if (!res.success) {
    //Banner
    return;
  }
  res = res.data;
  let totale = 0;
  console.log(res.data.transaction);

  res.data.transaction.map((el) => {
    totale += el.amount;
  });

  totale = totale / 1000;

  console.log(totale);

  const html = await fetch("../../templates/transactionsInfoSection.html").then(
    (res) => res.text(),
  );

  document.querySelector(".dataSection").innerHTML = html;

  document.querySelector(".Totale_xp_value").innerHTML =
    totale >= 1000 ? `${Math.round(totale)} MB` : `${Math.round(totale)} KB`;
  document.querySelector(".Totale_transaction_value").innerHTML =
    res.data.transaction.length;
  console.log(res.data.levele[0].amount, "111111");

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
