// GitHub username used to build the project links. If it is empty, the links stay disabled.
const GITHUB_USER = "Heinernn";

document.getElementById("year").textContent = new Date().getFullYear();

const base = GITHUB_USER ? `https://github.com/${GITHUB_USER}` : null;

document.querySelectorAll("a[data-repo]").forEach(link => {
  if (base) {
    link.href = `${base}/${link.dataset.repo}`;
    link.rel = "noopener";
    link.target = "_blank";
  } else {
    link.textContent = "Code coming soon";
    link.setAttribute("aria-disabled", "true");
    link.removeAttribute("href");
  }
});

const github = document.querySelector("a[data-github]");
if (github) {
  if (base) {
    github.href = base;
    github.rel = "noopener";
  } else {
    github.remove();
  }
}
