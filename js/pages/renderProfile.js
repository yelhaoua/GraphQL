import GetUserInfoAction from "./actions/userInfroAction.js";
import RenderNavBar from "./renderNavBar.js";

export default async function RenderProfile() {
  await RenderNavBar();

  const id = localStorage.getItem("user_Id");
  if (!id) {
    window.location.href = "#/login";
    return;
  }

  const res = await GetUserInfoAction();
  if (!res.success || !res.data?.user?.length) {
    window.location.href = "#/login";
    return;
  }

  const user = res.data.user[0];
  const html = await fetch("../../templates/userInfo.html").then((res) =>
    res.text(),
  );

  document.querySelector(".dataSection").innerHTML = html;
  document.querySelector(".profile_Image").src = user.avatarUrl || "";
  document.querySelector(".user_fullname").innerHTML =
    `${user.firstName || ""} ${user.lastName || ""}`.trim();
  document.querySelector(".user_email").innerHTML = user.email || "N/A";
  document.querySelector(".user_login_name").innerHTML = user.login || "N/A";
  document.querySelector(".user_campus").innerHTML = user.campus || "N/A";
  document.querySelector(".auditratio").innerHTML = Number(
    user.auditRatio || 0,
  ).toFixed(3);
  document.querySelector(".user_addressCity").innerHTML =
    user.attrs?.addressCity || "N/A";
  document.querySelector(".user_gender").innerHTML =
    user.attrs?.gender || "N/A";
  document.querySelector(".user_tel").innerHTML = user.attrs?.tel || "N/A";
  document.querySelector(".user_scholarLevel").innerHTML =
    user.attrs?.scholarLevel || "N/A";

  const audits = res.data.allAudites?.[0]?.audits_aggregate?.nodes || [];
  let totalFailed = 0;
  let totalSucceeded = 0;

  audits.forEach((el) => {
    if (el.closureType === "failed") {
      totalFailed++;
    }
    if (el.closureType === "succeeded") {
      totalSucceeded++;
    }
  });

  const totalProject = totalFailed + totalSucceeded;
  const failedRate = totalProject
    ? ((totalFailed / totalProject) * 100).toFixed(2)
    : "0.00";
  const succeededRate = totalProject
    ? ((totalSucceeded / totalProject) * 100).toFixed(2)
    : "0.00";

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const greenPart = (circumference * Number(succeededRate)) / 100;

  const svg = `
<svg 
  viewBox="0 0 400 400"
  width="100%"
  height="100%"
  preserveAspectRatio="xMidYMid meet"
>
  <circle
    cx="200"
    cy="200"
    r="${radius}"
    fill="none"
    stroke="red"
    stroke-width="10"
  />
  <circle
    cx="200"
    cy="200"
    r="${radius}"
    fill="none"
    stroke="green"
    stroke-width="10"
    stroke-dasharray="${greenPart} ${circumference - greenPart}"
    stroke-linecap="round"
    transform="rotate(-90 200 200)"
  />
</svg>
`;

  document.querySelector(".raio_circle_Container").innerHTML = svg;

  const totalUp = (res.data.allAudites?.[0]?.totalUp || 0) / 1000000;
  const totalDown = (res.data.allAudites?.[0]?.totalDown || 0) / 1000000;

  document.querySelector(".succeededrate").innerHTML =
    `${Math.round(Number(succeededRate))}%`;
  document.querySelector(".fialerate").innerHTML = `${failedRate}%`;
  document.querySelector(".totaleUpValue").innerHTML = `${
    totalUp >= 1
      ? `${totalUp.toFixed(2)} MB`
      : `${(totalUp * 1000).toFixed(2)} KB`
  }`;
  document.querySelector(".totaleDownValue").innerHTML = `${
    totalDown >= 1
      ? `${totalDown.toFixed(2)} MB`
      : `${(totalDown * 1000).toFixed(2)} KB`
  }`;
}
