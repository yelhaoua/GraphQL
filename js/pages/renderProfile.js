export default async function RenderProfile(res) {
  const html = await fetch("../../templates/userInfo.html").then((res) =>
    res.text(),
  );
  console.log(html);

  document.querySelector(".dataSection").innerHTML = html;
  document.querySelector(".user_image").src = res.data.user[0].avatarUrl;
  document.querySelector(".user_login").innerHTML =
    res.data.user[0].firstName + " " + res.data.user[0].lastName;
  document.querySelector(".profile_Image").src = res.data.user[0].avatarUrl;

  document.querySelector(".user_fullname").innerHTML =
    res.data.user[0].firstName + " " + res.data.user[0].lastName;
  document.querySelector(".user_email").innerHTML = res.data.user[0].email;
  document.querySelector(".user_login_name").innerHTML = res.data.user[0].login;
  document.querySelector(".user_campus").innerHTML = res.data.user[0].campus;
  document.querySelector(".auditratio").innerHTML = Number(
    res.data.user[0].auditRatio,
  ).toFixed(3);
}
