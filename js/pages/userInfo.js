import GetUserInfoAction from "./actions/userInfroAction.js";

export default async function UserInfo() {
  console.log("Heloo");

  const html = await fetch("../../templates/userInfoSection.html").then(
    (res) => {
      return res.text();
    },
  );
  console.log(html);

  document.querySelector(".profileSection").innerHTML = html;

  const res = await GetUserInfoAction();
  console.log(res);
  if (!res.success) {
    //Banner
    return;
  }

  console.log(res.data[0].id);

  document.querySelector(".user_image").src = res.data[0].avatarUrl;
}
