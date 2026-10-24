import unittest

from admin_server import make_password_hash, valid_date, validate_announcements, verify_password


class PasswordTests(unittest.TestCase):
    def test_password_round_trip(self):
        encoded = make_password_hash("un-mot-de-passe-tres-long")
        self.assertTrue(verify_password("un-mot-de-passe-tres-long", encoded))
        self.assertFalse(verify_password("incorrect", encoded))

    def test_short_password_is_rejected(self):
        with self.assertRaises(ValueError):
            make_password_hash("court")


class AnnouncementTests(unittest.TestCase):
    def valid_item(self):
        return {
            "id": "annonce-test",
            "title": "Annonce de test",
            "colors": ["#335FFF", "#8B5CF6", "#0B0B1E"],
            "start": "2026-10-24",
            "end": "12-31",
            "placeId": 123,
            "url": "https://www.roblox.com/games/123",
        }

    def test_valid_announcement(self):
        result = validate_announcements([self.valid_item()])
        self.assertEqual(result[0]["title"], "Annonce de test")

    def test_duplicate_id_is_rejected(self):
        with self.assertRaises(ValueError):
            validate_announcements([self.valid_item(), self.valid_item()])

    def test_unknown_field_is_rejected(self):
        item = self.valid_item()
        item["admin"] = True
        with self.assertRaises(ValueError):
            validate_announcements([item])

    def test_external_url_is_rejected(self):
        item = self.valid_item()
        item["url"] = "https://example.com"
        with self.assertRaises(ValueError):
            validate_announcements([item])

    def test_invalid_date_is_rejected(self):
        self.assertFalse(valid_date("2026-02-30"))
        self.assertTrue(valid_date("02-29"))


if __name__ == "__main__":
    unittest.main()
