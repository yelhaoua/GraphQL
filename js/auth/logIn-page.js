import LogInAction from "./action.js";

export default function LogInPage() {
  const link = document.querySelector(`link[rel="stylesheet"]`);
  link.href = "../../assetes/login.css";
  const logIn = document.getElementById("login_form");
  if (!logIn) {
    console.log("Not form Found");
    return;
  }

  logIn.addEventListener("submit", async (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    data = Object.fromEntries(data.entries());

    const res = await LogInAction(data);
    if (!res.success) {
      console.log("banner", res.message);
      return;
    }
    localStorage.setItem("jwt_token", res.jwt);
    console.log(res, 2);
  });
}
