import LogInAction from "./action.js";

export default function LogInPage() {
  const jwt = localStorage.getItem("jwt_token");
  const errorEl = document.getElementById("error_message");

  if (jwt) {
    window.location.href = "#/";
    return;
  }

  const nav = document.getElementById("nav_links");
  if (nav) {
    nav.innerHTML = "";
  }

  const logIn = document.getElementById("login_form");
  if (!logIn) return;

  logIn.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (errorEl) {
      errorEl.textContent = "";
    }

    let data = new FormData(e.target);
    data = Object.fromEntries(data.entries());
    const res = await LogInAction(data);

    if (!res.success) {
      localStorage.removeItem("jwt_token");
      if (errorEl) {
        errorEl.textContent = res.message || "Login failed. Please try again.";
      }
      return;
    }

    localStorage.setItem("jwt_token", res.jwt);
    window.location.href = "#/";
  });
}
