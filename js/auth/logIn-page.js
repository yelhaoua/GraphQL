import LogInAction from "./action.js";

export default function LogInPage() {
  const jwt = localStorage.getItem("jwt_token");

  if (jwt) {
    window.location.href = "#/";
    return;
  }
  const nav = document.getElementById("nav_links");
  if (nav) {
    nav.innerHTML = "";
  }
  const logIn = document.getElementById("login_form");
  logIn.addEventListener("submit", async (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    data = Object.fromEntries(data.entries());
    const res = await LogInAction(data);
    localStorage.setItem("jwt_token", res.jwt);
    window.location.href = "#/";
  });
}
