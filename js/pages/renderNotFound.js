export default async function RenderNOtfound() {
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
  const html = await fetch("../../templates/404.html").then((res) =>
    res.text(),
  );

  document.getElementById("app").innerHTML = html;
}
