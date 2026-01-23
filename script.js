// Simple RO/EN toggle + scene backgrounds
const dict = {
  ro: {
    nav_village: "Satul",
    nav_visit: "Vizită",
    nav_credits: "Credite",
    eyebrow_1: "Timiș • Banat",
    title_1: "Singurul sat circular din România",
    lead_1: "Un inel perfect de case, o biserică în centru și liniștea Banatului în jur.",
    cta_1: "Planifică o vizită",
    cta_2: "Ascunde textul",
    scroll_hint: "derulează",
    title_2: "Vizită pe scurt",
    fact_1_k: "Ce vezi",
    fact_1_v: "cercul complet, centrul verde, case șvăbești, biserica",
    fact_2_k: "Cât durează",
    fact_2_v: "30–60 min la pas, ideal la apus",
    fact_3_k: "Regula de aur",
    fact_3_v: "respectă liniștea localnicilor",
    map_link: "Deschide în OpenStreetMap →",
    title_3: "Credite foto",
    credits_text: "Imaginile sunt fotografii reale, folosite cu licențe libere (CC / GFDL). Detalii complete în fișierul CREDITS.md din proiect.",
    footer_note: "Un proiect personal dedicat satului Charlotenburg (Șarlota)."
  },
  en: {
    nav_village: "Village",
    nav_visit: "Visit",
    nav_credits: "Credits",
    eyebrow_1: "Timiș • Banat",
    title_1: "Romania’s only circular village",
    lead_1: "A ring of houses, a church at the center, and the quiet Banat landscape around it.",
    cta_1: "Plan a visit",
    cta_2: "Hide text",
    scroll_hint: "scroll",
    title_2: "Visit essentials",
    fact_1_k: "What to see",
    fact_1_v: "the full circle, the green center, Swabian houses, the church",
    fact_2_k: "How long",
    fact_2_v: "30–60 min walk, best near sunset",
    fact_3_k: "Golden rule",
    fact_3_v: "respect locals’ peace and privacy",
    map_link: "Open in OpenStreetMap →",
    title_3: "Photo credits",
    credits_text: "All visuals are real photographs used under free licenses (CC / GFDL). Full details in CREDITS.md.",
    footer_note: "A personal project dedicated to Charlotenburg (Șarlota)."
  }
};

function setLang(lang){
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(dict[lang] && dict[lang][key]) el.textContent = dict[lang][key];
  });
  document.querySelectorAll(".lang-btn").forEach(b=>{
    const active = b.dataset.lang === lang;
    b.classList.toggle("is-active", active);
    b.setAttribute("aria-pressed", active ? "true" : "false");
  });
  localStorage.setItem("charlotenburg_lang", lang);

  const toggleBtn = document.getElementById("toggle-ui");
  if(toggleBtn){
    const hidden = document.body.classList.contains("ui-hidden");
    toggleBtn.textContent = hidden
      ? (lang === "ro" ? "Arată textul" : "Show text")
      : (lang === "ro" ? "Ascunde textul" : "Hide text");
  }
}

document.querySelectorAll(".lang-btn").forEach(btn=>{
  btn.addEventListener("click", ()=> setLang(btn.dataset.lang));
});

const initial = localStorage.getItem("charlotenburg_lang") || "ro";
setLang(initial);

// apply background images via CSS variable (keeps HTML clean)
document.querySelectorAll(".scene").forEach(scene=>{
  const bg = scene.getAttribute("data-bg");
  scene.style.setProperty("--bg-img", `url('${bg}')`);
});

// hide/show UI text
const toggleBtn = document.getElementById("toggle-ui");
toggleBtn?.addEventListener("click", ()=>{
  const hidden = document.body.classList.toggle("ui-hidden");
  const lang = document.documentElement.lang || "ro";
  toggleBtn.textContent = hidden ? (lang === "ro" ? "Arată textul" : "Show text") : (lang === "ro" ? "Ascunde textul" : "Hide text");
});

// smooth anchor scrolling within the snap container
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",(e)=>{
    const id = a.getAttribute("href");
    if(!id || id.length < 2) return;
    const el = document.querySelector(id);
    if(!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior:"smooth", block:"start"});
  });
});
