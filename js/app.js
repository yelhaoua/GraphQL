import LogInPage from "./auth/logIn-page.js";

window.addEventListener("click", (e) => {
  const anchor = e.target.closest("a");

  if (!anchor) {
    return;
  }

  e.preventDefault();
  urlRoute(anchor);
});

const Routes = {
  "/": {
    title: "home",
    desc: "home page",
    template: "../templates/home.html",
  },
  "/login": {
    title: "lohin",
    desc: "login page",
    template: "../templates/login.html",
    init: LogInPage,
  },
  404: {
    title: "not found",
    desc: "Page not Found",
    template: "../templates/home.html",
  },
};

const urlRoute = (anchor) => {
  const href = anchor.getAttribute("href");

  window.history.pushState({}, "", href);
  urlLocationHandler();
};

const urlLocationHandler = async () => {
  let location = window.location.pathname;

  if (location.length === 0) {
    location = "/";
  }

  const route = Routes[location] || Routes[404];
  console.log(route);

  const html = await fetch(route.template).then((response) => {
    return response.text();
  });

  document.getElementById("app").innerHTML = html;
  if (typeof route.init === "function") {
    route.init();
  }
  document.title = route.title;
};

window.addEventListener("popstate", urlLocationHandler);

window.addEventListener("DOMContentLoaded", urlLocationHandler);
