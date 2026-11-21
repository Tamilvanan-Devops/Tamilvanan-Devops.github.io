/* Shared helpers for every design. Requires assets/content.js to be loaded first. */
(() => {
  const P = window.PORTFOLIO;
  const rootMeta = document.querySelector('meta[name="site-root"]');
  const ROOT = rootMeta ? rootMeta.content : "";

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const ICONS = {
    gitops: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M6 8.5v7M8.5 18h7M18 15.5V11a5 5 0 0 0-5-5H8.5"/>',
    k8s: '<path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7z"/><circle cx="12" cy="12" r="3"/><path d="M12 5.5V9M12 15v3.5M6.3 8.7 9.4 10.5M14.6 13.5l3.1 1.8M6.3 15.3l3.1-1.8M14.6 10.5l3.1-1.8"/>',
    deploy: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M17.5 14v7M14 17.5h7"/>',
    iac: '<path d="M8 6 3 12l5 6M16 6l5 6-5 6M14 4l-4 16"/>',
    finops: '<path d="M3 17l5-5 4 4 8-8"/><path d="M14 8h6v6"/>',
    shield: '<path d="M12 2.5 4 6v6c0 4.6 3.4 8.5 8 9.5 4.6-1 8-4.9 8-9.5V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    ci: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',
    obs: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    pen: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4"/>',
    send: '<path d="M21 3 3 10.5l7 2.5 2.5 7z"/><path d="m10 13 4-4"/>',
    ai: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
    cap: '<path d="M2.5 9 12 4.5 21.5 9 12 13.5z"/><path d="M6.5 11v4.5c1.5 1.6 3.4 2.4 5.5 2.4s4-.8 5.5-2.4V11M21.5 9v5.5"/>',
    award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    node: '<path d="M12 3 19.5 7.5v9L12 21l-7.5-4.5v-9z"/><circle cx="12" cy="12" r="2"/>',
    msg: '<rect x="3" y="4" width="13" height="5" rx="1.2"/><rect x="5.5" y="9.5" width="13" height="5" rx="1.2"/><rect x="8" y="15" width="13" height="5" rx="1.2"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5v.01"/>',
    crosshair: '<circle cx="12" cy="12" r="8.5"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    checkc: '<circle cx="12" cy="12" r="9"/><path d="m8 12.3 2.7 2.7L16.2 9.5"/>',
    dollar: '<circle cx="12" cy="12" r="9"/><path d="M14.8 9.2c-.5-1-1.6-1.6-2.8-1.6-1.6 0-2.8.9-2.8 2.1 0 2.8 5.6 1.6 5.6 4.4 0 1.2-1.2 2.1-2.8 2.1-1.3 0-2.4-.6-2.9-1.6M12 6v1.6M12 16.4V18"/>',
  };

  const icon = (name, size = 20) =>
    `<svg class="i i-${name}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

  const logoUrl = (name) => (P.logos[name] ? `${ROOT}assets/icons/${P.logos[name]}` : null);
  const logo = (name, size = 18) => {
    const f = P.logos[name];
    if (!f) return "";
    const inv = (P.darkLogos || []).includes(f) ? ' class="logo-inv"' : "";
    return `<img${inv} src="${logoUrl(name)}" alt="" width="${size}" height="${size}" loading="lazy" onerror="this.remove()">`;
  };

  const chip = (name, cls = "chip") => `<span class="${cls}">${logo(name)}${esc(name)}</span>`;

  const link = (key) => {
    const v = P.profile.links[key];
    if (!v) return "";
    if (key === "resume") return ROOT + v;
    if (key === "email") return `mailto:${v}`;
    return v;
  };

  const asset = (path) => (path ? ROOT + path : "");

  const categories = () => ["All", ...new Set(P.projects.map((p) => p.category))];

  // Adds .is-visible to [data-reveal] elements as they scroll into view.
  const reveal = (selector = "[data-reveal]") => {
    const els = document.querySelectorAll(selector);
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((e) => e.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach((e) => io.observe(e));
  };

  // Highlights nav links whose href matches the section currently in view.
  const scrollSpy = (linkSelector, activeClass = "is-active") => {
    const links = [...document.querySelectorAll(linkSelector)];
    const map = new Map(links.map((l) => [l.getAttribute("href").slice(1), l]));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => l.classList.remove(activeClass));
        map.get(e.target.id)?.classList.add(activeClass);
      }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  };

  window.UI = { P, ROOT, esc, icon, logo, logoUrl, chip, link, asset, categories, reveal, scrollSpy, year: new Date().getFullYear() };
})();
