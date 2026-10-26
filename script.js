/* =====================================================
   TEXTES ET RÉGLAGES — modifiez ici (guillemets à garder)
   ===================================================== */
const T = {
  groom: "Chadrack", bride: "Dorcas", names: "Chadrack & Dorcas",
  seal: "C&D", initials: "C & D", hashtag: "#ChadrackEtDorcas",
  invite: "Vous êtes invités", openBtn: "Ouvrir notre invitation",
  dateShort: "25 · 12 · 2026", dateLong: "Vendredi 25 décembre 2026",
  welcome: "Avec une immense joie, nous vous invitons à partager avec nous le plus beau jour de notre vie.",
  eStory: "Notre histoire", hStory: "Comment tout a commencé",
  eGallery: "Galerie", hGallery: "Nos plus beaux instants",
  eProg: "Le programme", hProg: "Le déroulé de la journée",
  eVenue: "Le lieu", hVenue: "Où nous retrouver",
  venueName: "Salle Baraka", venueAddr: "N°19, Avenue Cosmas Shungu, Lubumbashi",
  routeBtn: "Ouvrir l'itinéraire",
  eDress: "Tenue", hDress: "Code vestimentaire",
  dressText: "Élégance et chaleur : nous vous invitons à porter des tons crème, terracotta ou brun. Merci d'éviter le blanc, réservé à la mariée.",
  eRsvp: "Confirmer ma présence", hRsvp: "Serez-vous des nôtres ?",
  rsvpText: "Votre présence nous ferait un immense plaisir. Merci de nous répondre avant la date limite.",
  rsvpBtn: "Confirmer ma présence", deadline: "Réponse souhaitée avant le 1er décembre 2026",
  thanks: "Merci de faire partie de notre histoire"
};
const TARGET = "2026-12-25T13:00:00+02:00";        // date et heure du compte à rebours (heure de Lubumbashi)
const RSVP_URL = "https://forms.gle/VOTRE-LIEN";   // lien de votre formulaire (Google Forms, etc.)
const MAP_QUERY = "Salle Baraka, 19 Avenue Cosmas Shungu, Lubumbashi, RDC";
const HERO = "photos/couple.jpg";
const PHOTOS = ["photos/photo1.jpg","photos/photo2.jpg","photos/photo3.jpg","photos/photo4.jpg","photos/photo5.jpg"];
const STORY = [
  ["2021", "La rencontre", "Un regard, une conversation qui n'en finit pas : nous avons su que ce n'était pas un hasard."],
  ["2022", "Le premier rendez-vous", "Un simple repas, des rires, et l'envie de se revoir dès le lendemain."],
  ["2025", "La demande en mariage", "Une question, un grand oui, et le début de notre plus belle promesse."]
];
const EVENTS = [
  ["13h00", "Accueil des invités"], ["14h00", "Cérémonie de mariage"], ["16h00", "Séance photos"],
  ["17h30", "Repas et réception"], ["20h00", "Remerciements et clôture"]
];
const COLORS = [["#f6efe4", "Crème"], ["#b4573a", "Terracotta"], ["#3a2218", "Brun profond"]];
/* ===================== FIN DES RÉGLAGES ===================== */

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

$$('[data-t]').forEach(e => e.textContent = T[e.dataset.t]);
$$('.split').forEach(h => h.innerHTML = h.textContent.split(' ').map((w, i) => `<span class="w" style="--i:${i}">${w}</span>`).join(' '));
$('.hero-bg').style.backgroundImage = `url(${HERO})`;
$('#tl').insertAdjacentHTML('beforeend', STORY.map(([d, t, p]) => `<article class="tl-i rv"><span>${d}</span><h3>${t}</h3><p>${p}</p></article>`).join(''));
$('#prog').innerHTML = EVENTS.map(([h, t]) => `<li class="rv"><time>${h}</time><span>${t}</span></li>`).join('');
$('#gal').innerHTML = PHOTOS.map((s, i) => `<div class="rv gw"><figure class="g"><img src="${s}" alt="Chadrack et Dorcas, photo ${i + 1}" loading="lazy"></figure></div>`).join('');
$('#sw').innerHTML = COLORS.map(([c, n]) => `<li><i style="background:${c}"></i>${n}</li>`).join('');
$('#map').src = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
$('#route').href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;
$('#rsvp').href = RSVP_URL;

/* Compte à rebours */
const tgt = new Date(TARGET);
function tick() {
  const s = Math.max(0, Math.floor((tgt - Date.now()) / 1000));
  const v = [s / 86400, s % 86400 / 3600, s % 3600 / 60, s % 60].map(n => String(Math.floor(n)).padStart(2, '0'));
  $$('#count b').forEach((b, i) => b.textContent = v[i]);
}
tick(); setInterval(tick, 1000);

/* Effets au défilement : frise qui se dessine + profondeur de la galerie */
let busy = false;
function fx() {
  busy = false;
  const vh = innerHeight, tl = $('#tl'), r = tl.getBoundingClientRect();
  tl.style.setProperty('--p', reduce ? 1 : Math.min(1, Math.max(0, (vh * .75 - r.top) / r.height)));
  if (reduce) return;
  $$('.g').forEach((g, i) => {
    const b = g.getBoundingClientRect(), d = (b.top + b.height / 2 - vh / 2) / vh;
    g.firstElementChild.style.transform = `translateY(${d * -36}px) scale(1.18)`;
    g.style.transform = `translateY(${d * (i % 2 ? 22 : -22)}px)`;
  });
}
addEventListener('scroll', () => { if (!busy) { busy = true; requestAnimationFrame(fx); } }, { passive: true });
addEventListener('resize', fx); fx();

/* Apparition douce des blocs et des titres */
function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  $$('.rv,.split').forEach(e => io.observe(e));
}

/* Ouverture de l'enveloppe */
const intro = $('#intro');
$('#open').addEventListener('click', e => {
  e.target.disabled = true;
  intro.classList.add('open');
  setTimeout(() => {
    intro.classList.add('done');
    document.body.classList.remove('lock');
    scrollTo(0, 0);
    reveal();
    setTimeout(() => intro.remove(), 1700);
  }, reduce ? 150 : 3500);
});
