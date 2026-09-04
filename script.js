// ============ Sauvage — petites animations ============

// Respecte les préférences de mouvement réduit
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Lucioles ----------
// Petites lumières qui dérivent doucement sur toute la page.
if (!reducedMotion) {
  const container = document.getElementById("fireflies");
  const COUNT = 14;

  for (let i = 0; i < COUNT; i++) {
    const f = document.createElement("div");
    f.className = "firefly";
    f.style.left = Math.random() * 100 + "vw";
    f.style.top = Math.random() * 100 + "vh";
    f.style.setProperty("--dx", (Math.random() * 240 - 120) + "px");
    f.style.setProperty("--dy", (Math.random() * 240 - 120) + "px");
    const driftDur = 12 + Math.random() * 18;
    const blinkDur = 2.5 + Math.random() * 3;
    f.style.animationDuration = `${driftDur}s, ${blinkDur}s`;
    f.style.animationDelay = `${-Math.random() * driftDur}s, ${-Math.random() * blinkDur}s`;
    f.style.animationDirection = "alternate, normal";
    container.appendChild(f);
  }
}

// ---------- Bandeau covoit' ----------
// Raccourci vers la feuille covoit'/trains pour celles et ceux qui ont
// déjà répondu au formulaire. Fermable, et ça reste fermé (localStorage).
const covoitBanner = document.getElementById("covoit-banner");
if (covoitBanner) {
  const DISMISS_KEY = "covoit-banner-dismissed";
  let dismissed = false;
  try {
    dismissed = localStorage.getItem(DISMISS_KEY) === "1";
  } catch (e) { /* navigation privée : on affiche, tant pis */ }
  if (!dismissed) covoitBanner.hidden = false;
  document.getElementById("covoit-close").addEventListener("click", () => {
    covoitBanner.hidden = true;
    try { localStorage.setItem(DISMISS_KEY, "1"); } catch (e) {}
  });
}

// ---------- Bandeau programme ----------
// Raccourci vers le programme complet + inscriptions cuisine/vaisselle
// (page interactive). Fermable, et ça reste fermé (localStorage).
const programmeBanner = document.getElementById("programme-banner");
if (programmeBanner) {
  const DISMISS_KEY = "programme-banner-dismissed";
  let dismissed = false;
  try {
    dismissed = localStorage.getItem(DISMISS_KEY) === "1";
  } catch (e) { /* navigation privée : on affiche, tant pis */ }
  if (!dismissed) programmeBanner.hidden = false;
  document.getElementById("programme-close").addEventListener("click", () => {
    programmeBanner.hidden = true;
    try { localStorage.setItem(DISMISS_KEY, "1"); } catch (e) {}
  });
}

// ---------- Renard curieux ----------
// Pointe le bout de son nez quand on approche du formulaire,
// et change de tête une fois le formulaire rempli.
const peeker = document.getElementById("peeker");
const formSection = document.getElementById("form");

if (peeker && formSection && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => peeker.classList.toggle("peek", entry.isIntersecting));
    },
    { threshold: 0.15 }
  );
  observer.observe(formSection);
}

// ---------- Petites réactions du formulaire ----------
const form = document.querySelector(".rsvp");
if (form) {
  // Le renard réagit au choix "tu viens ?"
  form.querySelectorAll('input[name="venue"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      const faces = { oui: "🦊", "peut-etre": "🦉", non: "🦔" };
      peeker.textContent = faces[radio.value] || "🦊";
      peeker.classList.add("peek");
    });
  });
}

// ---------- Titres qui gigotent doucement au survol ----------
document.querySelectorAll(".section h2").forEach((h2) => {
  h2.addEventListener("mouseenter", () => {
    if (reducedMotion) return;
    h2.style.transition = "transform 0.25s ease";
    h2.style.transform = `rotate(${Math.random() > 0.5 ? 1.5 : -2.5}deg) scale(1.03)`;
  });
  h2.addEventListener("mouseleave", () => {
    h2.style.transform = "rotate(-1deg)";
  });
});
