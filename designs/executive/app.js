(() => {
  const { P, esc, icon, link, reveal, scrollSpy, year } = window.UI;
  const $ = (id) => document.getElementById(id);
  const pr = P.profile;

  $("eyebrow").textContent = `${pr.company} · ${pr.location}`;
  $("name").textContent = pr.name;
  $("role").textContent = pr.role;
  $("intro").textContent = pr.tagline;
  if (pr.links.resume) {
    $("resume").href = link("resume");
    $("resume").innerHTML = `${icon("file", 16)} Download résumé`;
  } else {
    $("resume").href = link("email");
    $("resume").removeAttribute("target");
    $("resume").innerHTML = `${icon("mail", 16)} Get in touch`;
  }
  $("social").innerHTML = [
    `<a href="${link("linkedin")}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon("linkedin", 18)}</a>`,
    pr.links.github ? `<a href="${link("github")}" target="_blank" rel="noopener" aria-label="GitHub">${icon("github", 18)}</a>` : "",
    pr.links.email ? `<a href="${link("email")}" aria-label="Email">${icon("mail", 18)}</a>` : "",
  ].join("");

  $("about-body").innerHTML = pr.about.map((p) => `<p>${esc(p)}</p>`).join("");
  $("quote").textContent = `“${pr.quote}”`;

  $("numbers").innerHTML = P.metrics.map((m) => `
    <div data-reveal><b>${esc(m.value)}</b><span>${esc(m.label)}</span><small>${esc(m.detail)}</small></div>`).join("");

  const ed = P.education;
  $("jobs").innerHTML = P.experience.map((x) => `
    <li data-reveal>
      <time>${esc(x.period)}</time>
      <div>
        <h3>${esc(x.role)} · <span>${esc(x.company)}</span></h3>
        <ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        <div class="pills">${x.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
      </div>
    </li>`).join("") + `
    <li class="edu" data-reveal><time>${esc(ed.period)}</time><div><h3>${esc(ed.degree)}</h3><p>${esc(ed.school)}</p></div></li>`;

  $("projects").innerHTML = P.projects.map((p, i) => `
    <li data-reveal>
      <button aria-expanded="false" aria-controls="case-${p.id}">
        <span class="num">${String(i + 1).padStart(2, "0")}</span>
        <span><h3>${esc(p.title)}</h3><span class="meta">${esc([p.category, ...p.stack.filter((s) => s !== p.category)].slice(0, 5).join(" · "))}</span></span>
        <span class="plus">${icon("plus", 14)}</span>
      </button>
      <div class="body" id="case-${p.id}"><div><div class="case">
        <p class="summary">${esc(p.summary)}</p>
        <h4>Challenge</h4><p>${esc(p.challenge)}</p>
        <h4>What I built</h4><ul>${p.built.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
        <h4>Outcome</h4><ul class="wins">${p.impact.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>
      </div></div></div>
    </li>`).join("");
  $("projects").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    const li = b.parentElement, open = !li.classList.contains("open");
    li.classList.toggle("open", open);
    b.setAttribute("aria-expanded", String(open));
  });
  $("projects").firstElementChild.querySelector("button").click();

  $("areas").innerHTML = P.focus.map((f) => `<div data-reveal><h3>${icon(f.icon, 18)}${esc(f.title)}</h3><p>${esc(f.text)}</p></div>`).join("");
  $("skills").innerHTML = P.skills.map((g) => `<div><h4>${esc(g.group)}</h4><p>${g.items.map(esc).join(", ")}</p></div>`).join("");
  $("creds").innerHTML = P.certifications.map((c) => `<a href="${esc(c.url)}" target="_blank" rel="noopener">${icon("check", 16)}<span>${esc(c.name)} <small>· ${esc(c.issuer)}, ${esc(c.date)}</small></span></a>`).join("") +
    `<span class="todo">Next: Certified Kubernetes Administrator</span>`;

  $("contact-links").innerHTML = [
    `<a class="btn" href="${link("linkedin")}" target="_blank" rel="noopener">${icon("linkedin", 16)} LinkedIn</a>`,
    pr.links.github ? `<a class="btn btn--line" href="${link("github")}" target="_blank" rel="noopener">${icon("github", 16)} GitHub</a>` : "",
    pr.links.email ? `<a class="btn btn--line" href="${link("email")}">${icon("mail", 16)} Email</a>` : "",
  ].join("");
  $("foot").textContent = `© ${year} ${pr.name}. Built with HTML, CSS & JS, hosted on GitHub Pages.`;

  scrollSpy(".toc a");
  reveal();
})();
