import GetUserInfoAction from "./actions/userInfroAction.js";
import ProgressAction from "./actions/userProgressAction.js";
import UserTransaction from "./actions/userTransactions.js";
import RenderProfile from "./renderProfile.js";
import RenderProgress from "./renderProgress.js";
import RenderTransaction from "./renderTransactions.js";

export default async function GetUserInfo() {
  const jwt = localStorage.getItem("jwt_token");

  if (!jwt) {
    window.location.href = "#/login";
  }
  const res = await GetUserInfoAction();
  if (!res.success) {
    //Banner
    return;
  }
  localStorage.setItem("user_Id", res.data.user[0].id);

  RenderProfile(res);
 }
