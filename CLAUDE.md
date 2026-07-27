# CLAUDE.md — site festival Sauvage (La Petite Sauvagère)

Static one-pager, French, no build step, no dependencies. Deployed on Netlify — **every push to `master` auto-deploys** to https://la-petite-sauvagere-festival.netlify.app.

Project context (roles, budget, decisions, log): Obsidian note `999. 🌳 LIFE/06 Personal Projects/Petite Sauvagère - Festival.md`. Keep its `## Log` updated (dated bullet) after any notable site change.

## Files

- `index.html` — everything content: hero, sections (`#esprit`, `#lieu`, `#venir`, `#bouffe`, `#prevoir`, `#form`), footer
- `style.css` — theme via CSS vars in `:root` (light) + `prefers-color-scheme: dark` block; section/card/form patterns
- `script.js` — fireflies, peeking fox, form reactions; everything gated on `prefers-reduced-motion`
- `assets/` — images (photos go here)

## How to integrate things

**Photos** (replace placeholders): drop image in `assets/`, then in `index.html` swap
`<figure class="photo placeholder"><span>…</span></figure>` →
`<figure class="photo"><img src="assets/piscine.jpg" alt="La piscine"></figure>`.
Compress first (`≤300KB`, e.g. `convert in.jpg -resize 1600x -quality 82 out.jpg`).

**New section**: copy an existing `<section class="section" id="...">` block (alternate `section-alt` for the moss background), `<h2><span class="squiggle">Titre</span> emoji</h2>`. Cards grid (`ul.cards > li.card`) and list styles (`.steps`, `.checklist`) are reusable.

**Form fields**: add inputs inside `<form name="rsvp">`. ⚠️ Netlify snapshots the field list at build — new fields are stored automatically on redeploy, but old submissions won't have them. Never rename `form-name`/`name="rsvp"` (breaks the form's submission history).

**Guest list** (planned): new section fed from Netlify Forms responses (dashboard → Forms → rsvp → CSV export); display first names only.

**Content tone**: French, tutoiement, playful, inclusive (·e). Emojis welcome.

## Don't

- No frameworks/build tools — keep it copy-paste editable for co-organizers.
- Don't break dark mode (`prefers-color-scheme`) or reduced-motion support when adding animations.
- Price IS announced (since 27-07-2026): 3 tiers — solidaire 45€ / petit·e sauvage 55€ / baron·ne 65€+ (`#prix` section, based on cost sheet `~/Documents/LPS/festival/3-Achats&Besoins.xlsx`: total 2270€ / 50 pers ≈ 45.4€). Don't change tier amounts without Corentin (treasurer).
- Payment: Revolut QR (`assets/revolut.jpg`) + `@corentinbel` + IBAN in `#prix` — wire message must be prénom+nom (that's how payments are matched to form entries).

## Verify after changes

```bash
python3 -m http.server 8000   # local render check
```

After push: site auto-deploys (~30s); if form touched, submit a test entry → check Netlify dashboard → Forms → rsvp, then delete it.
