
const cfg = window.SRN_CONFIG || {};
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const setText = (s, value) => $$(s).forEach(el => { if (value !== undefined) el.textContent = value; });
const setHref = (s, value) => $$(s).forEach(el => { if (value) el.href = value; });

setText("[data-year]", new Date().getFullYear());
setText("[data-status-label]", cfg.operations?.label);
setText("[data-status-detail]", cfg.operations?.detail);
setText("[data-status-updated]", cfg.operations?.updated);
setText("[data-current-threat]", cfg.operations?.currentThreat);
setText("[data-comms-status]", cfg.operations?.communications);
setText("[data-volunteer-status]", cfg.operations?.volunteerStatus);
setText("[data-equipment-status]", cfg.operations?.equipmentStatus);
setText("[data-fleet-status]", cfg.operations?.fleetStatus);

setText("[data-founder]", cfg.contact?.founder);
setText("[data-founder-title]", cfg.contact?.title);
setText("[data-callsign]", cfg.contact?.callsign);
setText("[data-phone]", cfg.contact?.phoneDisplay);
setText("[data-email]", cfg.contact?.email);
setText("[data-cashtag]", cfg.contact?.cashTag);
setHref("[data-phone-link]", `tel:${cfg.contact?.phoneLink || ""}`);
setHref("[data-email-link]", `mailto:${cfg.contact?.email || ""}`);
setHref("[data-discord-link]", cfg.contact?.discord);
setHref("[data-facebook-link]", cfg.contact?.facebook);
setHref("[data-cashapp-link]", cfg.contact?.cashApp);

setText("[data-brief-id]", cfg.briefing?.id);
setText("[data-brief-title]", cfg.briefing?.title);
setText("[data-brief-issued]", cfg.briefing?.issued);
setText("[data-brief-area]", cfg.briefing?.area);
setText("[data-brief-threat]", cfg.briefing?.threat);
setText("[data-brief-summary]", cfg.briefing?.summary);

setText("[data-donation-mission]", cfg.donation?.mission);
setText("[data-donation-note]", cfg.donation?.note);
const raised = Number(cfg.donation?.raised || 0), goal = Number(cfg.donation?.goal || 0);
setText("[data-raised]", `$${raised.toLocaleString()}`);
setText("[data-goal]", `$${goal.toLocaleString()}`);
const pct = goal > 0 ? Math.min(100, Math.round(raised / goal * 100)) : 0;
$$("[data-progress]").forEach(el => el.style.width = `${pct}%`);
setText("[data-progress-percent]", `${pct}%`);

Object.entries(cfg.statistics || {}).forEach(([key, value]) => setText(`[data-stat="${key}"]`, Number(value).toLocaleString()));

const menu = $(".menu-button"), nav = $(".main-nav");
if (menu && nav) {
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}

async function fetchForecast() {
  const input = $("#weather-location");
  const output = $("#forecast-output");
  if (!input || !output) return;
  const query = input.value.trim();
  if (!query) return;
  output.innerHTML = `<div class="forecast-card">Searching official NWS data…</div>`;
  try {
    const geo = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`, {headers: {"Accept-Language":"en"}});
    const places = await geo.json();
    if (!places.length) throw new Error("Location not found");
    const lat = Number(places[0].lat), lon = Number(places[0].lon);
    const point = await fetch(`https://api.weather.gov/points/${lat.toFixed(4)},${lon.toFixed(4)}`);
    if (!point.ok) throw new Error("NWS forecast unavailable for this location");
    const pointData = await point.json();
    const forecast = await fetch(pointData.properties.forecast);
    const forecastData = await forecast.json();
    const periods = forecastData.properties.periods.slice(0, 6);
    output.innerHTML = periods.map(p => `<article class="forecast-card"><strong>${p.name}: ${p.temperature}°${p.temperatureUnit}</strong><span>${p.shortForecast}</span></article>`).join("");
  } catch (e) {
    output.innerHTML = `<div class="forecast-card"><strong>Unable to load forecast</strong><span>${e.message}. Try a city and state, such as “Stanton, TX.”</span></div>`;
  }
}
const weatherBtn = $("#weather-search-btn");
if (weatherBtn) weatherBtn.addEventListener("click", fetchForecast);
const weatherInput = $("#weather-location");
if (weatherInput) weatherInput.addEventListener("keydown", e => { if (e.key === "Enter") fetchForecast(); });

function initMap() {
  const mapEl = document.getElementById("incident-map");
  if (!mapEl || !window.L) return;
  const map = L.map("incident-map").setView([38.5, -97.5], 4);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);
  (cfg.incidents || []).forEach(i => {
    L.marker([i.lat, i.lon]).addTo(map).bindPopup(`<strong>${i.title}</strong><br>${i.location}<br>Status: ${i.status}<br>${i.summary}`);
  });
}
window.addEventListener("load", initMap);
