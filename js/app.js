import LogInPage from "./auth/logIn-page.js";
import HomePage from "./main/home.js";

const Routes = {
  "/": {
    title: "Home",
    desc: "home page",
    template: "../templates/home.html",
    init: HomePage,
  },
  "/login": {
    title: "Login",
    desc: "login page",
    template: "../templates/login.html",
    init: LogInPage,
  },
  404: {
    title: "Page Not Found",
    desc: "Page not Found",
    template: "../templates/home.html",
  },
};

const getPath = () => {
  const hash = window.location.hash.slice(1);
  return hash || "/";
};

const urlLocationHandler = async () => {
  const location = getPath();

  const route = Routes[location] || Routes[404];

  try {
    const html = await fetch(route.template).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status} - Template not found`);
      return res.text();
    });

    document.getElementById("app").innerHTML = html;

    if (typeof route.init === "function") {
      route.init();
    }

    document.title = route.title;
  } catch (err) {
    console.error("Failed to render page route:", err);
  }
};

window.addEventListener("click", (e) => {
  const anchor = e.target.closest("a");
  if (!anchor) return;

  const href = anchor.getAttribute("href");

  if (href && (href.startsWith("#/") || href.startsWith("/"))) {
    e.preventDefault();
    const cleanPath = href.startsWith("#") ? href : `#${href}`;
    window.location.hash = cleanPath;
  }
});

window.addEventListener("hashchange", urlLocationHandler);
window.addEventListener("DOMContentLoaded", urlLocationHandler);
