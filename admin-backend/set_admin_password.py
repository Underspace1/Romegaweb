#!/usr/bin/env python3
"""Set the Romega administrator password without storing it in plain text."""

import getpass
import os
from pathlib import Path
from admin_server import make_password_hash

OUTPUT = Path("/etc/romega-admin.env")


def main():
    password = getpass.getpass("Nouveau mot de passe administrateur : ")
    confirmation = getpass.getpass("Confirme le mot de passe : ")
    if password != confirmation:
        raise SystemExit("Les mots de passe ne correspondent pas.")
    try:
        encoded = make_password_hash(password)
    except ValueError as error:
        raise SystemExit(str(error)) from error
    content = (
        f"ROMEGA_ADMIN_PASSWORD_HASH={encoded}\n"
        "ROMEGA_ANNOUNCEMENTS_FILE=/var/www/romega.online/data/annonces.json\n"
        "ROMEGA_ALLOWED_HOSTS=romega.online,www.romega.online\n"
    )
    with OUTPUT.open("w", encoding="utf-8") as handle:
        handle.write(content)
    os.chmod(OUTPUT, 0o600)
    print(f"Mot de passe enregistré sous forme d’empreinte dans {OUTPUT}.")


if __name__ == "__main__":
    main()
