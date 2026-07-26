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
  document.querySelector(".user_addressCity").innerHTML =
    res.data.user[0].attrs.addressCity;
  document.querySelector(".user_gender").innerHTML =
    res.data.user[0].attrs.gender;
  document.querySelector(".user_tel").innerHTML = res.data.user[0].attrs.tel;
  document.querySelector(".user_scholarLevel").innerHTML =
    res.data.user[0].attrs.scholarLevel;

  let TotalFaile = 0;
  let TotaleSucceeded = 0;
  let TotaleProject = 0;
  res.data.allAudites[0].audits_aggregate.nodes.map((el) => {
    if (el.closureType === "failed") {
      TotalFaile++;
    }
    if (el.closureType === "succeeded") {
      TotaleSucceeded++;
    }
    TotaleProject++;
  });

  const FialeRate = ((TotalFaile / TotaleProject) * 100).toFixed(2);
  const SucceededRate = ((TotaleSucceeded / TotaleProject) * 100).toFixed(2);

  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  const greenPart = (circumference * SucceededRate) / 100;

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

  const TotaleUp = res.data.allAudites[0].totalUp / 1000000;

  const TotaleDown = res.data.allAudites[0].totalDown / 1000000;

  document.querySelector(".succeededrate").innerHTML =
    `${Math.round(SucceededRate)}%`;
  document.querySelector(".totaleUpValue").innerHTML = `${
    TotaleUp >= 1 ? ` ${TotaleUp.toFixed(2)} MB` : ` ${TotaleUp.toFixed(2)} KB`
  }`;
  document.querySelector(".totaleDownValue").innerHTML = `${
    TotaleDown >= 1
      ? ` ${TotaleDown.toFixed(2)} MB`
      : ` ${TotaleDown.toFixed(2)} KB`
  }`;
}
