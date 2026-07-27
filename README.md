# Sauvage — Festival à La Petite Sauvagère

Site statique du festival (5–6 septembre 2026, Bretagne). Une page en français : infos lieu/accès/esprit/bouffe + formulaire RSVP minimaliste.

**Live** : https://la-petite-sauvagere-festival.netlify.app — deploy auto à chaque push sur `master`. Réponses au formulaire : dashboard Netlify → Forms → `rsvp`.

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

## Récupérer les réponses (pour l'équipe orga)

Trois options, de la plus simple à la plus scriptable :

1. **Dashboard Netlify** → site `la-petite-sauvagere-festival` → *Forms* → `rsvp` → bouton **Export CSV**. C'est la source de vérité (inclut qui a choisi quel palier → à croiser avec les virements reçus pour les relances).
2. **Inviter Lucas** comme collaborateur : dashboard Netlify → *Team* → *Members* → invite par email (gratuit en rôle Collaborator). Il voit les réponses sans passer par Corentin.
3. **CLI** (export scriptable) :
   ```bash
   netlify api listFormSubmissions --data '{"form_id": "<id>"}' | jq -r \
     '.[].data | [.nom, .telephone, .venue, .participation, .arrivee, .allergies] | @csv'
   # <id> : netlify api listForms --data '{"site_id": "<site-id>"}'
   ```

Suivi paiements : croiser l'export CSV (colonne `participation`) avec les virements Revolut/banque (message du virement = prénom + nom).

## QR code du site

`assets/qr-site.png` pointe vers l'URL live — à coller dans WhatsApp / imprimer pour partager le site.

## TODO

- [ ] Photo des orgas (dernier placeholder de la grille)
- [ ] Ajouter la liste des invité·es quand les réponses arrivent
