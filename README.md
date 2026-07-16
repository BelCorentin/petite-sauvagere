# Sauvage — Festival à La Petite Sauvagère

Site statique du festival (5–6 septembre 2026, Bretagne). Une page en français : infos lieu/accès/esprit/bouffe + formulaire RSVP minimaliste.

## Stack

- HTML/CSS/JS vanilla, aucune dépendance, aucun build.
- Hébergement : **Netlify** — le formulaire utilise [Netlify Forms](https://docs.netlify.com/forms/setup/) (`data-netlify="true"`), les réponses arrivent dans le dashboard Netlify (export CSV possible, notifications email configurables).

## Dev local

```bash
python -m http.server 8000
# → http://localhost:8000
```

Le formulaire ne fonctionne qu'une fois déployé sur Netlify (la détection du form se fait au build).

## Déploiement

```bash
netlify login          # une fois
netlify init           # lier le repo au site
netlify deploy --prod
```

Ou : connecter le repo GitHub dans le dashboard Netlify (deploy auto à chaque push).

## TODO

- [ ] Remplacer les placeholders photos (`.photo.placeholder` dans `index.html`) par les vraies photos (piscine, forêt, maison, orgas)
- [ ] Ajouter la liste des invité·es quand les réponses arrivent
- [ ] Prix indicatif une fois les coûts estimés
