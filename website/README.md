# Site vitrine Romega

Site statique (HTML/CSS/JS, aucune dépendance, aucun tracking).

- **Tester en local** : `npx http-server website -p 5180` puis http://localhost:5180
- **Déployer** : copier le contenu de `website/` dans la racine web du VPS (nginx, Caddy…).
- **Liens de téléchargement** : changer `REPO` en haut de `main.js` (`OWNER/romega`).
  Les boutons pointent vers `releases/latest` ; si l'API GitHub répond, ils pointent
  directement vers le `.exe`, le `.deb` et l'`.AppImage` de la dernière version.
- Police Anton auto-hébergée (`fonts/`, licence SIL OFL).
