import GetUserInfoAction from "./actions/userInfroAction.js";

export default async function RenderNavBar() {
  const res = await GetUserInfoAction();
  if (!res.success) {
    //Banner
    return;
  }
  localStorage.setItem("user_Id", res.data.user[0].id);

  document.querySelector(".user_image").src = res.data.user[0].avatarUrl;
  document.querySelector(".user_login").innerHTML =
    res.data.user[0].firstName + " " + res.data.user[0].lastName;
}
