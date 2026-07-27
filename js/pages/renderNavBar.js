import GetUserInfoAction from "./actions/userInfroAction.js";

export default async function RenderNavBar() {
  const jwt = localStorage.getItem("jwt_token");

  if (!jwt) {
    window.location.href = "#/login";
    return;
  }

  const res = await GetUserInfoAction();
  if (!res.success || !res.data?.user?.length) {
    localStorage.removeItem("jwt_token");
    window.location.href = "#/login";
    return;
  }

  const user = res.data.user[0];
  localStorage.setItem("user_Id", user.id);

  const userImage = document.querySelector(".user_image");
  const userLogin = document.querySelector(".user_login");

  if (userImage) {
    userImage.src = user.avatarUrl || "";
  }
  if (userLogin) {
    userLogin.innerHTML =
      `${user.firstName || ""} ${user.lastName || ""}`.trim();
  }
}
