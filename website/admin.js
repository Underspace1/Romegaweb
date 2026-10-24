"use strict";

const $ = (selector) => document.querySelector(selector);
const screens = {
  boot: $("#boot-screen"),
  login: $("#login-screen"),
  dashboard: $("#dashboard"),
};
const form = $("#announcement-form");
const saveButton = $("#save-button");
const saveState = $("#save-state");
const message = $("#dashboard-message");
const actionType = $("#action-type");
const actionValue = $("#action-value");
const textField = $("#text");
const fields = ["id", "title", "badge", "emoji", "text", "start", "end", "cta", "route"];
let announcements = [];
let selected = -1;
let dirty = false;
let busy = false;

function showScreen(name) {
  Object.entries(screens).forEach(([key, element]) => element.classList.toggle("is-hidden", key !== name));
  $("#logout-button").classList.toggle("is-hidden", name !== "dashboard");
  if (name === "login") {
    $("#password").value = "";
    $("#login-error").textContent = "";
    window.setTimeout(() => $("#password").focus(), 0);
  }
}

async function api(path, options = {}) {
  const response = await fetch(`/admin/api/${path}`, {
    method: options.method || "GET",
    credentials: "same-origin",
    headers: options.body ? { "Content-Type": "application/json", ...(options.headers || {}) } : options.headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  let payload = {};
  try { payload = await response.json(); } catch { /* Réponse non JSON gérée ci-dessous. */ }
  if (!response.ok) {
    const error = new Error(payload.error || `Erreur du serveur (${response.status}).`);
    error.status = response.status;
    throw error;
  }
  return payload;
}

function setMessage(text = "", isError = false) {
  message.textContent = text;
  message.classList.toggle("is-error", isError);
}

function setDirty(value) {
  dirty = value;
  saveButton.disabled = !value || busy;
  saveState.textContent = value ? "Modifications non publiées" : "Toutes les modifications sont enregistrées";
  saveState.classList.toggle("is-dirty", value);
}

function slugify(value) {
  const slug = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
  return slug || "annonce";
}

function uniqueId(title) {
  const base = slugify(title);
  let id = base;
  let number = 2;
  while (announcements.some((item) => item.id === id)) id = `${base}-${number++}`;
  return id;
}

function currentAction(item) {
  if (item.placeId != null) return { type: "placeId", value: String(item.placeId) };
  if (item.query) return { type: "query", value: item.query };
  if (item.route) return { type: "route", value: item.route };
  if (item.url) return { type: "url", value: item.url };
  return { type: "", value: "" };
}

function updateActionFields() {
  const type = actionType.value;
  $("#route-field").classList.toggle("is-hidden", type !== "route");
  $("#action-value-field").classList.toggle("is-hidden", type === "" || type === "route");
  const content = {
    query: ["Recherche de jeux", "Ex. halloween", "Les jeux correspondants seront affichés sur la carte."],
    placeId: ["Identifiant du lieu Roblox", "Ex. 123456789", "Le placeId est le nombre présent dans l’adresse du jeu."],
    url: ["Lien HTTPS Roblox", "https://www.roblox.com/games/…", "Seuls les liens HTTPS vers roblox.com sont acceptés."],
  };
  if (content[type]) {
    $("#action-value-label").textContent = content[type][0];
    actionValue.placeholder = content[type][1];
    $("#action-value-help").textContent = content[type][2];
  }
}

function updatePreview() {
  const colors = [$("#color-1").value, $("#color-2").value, $("#color-3").value];
  $("#color-preview").style.background = `linear-gradient(120deg, ${colors.join(", ")})`;
}

function fillEditor() {
  const hasSelection = selected >= 0 && selected < announcements.length;
  $("#editor-panel").classList.toggle("is-hidden", !hasSelection);
  $("#empty-editor").classList.toggle("is-hidden", hasSelection);
  if (!hasSelection) return;
  const item = announcements[selected];
  fields.forEach((key) => { $(`#${key}`).value = item[key] ?? (key === "route" ? "discover" : ""); });
  const colors = item.colors || ["#335FFF", "#8B5CF6", "#0B0B1E"];
  colors.forEach((color, index) => { $(`#color-${index + 1}`).value = color; });
  const action = currentAction(item);
  actionType.value = action.type;
  actionValue.value = action.type === "route" ? "" : action.value;
  if (action.type === "route") $("#route").value = action.value;
  $("#editor-title").textContent = item.title || "Nouvelle annonce";
  $("#text-count").textContent = String((item.text || "").length);
  updateActionFields();
  updatePreview();
}

function renderList() {
  const list = $("#announcements-list");
  list.replaceChildren();
  announcements.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `announcement-item${index === selected ? " is-active" : ""}`;
    button.setAttribute("aria-label", `Modifier ${item.title || "l’annonce"}`);
    const icon = document.createElement("span");
    icon.className = "announcement-icon";
    icon.style.setProperty("--item-color", (item.colors && item.colors[0]) || "#335FFF");
    icon.textContent = item.emoji || "✦";
    icon.setAttribute("aria-hidden", "true");
    const copy = document.createElement("span");
    copy.className = "announcement-copy";
    const title = document.createElement("strong");
    title.textContent = item.title || "Sans titre";
    const badge = document.createElement("small");
    badge.textContent = item.badge || item.id || "Annonce";
    copy.append(title, badge);
    button.append(icon, copy);
    button.addEventListener("click", () => {
      selected = index;
      renderList();
      fillEditor();
    });
    list.append(button);
  });
  $("#announcement-count").textContent = String(announcements.length);
}

function readEditor() {
  if (selected < 0 || !announcements[selected]) return;
  const item = {};
  fields.forEach((key) => {
    if (key === "route") return;
    const value = $(`#${key}`).value.trim();
    if (value) item[key] = value;
  });
  item.id = $("#id").value.trim();
  item.title = $("#title").value.trim();
  item.colors = [$("#color-1").value, $("#color-2").value, $("#color-3").value];
  const type = actionType.value;
  if (type === "route") item.route = $("#route").value;
  if (type === "query" || type === "url") {
    const value = actionValue.value.trim();
    if (value) item[type] = value;
  }
  if (type === "placeId" && actionValue.value.trim()) item.placeId = Number(actionValue.value.trim());
  announcements[selected] = item;
  $("#editor-title").textContent = item.title || "Nouvelle annonce";
  $("#text-count").textContent = String(textField.value.length);
  updatePreview();
}

function addAnnouncement() {
  if (announcements.length >= 20) {
    setMessage("Tu as atteint la limite de 20 annonces.", true);
    return;
  }
  const item = {
    id: uniqueId("Nouvelle annonce"),
    title: "Nouvelle annonce",
    badge: "Annonce",
    emoji: "✦",
    text: "",
    colors: ["#335FFF", "#8B5CF6", "#0B0B1E"],
  };
  announcements.push(item);
  selected = announcements.length - 1;
  renderList();
  fillEditor();
  setDirty(true);
  setMessage();
  $("#title").focus();
  $("#title").select();
}

async function loadDashboard() {
  try {
    const payload = await api("announcements");
    announcements = Array.isArray(payload.announcements) ? payload.announcements : [];
    selected = announcements.length ? 0 : -1;
    renderList();
    fillEditor();
    setDirty(false);
    setMessage();
    showScreen("dashboard");
  } catch (error) {
    if (error.status === 401) return showScreen("login");
    showScreen("login");
    $("#login-error").textContent = error.message;
  }
}

$("#login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = $("#login-button");
  button.disabled = true;
  button.textContent = "Connexion…";
  $("#login-error").textContent = "";
  try {
    await api("login", { method: "POST", body: { password: $("#password").value } });
    await loadDashboard();
  } catch (error) {
    $("#login-error").textContent = error.message;
    $("#password").select();
  } finally {
    button.disabled = false;
    button.textContent = "Accéder au tableau de bord";
  }
});

$("#logout-button").addEventListener("click", async () => {
  if (dirty && !window.confirm("Quitter sans publier les modifications ?")) return;
  try { await api("logout", { method: "POST", body: {} }); } catch { /* La session locale est fermée dans tous les cas. */ }
  announcements = [];
  selected = -1;
  setDirty(false);
  showScreen("login");
});

form.addEventListener("input", (event) => {
  if (event.target === actionType) return;
  readEditor();
  renderList();
  setDirty(true);
  setMessage();
});
form.addEventListener("change", (event) => {
  if (event.target === actionType) {
    actionValue.value = "";
    updateActionFields();
  }
  readEditor();
  renderList();
  setDirty(true);
});

$("#add-button").addEventListener("click", addAnnouncement);
$("#empty-add-button").addEventListener("click", addAnnouncement);
$("#delete-button").addEventListener("click", () => {
  const item = announcements[selected];
  if (!item || !window.confirm(`Supprimer définitivement « ${item.title || "cette annonce"} » ?`)) return;
  announcements.splice(selected, 1);
  selected = announcements.length ? Math.min(selected, announcements.length - 1) : -1;
  renderList();
  fillEditor();
  setDirty(true);
  setMessage();
});

saveButton.addEventListener("click", async () => {
  readEditor();
  if (!form.reportValidity()) return;
  if (announcements.some((item) => !item.id || !item.title)) {
    setMessage("Chaque annonce doit avoir un identifiant et un titre.", true);
    return;
  }
  busy = true;
  saveButton.disabled = true;
  saveButton.textContent = "Publication…";
  setMessage();
  try {
    const payload = await api("announcements", {
      method: "PUT",
      headers: { "X-Romega-Admin": "1" },
      body: { announcements },
    });
    announcements = payload.announcements;
    selected = announcements.length ? Math.max(0, Math.min(selected, announcements.length - 1)) : -1;
    renderList();
    fillEditor();
    setDirty(false);
    setMessage("Annonces publiées. Elles seront récupérées à la prochaine ouverture du launcher.");
  } catch (error) {
    if (error.status === 401) {
      showScreen("login");
      $("#login-error").textContent = "Ta session a expiré. Reconnecte-toi pour publier.";
    } else {
      setMessage(error.message, true);
    }
  } finally {
    busy = false;
    saveButton.disabled = !dirty;
    saveButton.textContent = "Publier les modifications";
  }
});

window.addEventListener("beforeunload", (event) => {
  if (!dirty) return;
  event.preventDefault();
  event.returnValue = "";
});

(async function init() {
  try {
    await api("session");
    await loadDashboard();
  } catch (error) {
    showScreen("login");
    if (error.status !== 401) $("#login-error").textContent = error.message;
  }
})();
