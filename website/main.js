// Public release downloads, multilingual interface and scroll animations.
const REPO = "Underspace1/Romegaweb";
const RELEASES_URL = `https://github.com/${REPO}/releases/latest`;

const en = {
  "Romega — le launcher Roblox qui va plus loin":"Romega — the Roblox launcher that goes further","FAQ":"FAQ","TOUT CE QU’IL Y A":"EVERYTHING","Logiciel libre sous licence":"Open-source software licensed under",
  "JOUE EN UN CLIC ✦ CHOISIS TA RÉGION ✦ 188 OPTIONS ✦ FPS DÉBLOQUÉS ✦ CHANGE DE TENUE ✦":"ONE-CLICK LAUNCH ✦ PICK YOUR REGION ✦ 188 OPTIONS ✦ CUSTOM FPS ✦ CHANGE YOUR AVATAR ✦",
  "GRATUIT ✦ OPEN SOURCE ✦ SANS PUB ✦ WINDOWS & LINUX ✦":"FREE ✦ OPEN SOURCE ✦ NO ADS ✦ WINDOWS & LINUX ✦",
  "Aller au contenu":"Skip to content","Romega, accueil":"Romega home","Navigation principale":"Main navigation",
  "Découvrir":"Discover","Fonctionnalités":"Features","Télécharger":"Download","Launcher Roblox · Windows & Linux · Gratuit":"Roblox launcher · Windows & Linux · Free",
  "TON ROBLOX.":"YOUR ROBLOX.","TES RÈGLES.":"YOUR RULES.","Ton Roblox. Tes règles.":"Your Roblox. Your rules.",
  "Lance tes jeux en un clic, choisis ton serveur sur un globe, règle 188 options et débloque tes FPS. Tout dans une seule app.":"Launch games in one click, pick a server region on a 3D globe, configure 188 website enhancements and set your FPS limit — all in one app.",
  "Télécharger pour Windows":"Download for Windows","Linux :":"Linux:","Accueil de Romega : profil, événement d’Halloween et amis en ligne":"Romega home: profile, Halloween event and friends online",
  "JOUE EN UN CLIC ✦ CHOISIS TA RÉGION ✦ 188 OPTIONS ✦ FPS DÉBLOQUÉS ✦ CHANGE DE TENUE ✦ ":"ONE-CLICK LAUNCH ✦ PICK YOUR REGION ✦ 188 OPTIONS ✦ CUSTOM FPS ✦ CHANGE YOUR AVATAR ✦ ",
  "Découvrir Romega":"Discover Romega","CHOISIS":"CHOOSE","TA RÉGION.":"YOUR REGION.",
  "Fais tourner le globe 3D, clique sur une ville et rejoins un serveur proche de chez toi. Moins de ping, plus de parties.":"Spin the 3D globe, select a city and join a nearby server. Romega uses available server information to help you find a lower-latency game.",
  "Globe 3D de sélection de la région du serveur":"3D globe for selecting a server region","CHANGE":"CHANGE","DE TÊTE.":"YOUR LOOK.",
  "Équipe les objets de ton inventaire, change les couleurs et les proportions du corps, passe de R6 à R15 ou alterne tes tenues : l’éditeur complet est intégré à Romega.":"Use the built-in editor to equip owned items, change body colors and proportions, switch R6/R15, wear outfits, or rotate outfits between games.",
  "Page Avatar avec le rendu du personnage et les tenues enregistrées":"Avatar page with character render and saved outfits","188":"188","OPTIONS.":"OPTIONS.",
  "Favoris de jeux, meilleure liste de serveurs, amis en commun… Active ce que tu veux pour roblox.com, directement depuis l’app.":"Game bookmarks, an improved server list, mutual friends and more: these optional enhancements affect roblox.com and are managed directly from Romega.",
  "Page Fonctionnalités avec des interrupteurs par option":"Features page with a toggle for each option","FPS":"FPS","SANS LIMITE.":"YOUR WAY.",
  "Profils Performance, Équilibré, Qualité ou Économie. Limite de FPS, API graphique, éclairage : appliqué à chaque lancement.":"Choose Performance, Balanced, Quality or Battery Saver. Your FPS cap, graphics API and lighting preferences are applied at launch when supported by the Roblox client.",
  "Page Optimisation avec la limite de FPS réglée à 144":"Optimization page with FPS limit set to 144","JOUE EN":"LAUNCH IN","UN CLIC.":"ONE CLICK.",
  "Lance un jeu directement depuis l’app, rejoins un ami en cours de partie ou vise le meilleur ping.":"Launch a game directly from the app, join a friend already playing, or browse servers by region and latency.",
  "Page d’un jeu avec le bouton Jouer, les options de serveur et un ami en partie":"Game page with Play button, server options and a friend in game","À TON":"YOUR OWN","STYLE.":"STYLE.",
  "Classique reste le thème par défaut. Les autres ont chacun leur identité : aurore, grille cyber, profondeurs marines, coucher de soleil, papier Sakura ou nuages légers.":"Classic remains the default. Optional themes have their own visual identity: aurora lights, a cyber grid, ocean depths, sunset, sakura paper or soft clouds.",
  "Choix du thème : Classique, Romega, Aurore, Néon…":"Theme picker: Classic, Romega, Aurora, Neon…","GRATUIT ✦ OPEN SOURCE ✦ SANS PUB ✦ WINDOWS & LINUX ✦ ":"FREE ✦ OPEN SOURCE ✦ NO ADS ✦ WINDOWS & LINUX ✦ ",
  "TOUT CE QU’IL Y A ":"EVERYTHING ","DEDANS.":"INSIDE.","Lancement direct":"Direct launch","Rejoins un jeu depuis l’app, sans passer par le navigateur.":"Join a game from the app without opening your browser.",
  "Globe des serveurs":"Server globe","Choisis la région de ton serveur sur un globe 3D interactif.":"Choose a server region on an interactive 3D globe.",
  "Avatar":"Avatar","Éditeur d’objets et de corps, tenues, R6/R15 et rotation automatique.":"Full item and body editor, saved outfits, R6/R15 and automatic outfit rotation.",
  "Profil enrichi":"Enhanced profile","Plus d’infos sur ton profil et celui de tes amis.":"More information about your profile and your friends.",
  "188 options":"188 options","Des améliorations optionnelles pour roblox.com, réglables depuis l’app.":"Optional roblox.com enhancements, configurable from the app.",
  "Optimisation":"Optimization","Limite de FPS, FastFlags compatibles et profils graphiques prêts à l’emploi.":"Custom FPS limit, supported FastFlags and ready-to-use graphics presets.",
  "Événements":"Events","Les annonces et événements du moment, dès l’accueil.":"Current announcements and events, right on your home screen.",
  "Thèmes":"Themes","Classique par défaut et des thèmes aux identités visuelles vraiment différentes.":"Classic by default, plus visually distinct themes and your accent color.",
  "Discord":"Discord","Rich Presence : tes amis voient à quoi tu joues et te rejoignent.":"Rich Presence shows friends what you are playing and lets them join when available.",
  "Historique":"History","Retrouve tous les jeux auxquels tu as joué.":"Find the games and sessions you launched through Romega.",
  "Windows & Linux":"Windows & Linux","Installateur Windows, paquets .deb et AppImage (via Sober).":"Windows installer, plus .deb and AppImage packages (using Sober on Linux).",
  "Libre":"Open source","Code source ouvert sous licence GPL-3.0.":"Open-source code licensed under GPL-3.0.","QUESTIONS":"QUESTIONS","Romega est-il gratuit ?":"Is Romega free?",
  "Oui, totalement. Romega est un logiciel libre sous licence GPL-3.0 : pas de pub, pas d’abonnement, pas de tracking.":"Yes, completely. Romega is open-source software under GPL-3.0: no ads, no subscription and no tracking.",
  "Est-ce que mon compte est en sécurité ?":"How does Romega handle my account?","Tu te connectes sur la page officielle de roblox.com, dans une fenêtre de l’application. Ton mot de passe est saisi directement chez Roblox.":"You sign in on the official roblox.com page inside an application window. Your password is entered directly with Roblox, not in a Romega form.",
  "Romega modifie-t-il le jeu ?":"Does Romega modify the game?","Non. Romega lance le client Roblox officiel et applique uniquement des réglages de configuration (FPS, graphismes). Rien n’est injecté dans le jeu.":"No. Romega launches the official Roblox client and applies configuration settings such as FPS and graphics. Nothing is injected into the running game.",
  "Windows affiche un avertissement à l’installation, c’est normal ?":"Why can Windows show an installation warning?","Oui, Windows SmartScreen prévient pour les applications encore peu téléchargées. Clique sur « Informations complémentaires » puis « Exécuter quand même ».":"SmartScreen can warn about apps without an established reputation or code-signing certificate. Only continue if you downloaded the installer from the official Romega GitHub releases page.",
  "Ça marche sous Linux ?":"Does it work on Linux?","Oui. Installe le paquet .deb ou l’AppImage : Romega lance Roblox via Sober.":"Yes. Install the .deb or AppImage package: Romega launches Roblox through Sober.",
  "Romega est-il lié à Roblox ?":"Is Romega affiliated with Roblox?","Non. Romega est un projet indépendant, il n’est ni affilié, ni approuvé par Roblox Corporation.":"No. Romega is independent and is neither affiliated with nor endorsed by Roblox Corporation.",
  "PRÊT":"READY","Prêt ?":"Ready?","Télécharger Romega":"Download Romega","Code source":"Source code","Confidentialité":"Privacy","Conditions d’utilisation":"Terms of use",
  "Romega n’est pas affilié à Roblox Corporation. Roblox est une marque de Roblox Corporation.":"Romega is not affiliated with Roblox Corporation. Roblox is a trademark of Roblox Corporation.",
  "Retour à l’accueil":"Back to home","Langue":"Language","Anglais":"English","Français":"French","Espagnol":"Spanish",
};

const es = {
  "Romega — le launcher Roblox qui va plus loin":"Romega — el launcher de Roblox que va más allá","FAQ":"FAQ","TOUT CE QU’IL Y A":"TODO LO QUE","Logiciel libre sous licence":"Software libre bajo licencia",
  "JOUE EN UN CLIC ✦ CHOISIS TA RÉGION ✦ 188 OPTIONS ✦ FPS DÉBLOQUÉS ✦ CHANGE DE TENUE ✦":"INICIO CON UN CLIC ✦ ELIGE TU REGIÓN ✦ 188 OPCIONES ✦ FPS PERSONALIZADOS ✦ CAMBIA TU AVATAR ✦",
  "GRATUIT ✦ OPEN SOURCE ✦ SANS PUB ✦ WINDOWS & LINUX ✦":"GRATIS ✦ CÓDIGO ABIERTO ✦ SIN ANUNCIOS ✦ WINDOWS Y LINUX ✦",
  "Aller au contenu":"Ir al contenido","Romega, accueil":"Inicio de Romega","Navigation principale":"Navegación principal",
  "Découvrir":"Descubrir","Fonctionnalités":"Funciones","Télécharger":"Descargar","Launcher Roblox · Windows & Linux · Gratuit":"Launcher de Roblox · Windows y Linux · Gratis",
  "TON ROBLOX.":"TU ROBLOX.","TES RÈGLES.":"TUS REGLAS.","Ton Roblox. Tes règles.":"Tu Roblox. Tus reglas.",
  "Lance tes jeux en un clic, choisis ton serveur sur un globe, règle 188 options et débloque tes FPS. Tout dans une seule app.":"Inicia juegos con un clic, elige una región en un globo 3D, configura 188 mejoras web y ajusta tu límite de FPS: todo en una sola aplicación.",
  "Télécharger pour Windows":"Descargar para Windows","Linux :":"Linux:","Accueil de Romega : profil, événement d’Halloween et amis en ligne":"Inicio de Romega: perfil, evento de Halloween y amigos en línea",
  "JOUE EN UN CLIC ✦ CHOISIS TA RÉGION ✦ 188 OPTIONS ✦ FPS DÉBLOQUÉS ✦ CHANGE DE TENUE ✦ ":"INICIO CON UN CLIC ✦ ELIGE TU REGIÓN ✦ 188 OPCIONES ✦ FPS PERSONALIZADOS ✦ CAMBIA TU AVATAR ✦ ",
  "Découvrir Romega":"Descubre Romega","CHOISIS":"ELIGE","TA RÉGION.":"TU REGIÓN.",
  "Fais tourner le globe 3D, clique sur une ville et rejoins un serveur proche de chez toi. Moins de ping, plus de parties.":"Gira el globo 3D, selecciona una ciudad y entra en un servidor cercano. Romega usa la información disponible para ayudarte a encontrar partidas con menor latencia.",
  "Globe 3D de sélection de la région du serveur":"Globo 3D para elegir la región del servidor","CHANGE":"CAMBIA","DE TÊTE.":"DE ASPECTO.",
  "Équipe les objets de ton inventaire, change les couleurs et les proportions du corps, passe de R6 à R15 ou alterne tes tenues : l’éditeur complet est intégré à Romega.":"Usa el editor integrado para equipar objetos, cambiar colores y proporciones, alternar R6/R15, usar conjuntos o rotarlos entre partidas.",
  "Page Avatar avec le rendu du personnage et les tenues enregistrées":"Página de avatar con personaje y conjuntos guardados","OPTIONS.":"OPCIONES.",
  "Favoris de jeux, meilleure liste de serveurs, amis en commun… Active ce que tu veux pour roblox.com, directement depuis l’app.":"Marcadores, una lista de servidores mejorada, amigos en común y más: mejoras opcionales para roblox.com gestionadas desde Romega.",
  "Page Fonctionnalités avec des interrupteurs par option":"Página de funciones con interruptores para cada opción","SANS LIMITE.":"A TU MANERA.",
  "Profils Performance, Équilibré, Qualité ou Économie. Limite de FPS, API graphique, éclairage : appliqué à chaque lancement.":"Elige Rendimiento, Equilibrado, Calidad o Ahorro. Tu límite de FPS, API gráfica e iluminación se aplican al iniciar cuando el cliente de Roblox lo permite.",
  "Page Optimisation avec la limite de FPS réglée à 144":"Página de optimización con límite de 144 FPS","JOUE EN":"INICIA CON","UN CLIC.":"UN CLIC.",
  "Lance un jeu directement depuis l’app, rejoins un ami en cours de partie ou vise le meilleur ping.":"Inicia un juego desde la aplicación, únete a un amigo o busca servidores por región y latencia.",
  "Page d’un jeu avec le bouton Jouer, les options de serveur et un ami en partie":"Página de juego con botón Jugar, servidores y un amigo jugando","À TON":"TU PROPIO","STYLE.":"ESTILO.",
  "Classique reste le thème par défaut. Les autres ont chacun leur identité : aurore, grille cyber, profondeurs marines, coucher de soleil, papier Sakura ou nuages légers.":"Clásico sigue siendo el tema predeterminado. Los demás tienen identidad propia: aurora, cuadrícula cyber, océano, atardecer, papel sakura o nubes suaves.",
  "Choix du thème : Classique, Romega, Aurore, Néon…":"Selector de temas: Clásico, Romega, Aurora, Neón…","GRATUIT ✦ OPEN SOURCE ✦ SANS PUB ✦ WINDOWS & LINUX ✦ ":"GRATIS ✦ CÓDIGO ABIERTO ✦ SIN ANUNCIOS ✦ WINDOWS Y LINUX ✦ ",
  "TOUT CE QU’IL Y A ":"TODO LO QUE ","DEDANS.":"INCLUYE.","Lancement direct":"Inicio directo","Rejoins un jeu depuis l’app, sans passer par le navigateur.":"Entra en un juego desde la aplicación sin abrir el navegador.",
  "Globe des serveurs":"Globo de servidores","Choisis la région de ton serveur sur un globe 3D interactif.":"Elige la región del servidor en un globo 3D interactivo.",
  "Éditeur d’objets et de corps, tenues, R6/R15 et rotation automatique.":"Editor de objetos y cuerpo, conjuntos, R6/R15 y rotación automática.",
  "Profil enrichi":"Perfil mejorado","Plus d’infos sur ton profil et celui de tes amis.":"Más información sobre tu perfil y los de tus amigos.",
  "188 options":"188 opciones","Des améliorations optionnelles pour roblox.com, réglables depuis l’app.":"Mejoras opcionales para roblox.com, configurables desde la aplicación.",
  "Optimisation":"Optimización","Limite de FPS, FastFlags compatibles et profils graphiques prêts à l’emploi.":"Límite de FPS personalizado, FastFlags compatibles y perfiles gráficos listos para usar.",
  "Événements":"Eventos","Les annonces et événements du moment, dès l’accueil.":"Anuncios y eventos actuales, directamente en el inicio.",
  "Thèmes":"Temas","Classique par défaut et des thèmes aux identités visuelles vraiment différentes.":"Clásico por defecto, temas visualmente distintos y tu color de acento.",
  "Rich Presence : tes amis voient à quoi tu joues et te rejoignent.":"Rich Presence muestra a qué juegas y permite unirse cuando está disponible.",
  "Historique":"Historial","Retrouve tous les jeux auxquels tu as joué.":"Encuentra los juegos y sesiones que iniciaste con Romega.",
  "Windows & Linux":"Windows y Linux","Installateur Windows, paquets .deb et AppImage (via Sober).":"Instalador de Windows y paquetes .deb y AppImage (con Sober en Linux).",
  "Libre":"Código abierto","Code source ouvert sous licence GPL-3.0.":"Código abierto bajo licencia GPL-3.0.","QUESTIONS":"PREGUNTAS","Romega est-il gratuit ?":"¿Romega es gratis?",
  "Oui, totalement. Romega est un logiciel libre sous licence GPL-3.0 : pas de pub, pas d’abonnement, pas de tracking.":"Sí, totalmente. Romega es software libre bajo GPL-3.0: sin anuncios, suscripción ni rastreo.",
  "Est-ce que mon compte est en sécurité ?":"¿Cómo gestiona Romega mi cuenta?","Tu te connectes sur la page officielle de roblox.com, dans une fenêtre de l’application. Ton mot de passe est saisi directement chez Roblox.":"Inicias sesión en la página oficial de roblox.com dentro de una ventana de la aplicación. Tu contraseña se introduce directamente en Roblox, no en un formulario de Romega.",
  "Romega modifie-t-il le jeu ?":"¿Romega modifica el juego?","Non. Romega lance le client Roblox officiel et applique uniquement des réglages de configuration (FPS, graphismes). Rien n’est injecté dans le jeu.":"No. Romega inicia el cliente oficial y aplica ajustes de configuración como FPS y gráficos. No inyecta nada en el juego.",
  "Windows affiche un avertissement à l’installation, c’est normal ?":"¿Por qué Windows puede mostrar una advertencia?","Oui, Windows SmartScreen prévient pour les applications encore peu téléchargées. Clique sur « Informations complémentaires » puis « Exécuter quand même ».":"SmartScreen puede avisar si una aplicación no tiene reputación establecida o certificado de firma. Continúa solo si descargaste el instalador de la página oficial de versiones de Romega en GitHub.",
  "Ça marche sous Linux ?":"¿Funciona en Linux?","Oui. Installe le paquet .deb ou l’AppImage : Romega lance Roblox via Sober.":"Sí. Instala el paquete .deb o AppImage: Romega inicia Roblox mediante Sober.",
  "Romega est-il lié à Roblox ?":"¿Romega está afiliado a Roblox?","Non. Romega est un projet indépendant, il n’est ni affilié, ni approuvé par Roblox Corporation.":"No. Romega es independiente y no está afiliado ni aprobado por Roblox Corporation.",
  "PRÊT":"LISTO","Prêt ?":"¿Listo?","Télécharger Romega":"Descargar Romega","Code source":"Código fuente","Confidentialité":"Privacidad","Conditions d’utilisation":"Condiciones de uso",
  "Romega n’est pas affilié à Roblox Corporation. Roblox est une marque de Roblox Corporation.":"Romega no está afiliado a Roblox Corporation. Roblox es una marca de Roblox Corporation.",
  "Retour à l’accueil":"Volver al inicio","Langue":"Idioma","Anglais":"Inglés","Français":"Francés","Espagnol":"Español",
};

const dictionaries = { en, es };
const originalTexts = new WeakMap();
const lastTexts = new WeakMap();
const originalAttributes = new WeakMap();

function resolveLanguage(preference) {
  if (["en","fr","es"].includes(preference)) return preference;
  const system = (navigator.language || "en").slice(0,2).toLowerCase();
  return ["fr","es"].includes(system) ? system : "en";
}
function translated(value, language) {
  if (language === "fr") return value;
  const parts = value.match(/^(\s*)(.*?)(\s*)$/s);
  if (!parts) return value;
  return parts[1] + (dictionaries[language][parts[2]] || parts[2]) + parts[3];
}
function translateText(node, language) {
  let source = originalTexts.get(node) ?? node.data;
  const last = lastTexts.get(node);
  if (last !== undefined && node.data !== last && node.data !== source) {
    source = node.data;
    originalTexts.set(node, source);
  } else if (!originalTexts.has(node)) originalTexts.set(node, source);
  const next = translated(source, language);
  if (node.data !== next) node.data = next;
  lastTexts.set(node, next);
}
function translateElement(root, language) {
  root.querySelectorAll?.("*").forEach((element) => {
    ["title","aria-label","placeholder","content"].forEach((attribute) => {
      if (!element.hasAttribute(attribute) || (attribute === "content" && element.tagName !== "META")) return;
      let originals = originalAttributes.get(element);
      if (!originals) { originals = new Map(); originalAttributes.set(element, originals); }
      const source = originals.get(attribute) ?? element.getAttribute(attribute);
      originals.set(attribute, source);
      element.setAttribute(attribute, translated(source, language));
    });
  });
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) translateText(walker.currentNode, language);
}

let savedPreference = "auto";
try { savedPreference = localStorage.getItem("romega.language") || "auto"; } catch (_) {}
let activeLanguage = resolveLanguage(savedPreference);
const picker = document.createElement("label");
picker.className = "language-picker";
picker.innerHTML = `<span class="sr-only">Language</span><select aria-label="Language"><option value="auto">Auto</option><option value="en">English</option><option value="fr">Français</option><option value="es">Español</option></select>`;
const select = picker.querySelector("select");
select.value = savedPreference;
const downloadButton = document.querySelector(".top [data-dl='windows']");
if (downloadButton) document.querySelector(".top").insertBefore(picker, downloadButton);

function applyLanguage() {
  activeLanguage = resolveLanguage(select.value);
  document.documentElement.lang = activeLanguage;
  translateElement(document.body, activeLanguage);
  document.querySelectorAll("title").forEach((node) => translateText(node.firstChild, activeLanguage));
}
select.addEventListener("change", () => {
  try { localStorage.setItem("romega.language", select.value); } catch (_) {}
  applyLanguage();
});
applyLanguage();

const links = document.querySelectorAll("[data-dl]");
links.forEach((a) => { a.href = a.dataset.dl === "source" ? `https://github.com/${REPO}` : RELEASES_URL; });
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

const targets = document.querySelectorAll(".reveal, .show, .big, .section-title, .mega, .hero-title");
if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
  targets.forEach((el) => el.classList.add("in"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
  targets.forEach((el) => io.observe(el));
}
