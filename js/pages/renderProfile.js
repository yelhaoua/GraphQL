export default function RenderProfile(res) {
  document.querySelector(".user_image").src = res.data.user[0].avatarUrl;
  document.querySelector(".user_login").innerHTML =
    res.data.user[0].firstName + " " + res.data.user[0].lastName;
//   document.querySelector(".user_email").innerHTML = res.data.user[0].email;
//   document.querySelector(".user_login").innerHTML = res.data.user[0].login;
//   document.querySelector(".campus").innerHTML = res.data.user[0].campus;
//   document.querySelector(".auditratio").innerHTML = Number(
//     res.data.user[0].auditRatio,
//   ).toFixed(3);
}
