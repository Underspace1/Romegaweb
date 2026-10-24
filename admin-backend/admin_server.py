#!/usr/bin/env python3
"""Small, dependency-free authenticated API for Romega announcements."""

import base64
import hashlib
import hmac
import json
import os
import re
import secrets
import tempfile
import threading
import time
from datetime import datetime
from http.cookies import SimpleCookie
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

HOST = os.environ.get("ROMEGA_ADMIN_HOST", "127.0.0.1")
PORT = int(os.environ.get("ROMEGA_ADMIN_PORT", "8787"))
PASSWORD_HASH = os.environ.get("ROMEGA_ADMIN_PASSWORD_HASH", "")
ANNOUNCEMENTS_FILE = Path(os.environ.get("ROMEGA_ANNOUNCEMENTS_FILE", "/var/www/romega.online/data/annonces.json"))
ALLOWED_HOSTS = {
    host.strip().lower()
    for host in os.environ.get("ROMEGA_ALLOWED_HOSTS", "romega.online,www.romega.online").split(",")
    if host.strip()
}
LOCAL_HOSTS = {"127.0.0.1:8787", "localhost:8787"}
SESSION_TTL = 12 * 60 * 60
MAX_BODY = 64 * 1024
MAX_ANNOUNCEMENTS = 20
SESSIONS = {}
LOGIN_ATTEMPTS = {}
LOCK = threading.RLock()
ID_RE = re.compile(r"^[A-Za-z0-9._-]{1,64}$")
HEX_RE = re.compile(r"^#[0-9A-Fa-f]{6}$")
ROUTES = {"home", "discover", "game", "friends", "history", "settings", "account", "avatar"}
ALLOWED_FIELDS = {
    "id", "title", "text", "badge", "emoji", "colors", "start", "end",
    "query", "placeId", "url", "route", "cta",
}


def make_password_hash(password: str, n: int = 2**14, r: int = 8, p: int = 1) -> str:
    if len(password) < 12:
        raise ValueError("Le mot de passe doit contenir au moins 12 caractères.")
    salt = secrets.token_bytes(16)
    digest = hashlib.scrypt(password.encode(), salt=salt, n=n, r=r, p=p, dklen=64)
    b64 = lambda value: base64.urlsafe_b64encode(value).decode().rstrip("=")
    return f"scrypt${n}${r}${p}${b64(salt)}${b64(digest)}"


def verify_password(password: str, encoded: str) -> bool:
    try:
        algorithm, n, r, p, salt, expected = encoded.split("$", 5)
        if algorithm != "scrypt":
            return False
        decode = lambda value: base64.urlsafe_b64decode(value + "=" * (-len(value) % 4))
        actual = hashlib.scrypt(
            password.encode(), salt=decode(salt), n=int(n), r=int(r), p=int(p), dklen=64
        )
        return hmac.compare_digest(actual, decode(expected))
    except (ValueError, TypeError, MemoryError):
        return False


def valid_date(value: str) -> bool:
    try:
        if re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
            datetime.strptime(value, "%Y-%m-%d")
            return True
        if re.fullmatch(r"\d{2}-\d{2}", value):
            datetime.strptime(f"2000-{value}", "%Y-%m-%d")
            return True
    except ValueError:
        pass
    return False


def validate_announcements(payload):
    if not isinstance(payload, list) or len(payload) > MAX_ANNOUNCEMENTS:
        raise ValueError(f"Une liste de 0 à {MAX_ANNOUNCEMENTS} annonces est requise.")
    cleaned = []
    seen = set()
    for item in payload:
        if not isinstance(item, dict) or any(key not in ALLOWED_FIELDS for key in item):
            raise ValueError("Une annonce contient un champ inconnu ou un format invalide.")
        result = {}
        for key in ("id", "title"):
            value = item.get(key)
            if not isinstance(value, str) or not value.strip():
                raise ValueError("Chaque annonce doit avoir un identifiant et un titre.")
            result[key] = value.strip()
        if not ID_RE.fullmatch(result["id"]) or result["id"] in seen:
            raise ValueError("Les identifiants doivent être uniques et utiliser seulement lettres, chiffres, . _ -.")
        seen.add(result["id"])
        if len(result["title"]) > 120:
            raise ValueError("Le titre est limité à 120 caractères.")
        limits = {"text": 1200, "badge": 60, "emoji": 16, "query": 120, "url": 500, "cta": 80}
        for key, limit in limits.items():
            value = item.get(key)
            if value is None:
                continue
            if not isinstance(value, str) or len(value) > limit:
                raise ValueError(f"Le champ {key} est invalide ou trop long.")
            if value.strip():
                result[key] = value.strip()
        for key in ("start", "end"):
            value = item.get(key)
            if value is not None:
                if not isinstance(value, str) or not valid_date(value):
                    raise ValueError(f"La date {key} doit être au format AAAA-MM-JJ ou MM-JJ.")
                result[key] = value
        colors = item.get("colors")
        if colors is not None:
            if not isinstance(colors, list) or len(colors) != 3 or any(not isinstance(c, str) or not HEX_RE.fullmatch(c) for c in colors):
                raise ValueError("Les trois couleurs doivent être au format #RRGGBB.")
            result["colors"] = [c.upper() for c in colors]
        place_id = item.get("placeId")
        if place_id is not None:
            if isinstance(place_id, bool) or not isinstance(place_id, int) or not 0 < place_id <= 2**63 - 1:
                raise ValueError("Le placeId doit être un nombre entier positif.")
            result["placeId"] = place_id
        route = item.get("route")
        if route is not None:
            if route not in ROUTES:
                raise ValueError("La route Romega est inconnue.")
            result["route"] = route
        url = result.get("url")
        if url:
            parsed = urlsplit(url)
            host = (parsed.hostname or "").lower()
            if parsed.scheme != "https" or not host or not (host == "roblox.com" or host.endswith(".roblox.com")):
                raise ValueError("Le lien doit être une URL HTTPS sur roblox.com.")
        cleaned.append(result)
    return cleaned


def load_announcements():
    if not ANNOUNCEMENTS_FILE.exists():
        return []
    with ANNOUNCEMENTS_FILE.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def save_announcements(announcements):
    ANNOUNCEMENTS_FILE.parent.mkdir(parents=True, exist_ok=True)
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(
            "w", encoding="utf-8", dir=ANNOUNCEMENTS_FILE.parent,
            prefix=".annonces-", suffix=".tmp", delete=False,
        ) as handle:
            temporary = Path(handle.name)
            json.dump(announcements, handle, ensure_ascii=False, indent=2)
            handle.write("\n")
            handle.flush()
            os.fsync(handle.fileno())
        os.chmod(temporary, 0o644)
        os.replace(temporary, ANNOUNCEMENTS_FILE)
    finally:
        if temporary and temporary.exists():
            temporary.unlink()


class AdminHandler(BaseHTTPRequestHandler):
    server_version = "RomegaAdmin/1.0"
    sys_version = ""

    def log_message(self, fmt, *args):
        # Keep standard access logs, which never include request bodies or passwords.
        super().log_message(fmt, *args)

    def _send(self, status, payload, cookie=None):
        body = json.dumps(payload, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'")
        self.send_header("Referrer-Policy", "no-referrer")
        if cookie:
            self.send_header("Set-Cookie", cookie)
        self.end_headers()
        self.wfile.write(body)

    def _request_valid(self):
        host = self.headers.get("Host", "").lower()
        if host not in ALLOWED_HOSTS | LOCAL_HOSTS:
            self._send(400, {"error": "Hôte invalide."})
            return False
        origin = self.headers.get("Origin")
        if origin:
            scheme = "http" if host in LOCAL_HOSTS else "https"
            if origin.rstrip("/") != f"{scheme}://{host}":
                self._send(403, {"error": "Origine refusée."})
                return False
        return True

    def _read_json(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            raise ValueError("Longueur de requête invalide.")
        if length <= 0 or length > MAX_BODY:
            raise ValueError("Requête vide ou trop volumineuse.")
        if self.headers.get("Content-Type", "").split(";", 1)[0].strip() != "application/json":
            raise ValueError("Le format JSON est requis.")
        return json.loads(self.rfile.read(length).decode("utf-8"))

    def _client_ip(self):
        forwarded = self.headers.get("X-Forwarded-For", "")
        return forwarded.split(",", 1)[0].strip() if forwarded else self.client_address[0]

    def _login_allowed(self):
        now = time.time()
        ip = self._client_ip()
        with LOCK:
            attempts = [stamp for stamp in LOGIN_ATTEMPTS.get(ip, []) if now - stamp < 900]
            LOGIN_ATTEMPTS[ip] = attempts
            return len(attempts) < 5

    def _record_login_failure(self):
        now = time.time()
        with LOCK:
            LOGIN_ATTEMPTS.setdefault(self._client_ip(), []).append(now)

    def _token(self):
        cookie = SimpleCookie()
        try:
            cookie.load(self.headers.get("Cookie", ""))
        except Exception:
            return None
        morsel = cookie.get("romega_admin_session")
        if not morsel:
            return None
        token = morsel.value
        with LOCK:
            expiry = SESSIONS.get(token)
            if not expiry or expiry < time.time():
                SESSIONS.pop(token, None)
                return None
        return token

    def _require_auth(self):
        token = self._token()
        if not token:
            self._send(401, {"error": "Connexion requise."})
            return None
        return token

    def do_GET(self):
        if not self._request_valid():
            return
        path = urlsplit(self.path).path
        if path == "/admin/api/session":
            if not self._require_auth():
                return
            self._send(200, {"authenticated": True})
        elif path == "/admin/api/announcements":
            if not self._require_auth():
                return
            try:
                with LOCK:
                    data = load_announcements()
                self._send(200, {"announcements": data})
            except (OSError, ValueError, json.JSONDecodeError):
                self._send(500, {"error": "Impossible de lire les annonces."})
        else:
            self._send(404, {"error": "Route inconnue."})

    def do_POST(self):
        if not self._request_valid():
            return
        path = urlsplit(self.path).path
        if path == "/admin/api/login":
            if not self._login_allowed():
                self._send(429, {"error": "Trop de tentatives. Réessaie dans 15 minutes."})
                return
            try:
                payload = self._read_json()
            except (ValueError, UnicodeDecodeError, json.JSONDecodeError) as error:
                self._send(400, {"error": str(error)})
                return
            password = payload.get("password") if isinstance(payload, dict) else None
            if not isinstance(password, str) or len(password) > 256 or not verify_password(password, PASSWORD_HASH):
                self._record_login_failure()
                time.sleep(0.5)
                self._send(401, {"error": "Mot de passe incorrect."})
                return
            token = secrets.token_urlsafe(32)
            with LOCK:
                SESSIONS[token] = time.time() + SESSION_TTL
                LOGIN_ATTEMPTS.pop(self._client_ip(), None)
            cookie = (
                f"romega_admin_session={token}; HttpOnly; Secure; SameSite=Strict; "
                f"Path=/admin/api; Max-Age={SESSION_TTL}"
            )
            self._send(200, {"authenticated": True}, cookie)
        elif path == "/admin/api/logout":
            token = self._token()
            if token:
                with LOCK:
                    SESSIONS.pop(token, None)
            cookie = "romega_admin_session=; HttpOnly; Secure; SameSite=Strict; Path=/admin/api; Max-Age=0"
            self._send(200, {"authenticated": False}, cookie)
        else:
            self._send(404, {"error": "Route inconnue."})

    def do_PUT(self):
        if not self._request_valid():
            return
        if urlsplit(self.path).path != "/admin/api/announcements":
            self._send(404, {"error": "Route inconnue."})
            return
        if not self._require_auth():
            return
        if self.headers.get("X-Romega-Admin") != "1":
            self._send(403, {"error": "En-tête de protection manquant."})
            return
        try:
            payload = self._read_json()
            announcements = validate_announcements(payload.get("announcements") if isinstance(payload, dict) else None)
            with LOCK:
                save_announcements(announcements)
            self._send(200, {"ok": True, "announcements": announcements})
        except (ValueError, UnicodeDecodeError, json.JSONDecodeError) as error:
            self._send(400, {"error": str(error)})
        except OSError:
            self._send(500, {"error": "Impossible d’enregistrer les annonces."})


if __name__ == "__main__":
    if not PASSWORD_HASH:
        raise SystemExit("ROMEGA_ADMIN_PASSWORD_HASH est absent. Lance d’abord set_admin_password.py.")
    server = ThreadingHTTPServer((HOST, PORT), AdminHandler)
    server.daemon_threads = True
    print(f"Administration Romega sur http://{HOST}:{PORT}", flush=True)
    server.serve_forever()
