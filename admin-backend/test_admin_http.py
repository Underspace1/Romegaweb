import http.client
import json
import os
import tempfile
import threading
import unittest
from pathlib import Path

import admin_server


class AdminHttpTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.old_file = admin_server.ANNOUNCEMENTS_FILE
        self.old_hash = admin_server.PASSWORD_HASH
        admin_server.ANNOUNCEMENTS_FILE = Path(self.temporary.name) / "annonces.json"
        admin_server.PASSWORD_HASH = admin_server.make_password_hash("mot-de-passe-de-test-tres-long")
        with admin_server.LOCK:
            admin_server.SESSIONS.clear()
            admin_server.LOGIN_ATTEMPTS.clear()
        self.server = admin_server.ThreadingHTTPServer(("127.0.0.1", 0), admin_server.AdminHandler)
        self.server.daemon_threads = True
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.port = self.server.server_address[1]

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=2)
        admin_server.ANNOUNCEMENTS_FILE = self.old_file
        admin_server.PASSWORD_HASH = self.old_hash
        self.temporary.cleanup()

    def request(self, method, path, payload=None, cookie=None, protection=False):
        connection = http.client.HTTPConnection("127.0.0.1", self.port, timeout=5)
        headers = {"Host": "127.0.0.1:8787"}
        body = None
        if payload is not None:
            body = json.dumps(payload).encode("utf-8")
            headers["Content-Type"] = "application/json"
        if cookie:
            headers["Cookie"] = cookie
        if protection:
            headers["X-Romega-Admin"] = "1"
        connection.request(method, path, body=body, headers=headers)
        response = connection.getresponse()
        response_body = response.read()
        result = (response.status, dict(response.getheaders()), json.loads(response_body or b"{}"))
        connection.close()
        return result

    def login(self):
        status, headers, payload = self.request(
            "POST", "/admin/api/login", {"password": "mot-de-passe-de-test-tres-long"}
        )
        self.assertEqual(status, 200)
        self.assertTrue(payload["authenticated"])
        return headers["Set-Cookie"].split(";", 1)[0], headers["Set-Cookie"]

    def test_authentication_and_publication_cycle(self):
        status, _, _ = self.request("GET", "/admin/api/session")
        self.assertEqual(status, 401)

        cookie, set_cookie = self.login()
        self.assertIn("HttpOnly", set_cookie)
        self.assertIn("Secure", set_cookie)
        self.assertIn("SameSite=Strict", set_cookie)
        self.assertIn("Path=/admin/api", set_cookie)

        status, _, payload = self.request("GET", "/admin/api/session", cookie=cookie)
        self.assertEqual(status, 200)
        self.assertTrue(payload["authenticated"])

        announcement = {
            "id": "test-http",
            "title": "Annonce publiée",
            "text": "Le cycle complet fonctionne.",
            "colors": ["#335FFF", "#8B5CF6", "#0B0B1E"],
            "route": "discover",
            "cta": "Découvrir",
        }
        status, _, payload = self.request(
            "PUT", "/admin/api/announcements", {"announcements": [announcement]}, cookie=cookie, protection=True
        )
        self.assertEqual(status, 200)
        self.assertTrue(payload["ok"])
        saved = json.loads(admin_server.ANNOUNCEMENTS_FILE.read_text(encoding="utf-8"))
        self.assertEqual(saved[0]["title"], "Annonce publiée")
        if os.name == "posix":
            self.assertEqual(admin_server.ANNOUNCEMENTS_FILE.stat().st_mode & 0o777, 0o644)

        status, _, payload = self.request("POST", "/admin/api/logout", {}, cookie=cookie)
        self.assertEqual(status, 200)
        status, _, _ = self.request("GET", "/admin/api/session", cookie=cookie)
        self.assertEqual(status, 401)

    def test_wrong_password_and_missing_protection_are_rejected(self):
        status, _, _ = self.request("POST", "/admin/api/login", {"password": "incorrect"})
        self.assertEqual(status, 401)
        cookie, _ = self.login()
        status, _, _ = self.request(
            "PUT", "/admin/api/announcements", {"announcements": []}, cookie=cookie, protection=False
        )
        self.assertEqual(status, 403)
        self.assertFalse(admin_server.ANNOUNCEMENTS_FILE.exists())

    def test_invalid_host_is_rejected(self):
        connection = http.client.HTTPConnection("127.0.0.1", self.port, timeout=5)
        connection.request("GET", "/admin/api/session", headers={"Host": "example.com"})
        response = connection.getresponse()
        response.read()
        self.assertEqual(response.status, 400)
        connection.close()


if __name__ == "__main__":
    unittest.main()
