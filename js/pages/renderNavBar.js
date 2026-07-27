import GetUserInfoAction from "./actions/userInfroAction.js";

export default async function RenderNavBar() {
  const jwt = localStorage.getItem("jwt_token");

  if (!jwt) {
    window.location.href = "#/login";
    return;
  }
  const res = await GetUserInfoAction();
  localStorage.setItem("user_Id", res.data.user[0].id);
  document.querySelector(".user_image").src = res.data.user[0].avatarUrl;
  document.querySelector(".user_login").innerHTML =
    res.data.user[0].firstName + " " + res.data.user[0].lastName;
}
