(() => {
  const { P, esc, icon, chip, link, categories, reveal, year } = window.UI;
  const $ = (id) => document.getElementById(id);
  const pr = P.profile;
  const catColor = { GitOps: "#b4f461", Kubernetes: "#4fd1ff", FinOps: "#facc15", "CI/CD": "#a78bfa", IaC: "#fb923c", Security: "#f87171", Observability: "#34d399" };

  // Theme toggle
  const themeBtn = $("theme");
  const paintTheme = () => { themeBtn.innerHTML = icon(document.documentElement.dataset.theme === "dark" ? "sun" : "moon", 18); };
  themeBtn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("bento-theme", next);
    paintTheme();
  });
  paintTheme();

  // Intro tiles
  $("eyebrow").textContent = `${pr.role} · ${pr.company}`;
  const hp = pr.headline.match(/[^.!?]+[.!?]?/g).map((x) => x.trim()).filter(Boolean);
  $("headline").innerHTML = `${esc(hp.slice(0, -1).join(" ") || `Hi, I'm ${pr.shortName}.`)}<br><span class="accent">${esc(hp.at(-1))}</span>`;
  $("tagline").textContent = pr.tagline;
  $("introCta").innerHTML = `
    <a class="btn btn--accent" href="#work">${icon("arrow", 16)} See my work</a>
    ${pr.links.resume ? `<a class="btn" href="${link("resume")}" target="_blank" rel="noopener">${icon("file", 16)} Résumé</a>` : `<a class="btn" href="#contact">${icon("mail", 16)} Contact</a>`}`;
  $("status").textContent = pr.available;
  $("where").textContent = `in ${pr.location}`;
  const tick = () => { $("time").textContent = new Date().toLocaleTimeString("en-IN", { timeZone: pr.timezone, hour: "2-digit", minute: "2-digit", hour12: false }); };
  tick(); setInterval(tick, 15000);

  [[".t-m1", 0], [".t-m2", 1], [".t-m3", 3]].forEach(([sel, i]) => {
    const m = P.metrics[i];
    document.querySelector(sel).innerHTML = `<p class="label">Impact</p><div><b>${esc(m.value)}</b><p>${esc(m.label)}</p></div>`;
  });

  const tech = P.skills.flatMap((g) => g.items).filter((n) => P.logos[n]);
  const half = Math.ceil(tech.length / 2);
  const pills = (arr) => { const h = arr.map((n) => chip(n, "pill")).join(""); return h + h; };
  $("loopA").innerHTML = pills(tech.slice(0, half));
  $("loopB").innerHTML = pills(tech.slice(half));

  $("now").innerHTML = [
    ["Running", "GitOps promotion with Argo CD, Argo Workflows & Kargo"],
    ["Scaling", "EKS/AKS with Karpenter node pools & KEDA autoscaling"],
    ["Cutting", "cloud network spend with flow-log-driven FinOps"],
    ["Exploring", "Crossplane compositions & AI-assisted operations"],
  ].map(([b, t]) => `<li><span class="dot"></span><span><b>${b}</b> ${esc(t)}</span></li>`).join("");

  document.querySelector(".t-years").innerHTML = `<p class="label">Experience</p><div><b>${esc(pr.years)}</b><p>years in DevOps & SRE, since 2017</p></div>`;

  $("liTile").href = link("linkedin");
  $("liTile").innerHTML = `${icon("linkedin")}<span><b>LinkedIn</b>${icon("external", 18)}</span>`;
  if (pr.links.github) {
    $("ghTile").href = link("github");
    $("ghTile").innerHTML = `${icon("github")}<span><b>GitHub</b>${icon("external", 18)}</span>`;
  } else {
    $("ghTile").href = link("email");
    $("ghTile").removeAttribute("target");
    $("ghTile").innerHTML = `${icon("mail")}<span><b>Email</b>${icon("arrow", 18)}</span>`;
  }

  // About + metrics
  $("aboutBody").innerHTML = pr.about.map((p) => `<p>${esc(p)}</p>`).join("");
  $("metrics").innerHTML = P.metrics.map((m) => `<div data-reveal><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join("");

  // Work cards + modal
  $("cards").innerHTML = P.projects.map((p) => `
    <button class="card" data-id="${p.id}" data-cat="${esc(p.category)}" style="--c:${catColor[p.category] || "var(--a1)"}" data-reveal>
      <span class="cat"><i></i>${esc(p.category)}</span>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.summary)}</p>
      <span class="foot"><span>${esc(p.stack.slice(0, 3).join(" · "))}</span>${icon("arrow", 18)}</span>
    </button>`).join("");
  $("filters").innerHTML = categories().map((c, i) => `<button class="${i ? "" : "is-active"}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  $("filters").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    $("filters").querySelectorAll("button").forEach((x) => x.classList.toggle("is-active", x === b));
    document.querySelectorAll(".card").forEach((c) => { c.hidden = b.dataset.cat !== "All" && c.dataset.cat !== b.dataset.cat; });
  });
  const modal = $("modal");
  $("mClose").innerHTML = icon("close", 18);
  $("mClose").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
  $("cards").addEventListener("click", (e) => {
    const c = e.target.closest(".card"); if (!c) return;
    const p = P.projects.find((x) => x.id === c.dataset.id);
    $("mBody").innerHTML = `
      <span class="cat">${esc(p.org)}</span>
      <h3 id="mTitle">${esc(p.title)}</h3>
      <p class="sum">${esc(p.summary)}</p>
      <div class="grid">
        <div><h4>Challenge</h4><p>${esc(p.challenge)}</p><h4>What I built</h4><ul>${p.built.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>
        <div><h4>Impact</h4><ul class="wins">${p.impact.map((w) => `<li>${icon("check", 16)}<span>${esc(w)}</span></li>`).join("")}</ul>
        <h4>Stack</h4><div class="tags">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div></div>
      </div>`;
    modal.showModal();
  });

  // Experience
  $("xp").innerHTML = P.experience.map((x) => `
    <article class="job" data-reveal>
      <div><time>${esc(x.period)}</time><span class="co">${esc(x.company)}</span></div>
      <div><h3>${esc(x.role)}</h3><ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul><div class="tags">${x.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>
    </article>`).join("") + `
    <article class="job" data-reveal>
      <div><time>${esc(P.education.period)}</time><span class="co">Education</span></div>
      <div><h3>${esc(P.education.degree)}</h3><p style="color:var(--muted);margin:.3rem 0 0">${esc(P.education.school)} · ${P.certifications.map((c) => `${esc(c.name)} (${esc(c.issuer)})`).join(", ")}</p></div>
    </article>`;

  // Toolbox
  $("focus").innerHTML = P.focus.map((f) => `<div data-reveal>${icon(f.icon)}<h4>${esc(f.title)}</h4><p>${esc(f.text)}</p></div>`).join("");
  $("skills").innerHTML = P.skills.map((g) => `<div data-reveal><h4>${esc(g.group)}</h4><div class="wrap-pills">${g.items.map((n) => chip(n, "pill")).join("")}</div></div>`).join("");

  // Contact
  $("contactText").textContent = `${pr.available}: GitOps, Kubernetes, platform engineering and cloud cost.`;
  $("contactCta").innerHTML = `
    <a class="btn btn--accent" href="${link("linkedin")}" target="_blank" rel="noopener">${icon("linkedin", 16)} Connect on LinkedIn</a>
    ${pr.links.github ? `<a class="btn" href="${link("github")}" target="_blank" rel="noopener">${icon("github", 16)} GitHub</a>` : ""}
    ${pr.links.email ? `<a class="btn" href="${link("email")}">${icon("mail", 16)} Email</a>` : ""}`;
  $("foot").textContent = `© ${year} ${pr.name} · Built with HTML, CSS & JS · Hosted on GitHub Pages`;

  reveal();
})();
