import GetUserInfoAction from "./actions/userInfroAction.js";
import ProgressAction from "./actions/userProgressAction.js";
import UserTransaction from "./actions/userTransactions.js";
import RenderProfile from "./renderProfile.js";
import RenderProgress from "./renderProgress.js";
import RenderTransaction from "./renderTransactions.js";

export default async function GetUserInfo() {
  const res = await GetUserInfoAction();
  console.log(res);
  if (!res.success) {
    //Banner
    return;
  }
  console.log(res.data.user[0].id);

  localStorage.setItem("user_Id", res.data.user[0].id);

  RenderProfile(res);
  const resTransaction = await UserTransaction(res.data.user[0].id);
  if (!resTransaction.success) {
    return;
  }
  RenderTransaction(resTransaction.data);
  console.log(res.data.user[0].id, 11);

  const resProgress = await ProgressAction(res.data.user[0].id);
  if (!resProgress.success) {
    //Banner
    console.log(resProgress);
    console.log(resTransaction, "1");

    return;
  }
  if (!resProgress.success) {
    //Banner
    console.log(resTransaction, "2");

    return;
  }

  console.log(resProgress);
  RenderProgress(resProgress);
}
