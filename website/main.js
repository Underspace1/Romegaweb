// Dépôt GitHub de Romega : change cette ligne si le dépôt est déplacé.
const REPO = "Underspace1/Romegaweb";
const RELEASES_URL = `https://github.com/${REPO}/releases/latest`;

// Par défaut, tous les boutons mènent à la page de la dernière version.
const links = document.querySelectorAll("[data-dl]");
links.forEach((a) => {
  a.href = a.dataset.dl === "source" ? `https://github.com/${REPO}` : RELEASES_URL;
});

// Si l'API GitHub répond, on pointe directement vers le bon fichier.
const patterns = { windows: /\.exe$/i, deb: /\.deb$/i, appimage: /\.AppImage$/i };
fetch(`https://api.github.com/repos/${REPO}/releases/latest`)
  .then((r) => (r.ok ? r.json() : Promise.reject()))
  .then(({ assets = [] }) => {
    links.forEach((a) => {
      const re = patterns[a.dataset.dl];
      const asset = re && assets.find((x) => re.test(x.name));
      if (asset) a.href = asset.browser_download_url;
    });
  })
  .catch(() => {});

// Animations d'entrée au scroll.
const targets = document.querySelectorAll(".reveal, .show, .big, .section-title, .mega, .hero-title");
if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
  targets.forEach((el) => el.classList.add("in"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
  targets.forEach((el) => io.observe(el));
}
