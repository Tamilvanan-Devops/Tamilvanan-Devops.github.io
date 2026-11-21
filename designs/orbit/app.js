(() => {
  const { P, esc, icon, logo, chip, link, asset, categories, reveal, scrollSpy, year } = window.UI;
  const $ = (id) => document.getElementById(id);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pr = P.profile;
  const contact = P.contact || {};
  const btnLink = (href, label, ic, cls = "btn--ghost") =>
    href ? `<a class="btn ${cls}" href="${esc(href)}"${href.startsWith("mailto:") ? "" : ' target="_blank" rel="noopener"'}>${icon(ic, 18)} ${esc(label)}</a>` : "";

  // Boot overlay: once per session
  const boot = $("boot");
  if (reduce || sessionStorage.getItem("orbit-boot")) boot.remove();
  else {
    sessionStorage.setItem("orbit-boot", "1");
    const done = () => { boot.classList.add("done"); setTimeout(() => boot.remove(), 600); };
    setTimeout(done, 1350);
    boot.addEventListener("click", done);
  }

  // Hero
  $("heroEyebrow").textContent = `${pr.years} years in DevOps & SRE · ${pr.location}`;
  $("heroName").textContent = pr.name;
  const parts = pr.headline.match(/[^.!?]+[.!?]?/g).map((x) => x.trim()).filter(Boolean);
  if (parts.length > 1) {
    $("heroHeadline").innerHTML = `${esc(parts.slice(0, -1).join(" "))}<br><span class="grad">${esc(parts.at(-1))}</span>`;
  } else {
    const words = pr.headline.split(" ");
    $("heroHeadline").innerHTML = `${esc(words.slice(0, -2).join(" "))} <span class="grad">${esc(words.slice(-2).join(" "))}</span>`;
  }
  $("heroTagline").textContent = pr.tagline;
  $("heroCta").innerHTML = `<a class="btn btn--primary" href="#work">View selected work</a><a class="btn btn--ghost" href="#contact">Start a conversation</a>`;
  $("heroStats").innerHTML = P.metrics.slice(0, 4).map((m) => `<div><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join("");
  if (pr.links.resume) {
    $("resumeBtn").href = link("resume");
    $("resumeBtn").innerHTML = `${icon("file", 15)} Resume`;
    $("resumeBtn").hidden = false;
    $("resumeLink").href = link("resume");
    $("resumeLink").hidden = false;
  }

  // Avatar: headshot if configured, otherwise a monogram
  const avatar = $("avatar");
  const mono = `<span class="avatar__mono"><span>${esc(pr.initials)}</span></span>`;
  avatar.innerHTML = (pr.photo ? `<img src="${esc(asset(pr.photo))}" alt="${esc(pr.name)}" width="310" height="310" decoding="async">` : mono) +
    `<span class="avatar__badge"><span class="pulse"></span>Open to talk</span>`;
  avatar.querySelector("img")?.addEventListener("error", (e) => e.target.replaceWith(document.createRange().createContextualFragment(mono)));

  // Typed rotating roles
  const roles = pr.roles?.length ? pr.roles : [pr.role];
  $("rolesSr").textContent = roles.join(", ");
  const typed = $("typed");
  if (reduce) typed.textContent = roles[0];
  else {
    let r = 0, i = 0, deleting = false;
    const step = () => {
      const word = roles[r];
      i += deleting ? -1 : 1;
      typed.textContent = word.slice(0, i);
      let delay = deleting ? 32 : 70;
      if (!deleting && i === word.length) { deleting = true; delay = 1700; }
      else if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
      setTimeout(step, delay);
    };
    step();
  }

  // Marquee (duplicated for seamless loop)
  const tech = P.skills.flatMap((g) => g.items).filter((n) => P.logos[n]);
  const row = tech.map((n) => chip(n, "")).join("");
  $("marquee").innerHTML = row + row;

  // About + principles
  $("aboutBody").innerHTML = pr.about.map((p) => `<p>${esc(p)}</p>`).join("");
  $("quote").textContent = pr.quote;
  $("quoteBy").textContent = `— ${pr.name}, ${pr.role}`;
  const card = (x, i, tag = "article") => `
    <${tag} class="card" data-reveal>
      <div class="card__top"><span class="card__num">${String(i + 1).padStart(2, "0")}</span><span class="card__icon">${icon(x.icon || "node", 18)}</span></div>
      <h4>${esc(x.title)}</h4><p>${esc(x.text)}</p>
    </${tag}>`;
  $("principles").innerHTML = (P.principles || []).map((x, i) => card(x, i, "li")).join("");

  // Impact
  $("metrics").innerHTML = P.metrics.map((m) => `
    <article class="metric" data-reveal><b>${esc(m.value)}</b><h4>${esc(m.label)}</h4><p>${esc(m.detail)}</p></article>`).join("");
  $("focus").innerHTML = P.focus.map((f, i) => card(f, i)).join("");

  // Credentials
  const ed = P.education;
  const certCards = [
    { icon: "cap", code: "B.E.", level: "Degree", color: "#a78bfa", name: ed.degree, issuer: `${ed.school} · ${ed.period}`, text: "Electronics, communication and control systems: the foundation for thinking in signals, feedback loops and systems." },
    ...P.certifications.map((c) => ({ icon: "award", code: "FCC-PY", level: "Certification", color: "#34d399", name: c.name, issuer: `${c.issuer} · ${c.date}`, text: "Python fundamentals, data structures and scripting, which I use daily for automation and analysis tooling.", url: c.url })),
    { icon: "target", code: "CKA", level: "Up next", color: "#f59e0b", name: "Certified Kubernetes Administrator", issuer: "Cloud Native Computing Foundation", text: "Formalising years of production EKS/AKS operations: cluster administration, networking, storage and security.", next: true },
  ];
  $("certs").innerHTML = certCards.map((c) => {
    const tag = c.url ? "a" : "article";
    return `<${tag} class="cert${c.next ? " cert--next" : ""}" style="--c:${c.color}" data-reveal${c.url ? ` href="${esc(c.url)}" target="_blank" rel="noopener"` : ""}>
      <div class="cert__top"><span class="cert__icon">${icon(c.icon, 20)}</span><span class="cert__code">${esc(c.code)}<small>${esc(c.level)}</small></span></div>
      <h4>${esc(c.name)}</h4><p class="cert__issuer">${esc(c.issuer)}</p><p>${esc(c.text)}</p>
    </${tag}>`;
  }).join("");

  // Work: colour-coded domain tabs + themed case study
  const linkButtons = (l = {}) => {
    const html = [btnLink(l.code, "Code", "code"), btnLink(l.writeup, "Write-up", "pen"), btnLink(l.demo, "Live demo", "external")].join("");
    return html ? `<div class="links-row">${html}</div>` : "";
  };
  const DOMAINS = {
    GitOps: { icon: "gitops", c: "#818cf8", c2: "#3ccfff", label: "GitOps delivery" },
    Kubernetes: { icon: "k8s", c: "#38bdf8", c2: "#818cf8", label: "Kubernetes platform" },
    Messaging: { icon: "msg", c: "#c084fc", c2: "#f0abfc", label: "Event messaging" },
    FinOps: { icon: "dollar", c: "#fbbf24", c2: "#fb923c", label: "FinOps & cost" },
    "CI/CD": { icon: "ci", c: "#34d399", c2: "#a3e635", label: "CI/CD & dev experience" },
    IaC: { icon: "iac", c: "#f472b6", c2: "#fb7185", label: "Infrastructure as code" },
    Security: { icon: "shield", c: "#f87171", c2: "#fbbf24", label: "Security & compliance" },
    Observability: { icon: "obs", c: "#a3e635", c2: "#34d399", label: "Observability & portals" },
  };
  const domains = categories().filter((c) => c !== "All");
  let dom = domains[0];
  let pick = 0;
  const workEl = $("work");
  const renderCase = () => {
    const d = DOMAINS[dom] || { icon: "node", c: "#6d8dff", c2: "#3ccfff" };
    const list = P.projects.filter((p) => p.category === dom);
    const p = list[pick] || list[0];
    workEl.style.setProperty("--sc", d.c);
    workEl.style.setProperty("--sc2", d.c2);
    workEl.dispatchEvent(new CustomEvent("themechange", { detail: d }));
    $("picker").style.setProperty("--cc", d.c);
    $("picker").innerHTML = list.length > 1 ? list.map((x, i) =>
      `<button type="button" aria-pressed="${i === pick}" data-i="${i}"><b>${String(i + 1).padStart(2, "0")}</b>${esc(x.title)}</button>`).join("") : "";
    const cols = Math.min(p.impact.length, 3);
    const c = $("case");
    c.style.setProperty("--cc", d.c);
    c.setAttribute("aria-label", p.title);
    c.innerHTML = `
      <header class="case__head">
        <span class="case__icon">${icon(d.icon, 30)}</span>
        <div><p class="case__org">${esc(p.org)}</p><h3>${esc(p.title)}</h3></div>
        <span class="case__cat">${esc(d.label || dom)}</span>
      </header>
      <div class="case__cols">
        <div style="--hc:#fbbf24"><h4>${icon("alert", 16)} The challenge</h4><p>${esc(p.challenge)}</p></div>
        <div style="--hc:#9fb4ff"><h4>${icon("crosshair", 16)} What it does</h4><p>${esc(p.summary)}</p></div>
      </div>
      <div class="case__impact" style="--cols:${cols}">
        <h4 style="--hc:#34d399">${icon("obs", 16)} Impact</h4>
        <ul>${p.impact.slice(0, 3).map((x) => `<li>${icon("checkc", 18)}<span>${esc(x)}</span></li>`).join("")}</ul>
      </div>
      <div class="case__steps">
        <h4 style="--hc:#9fb4ff">${icon("layers", 16)} Implementation</h4>
        <ol>${p.built.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
      </div>
      <div class="case__stack"><span>Tech stack</span>${p.stack.map((t) => chip(t)).join("")}</div>
      ${linkButtons(p.links)}`;
    c.style.animation = "none"; void c.offsetWidth; c.style.animation = "";
  };
  $("tabs").innerHTML = domains.map((c, i) => {
    const d = DOMAINS[c] || { icon: "node", c: "#6d8dff" };
    const n = P.projects.filter((p) => p.category === c).length;
    return `<button class="tab" role="tab" type="button" id="tab-${i}" aria-controls="case" aria-selected="${c === dom}" tabindex="${c === dom ? 0 : -1}" data-dom="${esc(c)}" style="--tc:${d.c}">
      ${icon(d.icon, 18)}<span>${esc(d.label || c)}</span>${n > 1 ? `<span class="tab__n">×${n}</span>` : ""}</button>`;
  }).join("");
  const selectTab = (btn, focus) => {
    dom = btn.dataset.dom; pick = 0;
    $("tabs").querySelectorAll(".tab").forEach((t) => { const on = t === btn; t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1; });
    $("case").setAttribute("aria-labelledby", btn.id);
    if (focus) btn.focus();
    btn.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduce ? "auto" : "smooth" });
    renderCase();
  };
  $("tabs").addEventListener("click", (e) => { const b = e.target.closest(".tab"); if (b) selectTab(b); });
  $("tabs").addEventListener("keydown", (e) => {
    const tabs = [...$("tabs").querySelectorAll(".tab")];
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    selectTab(tabs[(next + tabs.length) % tabs.length], true);
  });
  $("picker").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; pick = Number(b.dataset.i); renderCase(); });
  $("case").setAttribute("aria-labelledby", "tab-0");
  renderCase();

  // Open-source labs (only shown when configured)
  if (P.labs?.length) {
    $("labsWrap").hidden = false;
    $("labs").innerHTML = P.labs.map((l) => `
      <article class="lab" data-reveal>
        <h4>${esc(l.title)}</h4><p>${esc(l.summary)}</p>
        <div class="tags">${(l.stack || []).map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>
        ${linkButtons({ code: l.code, demo: l.demo, writeup: l.writeup })}
      </article>`).join("");
  }

  // Experience: year-by-year journey + detailed roles
  $("journeyIntro").textContent = P.journeyIntro || "";
  $("xpTotal").innerHTML = `<b>${esc(pr.years)} years</b> across ${P.companies} companies`;
  $("journey").innerHTML = (P.journey || []).map((j) => `
    <li class="${j.next ? "next" : ""}" data-reveal><time>${esc(j.year)}</time><h4>${esc(j.title)}</h4><p>${esc(j.text)}</p></li>`).join("");
  const planets = ["earth", "neptune", "mars"];
  const stops = [...P.experience, { role: P.education.degree, company: P.education.school, period: P.education.period, points: [], tags: [], edu: true }];
  $("beam").innerHTML = stops.map((x, i) => {
    const n = stops.length - 1 - i;
    const shown = x.points.slice(0, 2), extra = x.points.slice(2);
    return `
    <li data-reveal>
      <span class="planet planet--${x.edu ? "moon" : planets[i % planets.length]}" aria-hidden="true"></span>
      <article class="xp-card">
        <div class="xp-meta">
          <div><b>${x.edu ? "Launch pad" : `Exp ${String(n).padStart(2, "0")}`}</b>${esc(x.company)}${x.client ? ` · Client: ${esc(x.client.replace(/\s*\(.*\)$/, ""))}` : ""}</div>
          <div class="right">${x.current ? `<span class="badge">Now shipping</span><br>` : ""}${esc(x.period)}${x.duration ? `<span class="dur">${esc(x.duration)}</span>` : ""}</div>
        </div>
        <h3>${esc(x.role)}</h3>
        ${shown.length ? `<ul>${shown.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : `<p class="lead" style="font-size:.95rem;margin:0">Where the systems thinking started: electronics, communication and control.</p>`}
        ${extra.length ? `<ul id="more-${i}" hidden>${extra.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        <button class="more-btn" aria-expanded="false" aria-controls="more-${i}">Show ${extra.length} more outcome${extra.length > 1 ? "s" : ""}</button>` : ""}
        ${x.tags.length ? `<div class="xp-sys"><p>Systems in orbit</p><div>${x.tags.map((t) => chip(t)).join("")}</div></div>` : ""}
      </article>
    </li>`;
  }).join("");
  $("beam").addEventListener("click", (e) => {
    const b = e.target.closest(".more-btn"); if (!b) return;
    const list = $(b.getAttribute("aria-controls"));
    const open = list.hidden;
    list.hidden = !open;
    b.setAttribute("aria-expanded", String(open));
    const n = list.children.length;
    b.textContent = open ? "Show less" : `Show ${n} more outcome${n > 1 ? "s" : ""}`;
  });

  // Stack
  const techCount = P.skills.reduce((n, g) => n + g.items.length, 0);
  $("stackSub").textContent = `${techCount} technologies, organized by capability.`;
  $("skills").innerHTML = P.skills.map((g) => `
    <div class="skill" data-reveal><h4>${esc(g.group)}</h4>
      <ul>${g.items.map((n) => `<li>${logo(n, 16) || icon("node", 16)}<span title="${esc(n)}">${esc(n)}</span></li>`).join("")}</ul>
    </div>`).join("");

  // Contact
  $("available").textContent = `${pr.available}: GitOps, Kubernetes, platform engineering and cloud cost.`;
  $("talk").innerHTML = (contact.talkAbout || []).map((t) => `<li>${icon("check", 14)}${esc(t)}</li>`).join("");
  $("contactLinks").innerHTML = [
    btnLink(link("email"), "Say hello", "mail", "btn--light"),
    btnLink(link("linkedin"), "LinkedIn", "linkedin", pr.links.email ? "btn--ghost" : "btn--primary"),
    btnLink(link("github"), "GitHub", "github"),
  ].join("");

  const form = $("contactForm");
  if (contact.formEndpoint) {
    form.hidden = false;
    $("formBtn").innerHTML = `${icon("send", 18)} Send message`;
    const status = $("formStatus");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll("[required]").forEach((f) => {
        const ok = f.checkValidity();
        f.setAttribute("aria-invalid", String(!ok));
        valid &&= ok;
      });
      status.className = "form__status";
      if (!valid) { status.textContent = "Please fill in your name, a valid email and a message."; status.classList.add("err"); return; }
      const data = Object.fromEntries(new FormData(form));
      if (data._gotcha) return;
      const btn = $("formBtn");
      btn.disabled = true;
      status.textContent = "Sending…";
      try {
        const res = await fetch(contact.formEndpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        status.textContent = "Thanks! Your message is on its way. I'll reply soon.";
        status.classList.add("ok");
      } catch {
        status.textContent = "Something went wrong. Please reach out on LinkedIn instead.";
        status.classList.add("err");
      } finally {
        btn.disabled = false;
      }
    });
  }

  $("social").innerHTML = [
    ["linkedin", "LinkedIn", "linkedin"], ["github", "GitHub", "github"], ["blog", "Blog", "pen"], ["email", "Email", "mail"],
  ].filter(([k]) => pr.links[k]).map(([k, label, ic]) =>
    `<a href="${esc(link(k))}" aria-label="${label}"${k === "email" ? "" : ' target="_blank" rel="noopener"'}>${icon(ic, 18)}</a>`).join("");
  $("footer").textContent = `© ${year} ${pr.name} · Built with HTML, CSS & JS · Hosted on GitHub Pages · Domain via Cloudflare`;

  // Header photo + profile card
  const photo = pr.photo ? asset(pr.photo) : "";
  const nowRole = P.experience[0];
  for (const [img, name, role] of [["navMeImg", "navMeName", "navMeRole"], ["menuMeImg", "menuMeName", "menuMeRole"]]) {
    if (photo) $(img).src = photo; else $(img).remove();
    $(name).textContent = pr.name;
    $(role).textContent = `${pr.role.split(" / ")[0]} · ${pr.years} yrs`;
  }
  const crew = $("crew");
  $("crewClose").innerHTML = icon("close", 16);
  $("crewImg").src = photo || "";
  $("crewImg").alt = pr.name;
  $("crewId").textContent = `Crew ID · TV-2017 · Platform engineering`;
  $("crewName").textContent = pr.name;
  $("crewRole").textContent = `${nowRole.role} @ ${nowRole.company}`;
  $("crewStats").innerHTML = [
    ["Experience", `${pr.years} years`], ["Based in", pr.location],
    ["Companies", P.experience.map((x) => x.company).filter((v, i, a) => a.indexOf(v) === i).join(" · ")], ["Orbit", "GitOps · Kubernetes · FinOps"],
  ].map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
  $("crewStatus").textContent = pr.available;
  $("crewLinks").innerHTML = [
    btnLink(link("linkedin"), "LinkedIn", "linkedin", "btn--primary"),
    btnLink(link("email"), "Email", "mail"),
    btnLink(link("github"), "GitHub", "github"),
  ].join("");
  const openCrew = () => { if (!crew.open) crew.showModal(); };
  for (const id of ["navMe", "menuMe", "avatar"]) $(id).addEventListener("click", openCrew);
  $("avatar").setAttribute("role", "button");
  $("avatar").setAttribute("tabindex", "0");
  $("avatar").setAttribute("aria-label", "Open profile card");
  $("avatar").addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openCrew(); } });
  $("crewClose").addEventListener("click", () => crew.close());
  crew.addEventListener("click", (e) => { if (e.target === crew) crew.close(); });

  // Live section label in the header
  const navSection = $("navSection");
  const sectionLinks = [...document.querySelectorAll("#navLinks a")];
  let activeSection = null;
  // Header accents follow the colour of the section in view (Work changes with the selected domain).
  const paintNav = () => {
    if (!activeSection) return;
    const cs = activeSection.style.getPropertyValue("--sc") ? activeSection.style : getComputedStyle(activeSection);
    $("nav").style.setProperty("--nc", cs.getPropertyValue("--sc").trim() || "#6d8dff");
    $("nav").style.setProperty("--nc2", cs.getPropertyValue("--sc2").trim() || "#3ccfff");
  };
  $("work").addEventListener("themechange", (e) => {
    if (activeSection !== $("work")) return;
    $("nav").style.setProperty("--nc", e.detail.c);
    $("nav").style.setProperty("--nc2", e.detail.c2);
  });
  const sectionObs = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const i = sectionLinks.findIndex((a) => a.getAttribute("href") === `#${e.target.id}`);
    navSection.innerHTML = i < 0 ? "" : `<b>${String(i + 1).padStart(2, "0")}</b> / ${esc(sectionLinks[i].textContent)}`;
    activeSection = e.target;
    paintNav();
  }), { rootMargin: "-45% 0px -50% 0px" });
  ["hero", ...sectionLinks.map((a) => a.getAttribute("href").slice(1))].forEach((id) => $(id) && sectionObs.observe($(id)));

  // Nav
  const nav = $("nav"), bar = $("progressBar"), toTop = $("toTop"), ring = $("toTopRing");
  const heroEl = $("hero");
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    const r = max > 0 ? Math.min(scrollY / max, 1) : 0;
    nav.classList.toggle("scrolled", scrollY > 30);
    const past = scrollY > heroEl.offsetHeight - 120;
    nav.classList.toggle("past-hero", past);
    $("navMe").tabIndex = past ? 0 : -1;
    bar.style.transform = `scaleX(${r})`;
    ring.style.strokeDashoffset = String(100 - r * 100);
    toTop.classList.toggle("show", scrollY > innerHeight * .6);
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();
  toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
  const burger = $("burger"), links = $("navLinks");
  burger.addEventListener("click", () => { const o = links.classList.toggle("open"); burger.setAttribute("aria-expanded", String(o)); });
  links.addEventListener("click", (e) => { if (e.target.closest("a, .menu-me")) { links.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); } });
  scrollSpy("#navLinks a");
  reveal();

  // Globe orbiting the avatar
  const canvas = $("globe");
  const ctx = canvas.getContext("2d");
  let w, h, cx, cy, R, angle = 0, floorShift = 0, running = !reduce;
  const nodes = [[22, 40], [48, 150], [-12, 250], [-38, 95], [8, 310], [35, 210], [-25, 15]];
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const a = avatar.getBoundingClientRect(), c = canvas.getBoundingClientRect();
    cx = a.left + a.width / 2 - c.left;
    cy = a.top + a.height / 2 - c.top;
    R = (a.width / 2) * 1.6;
  };
  const proj = (lat, lon) => {
    const t = .38, x = R * Math.cos(lat) * Math.sin(lon + angle), y = R * Math.sin(lat), z = R * Math.cos(lat) * Math.cos(lon + angle);
    return { x: cx + x, y: cy - (y * Math.cos(t) - z * Math.sin(t)), z: y * Math.sin(t) + z * Math.cos(t) };
  };
  const rad = (d) => (d * Math.PI) / 180;
  const draw = (time = 0) => {
    ctx.clearRect(0, 0, w, h);
    // Perspective grid floor rolling towards the viewer
    const horizon = h * .7, depth = h - horizon, vx = w / 2;
    ctx.lineWidth = 1;
    for (let i = -24; i <= 24; i++) {
      const xb = vx + i * w * .09;
      const g = ctx.createLinearGradient(0, horizon, 0, h);
      g.addColorStop(0, "rgba(91,140,255,0)"); g.addColorStop(1, "rgba(91,140,255,.32)");
      ctx.strokeStyle = g; ctx.beginPath(); ctx.moveTo(vx + (xb - vx) * .04, horizon); ctx.lineTo(xb, h); ctx.stroke();
    }
    for (let k = 0; k < 18; k++) {
      const z = 1 + ((k + floorShift) % 18) * 1.1;
      const y = horizon + depth / z;
      ctx.globalAlpha = Math.min(1, (y - horizon) / depth * 1.6) * .38;
      ctx.strokeStyle = "#5b8cff"; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    const line = (pts) => { for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; ctx.globalAlpha = .05 + (((a.z + b.z) / 2 + R) / (2 * R)) * .45; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } };
    const grad = ctx.createLinearGradient(cx - R, 0, cx + R, 0); grad.addColorStop(0, "#6d8dff"); grad.addColorStop(1, "#3ccfff");
    ctx.strokeStyle = grad; ctx.lineWidth = 1;
    for (let la = -75; la <= 75; la += 15) { const pts = []; for (let lo = 0; lo <= 360; lo += 5) pts.push(proj(rad(la), rad(lo))); line(pts); }
    for (let lo = 0; lo < 180; lo += 15) { const pts = []; for (let la = 0; la <= 360; la += 5) pts.push(proj(rad(la), rad(lo))); line(pts); }
    const vis = nodes.map(([la, lo]) => proj(rad(la), rad(lo))).filter((p) => p.z > 0);
    ctx.strokeStyle = "rgba(60,207,255,.35)";
    for (let i = 1; i < vis.length; i++) { ctx.globalAlpha = .6; ctx.beginPath(); ctx.moveTo(vis[i - 1].x, vis[i - 1].y); ctx.lineTo(vis[i].x, vis[i].y); ctx.stroke(); }
    ctx.fillStyle = "#3ccfff";
    for (const p of vis) { ctx.globalAlpha = 1; ctx.shadowColor = "#3ccfff"; ctx.shadowBlur = 14; ctx.beginPath(); ctx.arc(p.x, p.y, 2.8, 0, 6.28); ctx.fill(); ctx.shadowBlur = 0; }
    ctx.globalAlpha = 1;
  };
  const loop = (t) => { if (!running) return; angle += .0022; floorShift = (floorShift + .012) % 18; draw(t); requestAnimationFrame(loop); };
  resize(); draw();
  // Layout can shift after web fonts load, which moves the avatar.
  new ResizeObserver(() => { resize(); if (!running) draw(); }).observe(document.getElementById("hero"));
  if (!reduce) {
    new IntersectionObserver(([e]) => { const was = running; running = e.isIntersecting; if (running && !was) requestAnimationFrame(loop); }).observe(canvas);
    requestAnimationFrame(loop);
  }

  // Contact: draggable wireframe planet rising over the horizon
  const pc = $("planet");
  const pctx = pc.getContext("2d");
  let pw, ph, pR, pcx, pcy, rot = 0, vel = 0, dragging = false, lastX = 0, pRunning = false;
  const BASE = reduce ? 0 : 0.0018;
  vel = BASE;
  const lights = Array.from({ length: 110 }, () => [Math.asin(Math.random() * 1.3 - 0.3), Math.random() * Math.PI * 2, Math.random() * 6.28]);
  const orbits = [
    { r: 1.16, sq: .86, phi: -.22, speed: .0045, a: .6, color: "60,207,255" },
    { r: 1.28, sq: .8, phi: .18, speed: -.003, a: 2.4, color: "167,139,250" },
    { r: 1.09, sq: .9, phi: .05, speed: .0065, a: 4.1, color: "245,158,11" },
  ];
  const presize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    pw = pc.clientWidth; ph = pc.clientHeight;
    pc.width = pw * dpr; pc.height = ph * dpr;
    pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    pR = Math.max(pw * 0.62, 430);
    pcx = pw / 2;
    // Rise the horizon just below the contact content.
    const inner = document.querySelector(".contact__inner").getBoundingClientRect(), box = pc.getBoundingClientRect();
    pcy = Math.max(inner.bottom - box.top + 70, ph * .5) + pR;
  };
  const TILT = -.28;
  const pproj = (lat, lon) => {
    const x = pR * Math.cos(lat) * Math.sin(lon + rot), y = pR * Math.sin(lat), z = pR * Math.cos(lat) * Math.cos(lon + rot);
    return { x: pcx + x, y: pcy - (y * Math.cos(TILT) - z * Math.sin(TILT)), z: y * Math.sin(TILT) + z * Math.cos(TILT) };
  };
  const pdraw = (t = 0) => {
    const c = pctx;
    c.clearRect(0, 0, pw, ph);

    // Orbits: far-side arcs pass behind the planet limb
    const orbitPoint = (o, a) => {
      const ex = pR * o.r * Math.cos(a), ey = pR * o.r * o.sq * Math.sin(a);
      return { x: pcx + ex * Math.cos(o.phi) - ey * Math.sin(o.phi), y: pcy + ex * Math.sin(o.phi) + ey * Math.cos(o.phi), far: Math.sin(a) < 0 };
    };
    const hidden = (pt) => pt.far && Math.hypot(pt.x - pcx, pt.y - pcy) < pR;
    for (const o of orbits) {
      c.strokeStyle = `rgba(${o.color},.28)`; c.lineWidth = 1; c.setLineDash([3, 6]);
      c.beginPath(); let pen = false;
      for (let a = 0; a <= Math.PI * 2 + .01; a += .01) {
        const pt = orbitPoint(o, a);
        if (hidden(pt) || pt.y > ph + 20) { pen = false; continue; }
        if (pen) c.lineTo(pt.x, pt.y); else { c.moveTo(pt.x, pt.y); pen = true; }
      }
      c.stroke(); c.setLineDash([]);
    }

    // Atmosphere
    const atm = c.createRadialGradient(pcx, pcy, pR * .96, pcx, pcy, pR * 1.17);
    atm.addColorStop(0, "rgba(109,141,255,.55)"); atm.addColorStop(.22, "rgba(60,207,255,.22)"); atm.addColorStop(1, "rgba(60,207,255,0)");
    c.fillStyle = atm; c.beginPath(); c.arc(pcx, pcy, pR * 1.17, 0, 6.28); c.fill();

    // Body
    const body = c.createRadialGradient(pcx - pR * .25, pcy - pR * .95, pR * .05, pcx, pcy, pR);
    body.addColorStop(0, "#1b2a5c"); body.addColorStop(.35, "#0b1330"); body.addColorStop(1, "#03050c");
    c.fillStyle = body; c.beginPath(); c.arc(pcx, pcy, pR, 0, 6.28); c.fill();

    // Wireframe + cluster lights, clipped to the disc
    c.save(); c.beginPath(); c.arc(pcx, pcy, pR, 0, 6.28); c.clip();
    const grad = c.createLinearGradient(pcx - pR, 0, pcx + pR, 0); grad.addColorStop(0, "#6d8dff"); grad.addColorStop(1, "#3ccfff");
    c.strokeStyle = grad; c.lineWidth = 1;
    const seg = (pts) => { for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; if (a.z < 0 || b.z < 0) continue; c.globalAlpha = .06 + ((a.z + b.z) / (2 * pR)) * .42; c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke(); } };
    const R2D = Math.PI / 180;
    for (let la = -40; la <= 80; la += 8) { const pts = []; for (let lo = 0; lo <= 360; lo += 3) pts.push(pproj(la * R2D, lo * R2D)); seg(pts); }
    for (let lo = 0; lo < 360; lo += 12) { const pts = []; for (let la = -80; la <= 88; la += 3) pts.push(pproj(la * R2D, lo * R2D)); seg(pts); }
    for (const [la, lo, ph0] of lights) {
      const pt = pproj(la, lo); if (pt.z < 0) continue;
      const k = pt.z / pR, pulse = .55 + .45 * Math.sin(t / 700 + ph0);
      c.globalAlpha = k * pulse; c.fillStyle = "#3ccfff"; c.shadowColor = "#3ccfff"; c.shadowBlur = 12;
      c.beginPath(); c.arc(pt.x, pt.y, 1.4 + 1.4 * k, 0, 6.28); c.fill();
    }
    c.shadowBlur = 0; c.restore(); c.globalAlpha = 1;

    // Rim light
    const rim = c.createLinearGradient(0, pcy - pR, 0, pcy - pR * .55);
    rim.addColorStop(0, "rgba(159,180,255,.95)"); rim.addColorStop(1, "rgba(159,180,255,0)");
    c.strokeStyle = rim; c.lineWidth = 2; c.beginPath(); c.arc(pcx, pcy, pR, 0, 6.28); c.stroke();

    // Satellites
    for (const o of orbits) {
      const pt = orbitPoint(o, o.a);
      if (hidden(pt)) continue;
      c.fillStyle = `rgb(${o.color})`; c.shadowColor = `rgb(${o.color})`; c.shadowBlur = 16;
      c.beginPath(); c.arc(pt.x, pt.y, 3.2, 0, 6.28); c.fill(); c.shadowBlur = 0;
    }
  };
  const ploop = (t) => {
    if (!pRunning) return;
    if (!dragging) vel += (BASE - vel) * .02;
    rot += vel;
    if (!reduce) for (const o of orbits) o.a += o.speed;
    pdraw(t);
    requestAnimationFrame(ploop);
  };
  presize(); pdraw();
  new ResizeObserver(() => { presize(); if (!pRunning) pdraw(); }).observe($("contact"));
  pc.addEventListener("pointerdown", (e) => { dragging = true; lastX = e.clientX; pc.setPointerCapture(e.pointerId); pc.classList.add("dragging"); $("dragHint").style.opacity = ".35"; });
  pc.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX; lastX = e.clientX;
    vel = Math.max(-.08, Math.min(.08, dx * .004));
    if (!pRunning) { rot += vel; pdraw(); }
  });
  const endDrag = () => { dragging = false; pc.classList.remove("dragging"); };
  pc.addEventListener("pointerup", endDrag); pc.addEventListener("pointercancel", endDrag);
  if (!reduce) new IntersectionObserver(([e]) => {
    const was = pRunning; pRunning = e.isIntersecting;
    if (pRunning && !was) requestAnimationFrame(ploop);
  }).observe(pc);

  // Section headings decode from scrambled glyphs when they scroll into view
  const GLYPHS = "!<>-_\\/[]{}=+*^?#$%&@0123456789ABCDEFXZ";
  const scramble = (el) => {
    const label = el.textContent.replace(/\s+/g, " ").trim();
    el.setAttribute("aria-label", label);
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) if (walker.currentNode.nodeValue.trim()) nodes.push(walker.currentNode);
    const chars = [], wraps = [];
    for (const n of nodes) {
      const wrap = document.createElement("span");
      wrap.setAttribute("aria-hidden", "true");
      for (const ch of n.nodeValue) {
        const sp = document.createElement("span");
        sp.textContent = ch;
        wrap.appendChild(sp);
        chars.push({ sp, ch });
      }
      wraps.push([wrap, n.nodeValue]);
      n.replaceWith(wrap);
    }
    const dur = Math.min(1600, 500 + chars.length * 30);
    chars.forEach((c, i) => { c.at = (i / chars.length) * dur * .75 + Math.random() * dur * .25; });
    const t0 = performance.now();
    let last = 0;
    const tick = (now) => {
      const t = now - t0;
      const refresh = now - last > 45;
      if (refresh) last = now;
      for (const c of chars) {
        if (c.done || c.ch === " ") continue;
        if (t >= c.at) { c.sp.textContent = c.ch; c.sp.className = ""; c.done = true; }
        else if (refresh) { c.sp.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0]; c.sp.className = ["scr", "scr scr--b", "scr scr--c"][(Math.random() * 3) | 0]; }
      }
      if (t < dur + 30) requestAnimationFrame(tick);
      else { for (const [wrap, text] of wraps) wrap.replaceWith(document.createTextNode(text)); el.removeAttribute("aria-label"); }
    };
    requestAnimationFrame(tick);
  };
  if (!reduce) {
    const scrObs = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { scrObs.unobserve(e.target); scramble(e.target); }
    }), { threshold: .6 });
    document.querySelectorAll("[data-scramble]").forEach((el) => scrObs.observe(el));
  }

  // Helper for section canvases: DPR-aware sizing, resize tracking, and animating only while visible
  const live = (canvas, { setup, frame }) => {
    const c = canvas.getContext("2d");
    const st = { c, w: 0, h: 0, running: false };
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      st.w = canvas.clientWidth; st.h = canvas.clientHeight;
      canvas.width = st.w * dpr; canvas.height = st.h * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      setup(st);
    };
    const loop = (t) => { if (!st.running) return; frame(st, t); requestAnimationFrame(loop); };
    size(); frame(st, 0);
    new ResizeObserver(() => { size(); if (!st.running) frame(st, 0); }).observe(canvas);
    if (!reduce) new IntersectionObserver(([e]) => {
      const was = st.running; st.running = e.isIntersecting;
      if (st.running && !was) requestAnimationFrame(loop);
    }).observe(canvas);
    return st;
  };

  // Global starfield: a 3D field flying towards the viewer. Dense and fast on the first screen
  // ("warp"), easing to a slow drift while reading the sections below. Mouse steers the vanishing point.
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener("pointermove", (e) => { mouse.tx = e.clientX / innerWidth - .5; mouse.ty = e.clientY / innerHeight - .5; }, { passive: true });
  const space = $("space"), sc = space.getContext("2d");
  const COLORS = ["#ffffff", "#e2e8f0", "#c7d2fe", "#9fb4ff", "#a5f3fc", "#fde68a"];
  let sw = 0, sh = 0, stars = [], dust = [], shooters = [], nextShot = 1200, speed = .006;
  const spawn = (st, far) => {
    st.x = (Math.random() - .5) * 2;
    st.y = (Math.random() - .5) * 2;
    st.z = far ? .9 + Math.random() * .1 : Math.random() * .95 + .05;
    st.px = st.py = null;
    st.col = COLORS[(Math.random() * COLORS.length) | 0];
    st.tw = Math.random() * 6.28;
    return st;
  };
  const sizeSpace = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    sw = innerWidth; sh = innerHeight;
    space.width = sw * dpr; space.height = sh * dpr;
    sc.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(1100, Math.floor((sw * sh) / 1500));
    stars = Array.from({ length: n }, () => spawn({}, false));
    dust = Array.from({ length: Math.floor(n * .6) }, () => ({ x: Math.random() * sw, y: Math.random() * sh, a: Math.random() * .5 + .1, p: Math.random() * 6.28 }));
  };
  const drawSpace = (t) => {
    sc.clearRect(0, 0, sw, sh);
    mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05;
    const heroH = heroEl.offsetHeight || sh;
    const k = Math.max(0, 1 - scrollY / heroH);        // 1 on the first screen → 0 below
    const target = reduce ? 0 : .0007 + .0021 * k;  // calm drift on top, slower still below
    speed += (target - speed) * .06;
    // Fixed background dust that twinkles (gives depth without motion)
    for (const d of dust) {
      sc.globalAlpha = d.a * (reduce ? 1 : .6 + .4 * Math.sin(t / 700 + d.p));
      sc.fillStyle = "#cbd5e1";
      sc.fillRect(d.x, d.y, 1, 1);
    }
    const cx = sw / 2 - mouse.x * sw * .12, cy = sh * .45 - mouse.y * sh * .12;
    const f = Math.max(sw, sh) * .55;
    sc.lineCap = "round";
    for (const st of stars) {
      st.z -= speed;
      const x = cx + (st.x / st.z) * f, y = cy + (st.y / st.z) * f;
      if (st.z <= .02 || x < -40 || x > sw + 40 || y < -40 || y > sh + 40) { spawn(st, true); continue; }
      const near = 1 - st.z;
      const r = .3 + near * near * 2.4;
      const a = Math.min(1, .15 + near * 1.1) * (reduce ? 1 : .75 + .25 * Math.sin(t / 300 + st.tw));
      sc.globalAlpha = a;
      if (st.px !== null && speed > .006) {
        sc.strokeStyle = st.col; sc.lineWidth = r;
        sc.beginPath(); sc.moveTo(st.px, st.py); sc.lineTo(x, y); sc.stroke();
      } else {
        sc.fillStyle = st.col;
        sc.beginPath(); sc.arc(x, y, r * .8, 0, 6.28); sc.fill();
      }
      st.px = x; st.py = y;
    }
    if (!reduce && t > nextShot) {
      const ang = Math.PI * (.08 + Math.random() * .22);
      shooters.push({ x: Math.random() * sw * .8, y: Math.random() * sh * .45, vx: Math.cos(ang) * 7, vy: Math.sin(ang) * 7, life: 0 });
      nextShot = t + (k > .3 ? 3500 + Math.random() * 3500 : 6000 + Math.random() * 6000);
    }
    shooters = shooters.filter((m) => m.life < 60);
    for (const m of shooters) {
      m.life++; m.x += m.vx; m.y += m.vy;
      const g = sc.createLinearGradient(m.x, m.y, m.x - m.vx * 16, m.y - m.vy * 16);
      g.addColorStop(0, "rgba(230,240,255,.95)"); g.addColorStop(1, "rgba(230,240,255,0)");
      sc.globalAlpha = 1 - m.life / 60; sc.strokeStyle = g; sc.lineWidth = 1.6;
      sc.beginPath(); sc.moveTo(m.x, m.y); sc.lineTo(m.x - m.vx * 16, m.y - m.vy * 16); sc.stroke();
    }
    sc.globalAlpha = 1;
  };
  sizeSpace(); drawSpace(0);
  addEventListener("resize", () => { sizeSpace(); drawSpace(performance.now()); });
  if (!reduce) {
    let paused = false;
    document.addEventListener("visibilitychange", () => { paused = document.hidden; if (!paused) requestAnimationFrame(spaceLoop); });
    const spaceLoop = (t) => { if (paused) return; drawSpace(t); requestAnimationFrame(spaceLoop); };
    requestAnimationFrame(spaceLoop);
  }

  // Credentials: rotating spiral galaxy
  live($("galaxy"), {
    setup(st) {
      st.pts = Array.from({ length: Math.min(3200, Math.floor(st.w * st.h / 300)) }, (_, i) => {
        const arm = i % 3, d = Math.random() ** .65;
        return { arm, d, th: arm * 2.094 + d * 5.4 + (Math.random() - .5) * (.9 - d * .5), s: Math.random() < .08 ? 2 : 1.2, hue: Math.random() };
      });
      st.rot = 0;
    },
    frame(st, t) {
      const { c, w, h } = st;
      c.clearRect(0, 0, w, h);
      if (!reduce) st.rot += .0009;
      const cx = w / 2, cy = h * .52, R = Math.max(w * .5, 420), sq = .42, tilt = -.12;
      const glow = c.createRadialGradient(cx, cy, 0, cx, cy, R * .28);
      glow.addColorStop(0, "rgba(240,230,255,.38)"); glow.addColorStop(.4, "rgba(167,139,250,.14)"); glow.addColorStop(1, "rgba(167,139,250,0)");
      c.fillStyle = glow; c.fillRect(0, 0, w, h);
      for (const p of st.pts) {
        const th = p.th + st.rot * (1.4 - p.d);
        const rx = Math.cos(th) * p.d * R, ry = Math.sin(th) * p.d * R * sq;
        const x = cx + rx * Math.cos(tilt) - ry * Math.sin(tilt), y = cy + rx * Math.sin(tilt) + ry * Math.cos(tilt);
        c.globalAlpha = Math.min(1, (.45 + (1 - p.d) * .75) * (.75 + .25 * Math.sin(t / 900 + p.hue * 9)));
        c.fillStyle = p.d < .18 ? "#f5f3ff" : p.hue < .2 ? "#f0abfc" : p.hue < .6 ? "#a78bfa" : "#818cf8";
        c.fillRect(x, y, p.s, p.s);
      }
      c.globalAlpha = 1;
    },
  });

  // Tech stack: drifting constellation that links nearby nodes and reacts to the cursor
  const plexusEl = $("plexus");
  const pm = { x: -1e4, y: -1e4 };
  $("stack").addEventListener("pointermove", (e) => { const r = plexusEl.getBoundingClientRect(); pm.x = e.clientX - r.left; pm.y = e.clientY - r.top; });
  $("stack").addEventListener("pointerleave", () => { pm.x = pm.y = -1e4; });
  live(plexusEl, {
    setup(st) {
      st.n = Array.from({ length: Math.min(110, Math.floor(st.w * st.h / 14000)) }, () => ({ x: Math.random() * st.w, y: Math.random() * st.h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 }));
    },
    frame(st) {
      const { c, w, h, n } = st, D = 150;
      c.clearRect(0, 0, w, h);
      for (const a of n) {
        if (!reduce) { a.x += a.vx; a.y += a.vy; if (a.x < 0 || a.x > w) a.vx *= -1; if (a.y < 0 || a.y > h) a.vy *= -1; }
      }
      c.lineWidth = 1;
      for (let i = 0; i < n.length; i++) {
        const a = n[i];
        for (let j = i + 1; j < n.length; j++) {
          const b = n[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < D) { c.globalAlpha = (1 - d / D) * .3; c.strokeStyle = "#22d3ee"; c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke(); }
        }
        const md = Math.hypot(a.x - pm.x, a.y - pm.y);
        if (md < 190) { c.globalAlpha = (1 - md / 190) * .7; c.strokeStyle = "#818cf8"; c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(pm.x, pm.y); c.stroke(); }
        c.globalAlpha = .75; c.fillStyle = md < 190 ? "#a5f3fc" : "#67e8f9";
        c.fillRect(a.x - 1, a.y - 1, 2.2, 2.2);
      }
      c.globalAlpha = 1;
    },
  });
})();
