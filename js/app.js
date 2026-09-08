import LogInPage from "./auth/logIn-page.js";
import logout from "./auth/logout.js";
import RenderNOtfound from "./pages/renderNotFound.js";
import RenderProfile from "./pages/renderProfile.js";
import RenderProgress from "./pages/renderProgress.js";
import RenderTransaction from "./pages/renderTransactions.js";

const Routes = {
  "/": {
    title: "Profile",
    desc: "profile page",
    template: "../templates/home.html",
    init: RenderProfile,
  },

  "/transaction": {
    title: "Transaction",
    desc: "transaction page",
    template: "../templates/home.html",
    init: RenderTransaction,
  },

  "/login": {
    title: "Login",
    desc: "login page",
    template: "../templates/login.html",
    init: LogInPage,
  },

  "/logout": {
    title: "Logout",
    desc: "logout page",
    template: "../templates/home.html",
    init: logout,
  },

  "/progress": {
    title: "Progress",
    desc: "progress page",
    template: "../templates/home.html",
    init: RenderProgress,
  },

  404: {
    title: "Page Not Found",
    desc: "Page not Found",
    template: "../templates/404.html",
    init: RenderNOtfound,
  },
};

const getPath = () => {
  const hash = window.location.hash.slice(1);
  return hash || "/";
};

async function appendBanner() {
  try {
    const html = await fetch("../templates/banner.html").then((res) => {
      if (!res.ok)
        throw new Error(`HTTP $ {
            res.status
          }

          - Banner template not found`);
      return res.text();
    });

    document.body.insertAdjacentHTML("beforeend", html);

    const banner = document.querySelector(".banner-popup");

    if (banner) {
      window.requestAnimationFrame(() => {
        banner.classList.add("show");
        setTimeout(() => {
          banner.classList.remove("show");
          setTimeout(() => banner.remove(), 300);
        }, 3000);
      });

      banner.querySelector(".banner-close")?.addEventListener("click", () => {
        banner.classList.remove("show");
        setTimeout(() => banner.remove(), 300);
      });
    }
  } catch (err) {
    console.warn("Banner injection failed:", err);
  }
}

const urlLocationHandler = async () => {
  const location = getPath();
  const route = Routes[location] || Routes[404];

  try {
    const html = await fetch(route.template).then((res) => {
      if (!res.ok)
        throw new Error(`HTTP $ {
            res.status
          }

          - Template not found`);
      return res.text();
    });

    document.getElementById("app").innerHTML = html;

    if (typeof route.init === "function") {
      await route.init();
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
  if (!href) return;

  if (href.startsWith("#/")) {
    e.preventDefault();
    window.location.hash = href;
  }

  if (href === "/logout") {
    e.preventDefault();
    window.location.hash = "#/logout";
  }
});

window.addEventListener("hashchange", urlLocationHandler);

window.addEventListener("DOMContentLoaded", async () => {
  await appendBanner();
  await urlLocationHandler();
});
