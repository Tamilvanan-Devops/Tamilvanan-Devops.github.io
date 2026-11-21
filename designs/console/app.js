(() => {
  const { P, esc, icon, link, categories, reveal, scrollSpy, year } = window.UI;
  const $ = (id) => document.getElementById(id);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pr = P.profile;
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const pad = (s, n) => String(s).padEnd(n);

  if (pr.links.resume) $("tbResume").href = link("resume");
  else $("tbResume").remove();

  // Hero: typed terminal session
  const prompt = `<span class="ps-user">tamil@platform</span>:<span class="ps-path">~</span>$ `;
  const headers = ["NAME", "ROLE", "EXPERIENCE", "LOCATION", "STATUS"];
  const vals = [slug(pr.name), "senior-devops-sre", `${pr.years}y`, slug(pr.location), "Running"];
  const widths = headers.map((h, i) => Math.max(h.length, vals[i].length) + 3);
  const script = [
    { cmd: "whoami", out: [`<span class="k-row">${esc(pr.name.toLowerCase())} — ${esc(pr.role.toLowerCase())} @ ${esc(pr.company.toLowerCase())}</span>`] },
    { cmd: "kubectl get engineer tamil -o wide", out: [
      `<span class="k-head">${headers.map((h, i) => pad(h, widths[i])).join("")}</span>`,
      `<span class="k-row">${vals.slice(0, 4).map((v, i) => pad(v, widths[i])).join("")}<span class="running">${vals[4]}</span></span>`,
    ] },
    { cmd: "cat README.md", out: [] },
  ];
  const out = $("typed");
  const showHero = () => {
    $("heroText").innerHTML = `
      <h1>${esc(pr.name)}<span class="hl">_</span></h1>
      <h2>${esc(pr.role)} · ${esc(pr.company)}</h2>
      <p>${esc(pr.tagline)}</p>
      <div class="btns">
        <a class="kbtn kbtn--go" href="#projects">${icon("arrow", 16)} kubectl get projects</a>
        <a class="kbtn" href="${link("linkedin")}" target="_blank" rel="noopener">${icon("linkedin", 16)} linkedin</a>
        ${pr.links.github ? `<a class="kbtn" href="${link("github")}" target="_blank" rel="noopener">${icon("github", 16)} github</a>` : ""}
        ${pr.links.resume ? `<a class="kbtn" href="${link("resume")}" target="_blank" rel="noopener">${icon("file", 16)} resume.pdf</a>` : ""}
      </div>`;
    requestAnimationFrame(() => $("heroText").classList.add("show"));
  };
  const renderInstant = () => {
    out.innerHTML = script.map((s) => `<p class="line">${prompt}${esc(s.cmd)}</p>${s.out.map((o) => `<p class="line">${o}</p>`).join("")}`).join("");
    showHero();
  };
  const typeSession = async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    for (const s of script) {
      const line = document.createElement("p");
      line.className = "line";
      line.innerHTML = prompt + '<span class="t"></span><span class="cursor"></span>';
      out.appendChild(line);
      const t = line.querySelector(".t");
      for (const ch of s.cmd) { t.textContent += ch; await sleep(28 + Math.random() * 30); }
      await sleep(180);
      line.querySelector(".cursor").remove();
      for (const o of s.out) { const p = document.createElement("p"); p.className = "line"; p.innerHTML = o; out.appendChild(p); await sleep(90); }
      await sleep(220);
    }
    showHero();
  };
  if (reduce || sessionStorage.getItem("console-typed")) renderInstant();
  else { sessionStorage.setItem("console-typed", "1"); typeSession(); }

  // about.md
  $("aboutMd").innerHTML = `<h3>About</h3>${pr.about.map((p) => `<p>${esc(p)}</p>`).join("")}<blockquote>&gt; ${esc(pr.quote)}</blockquote>`;

  // impact.json
  $("metrics").innerHTML = P.metrics.map((m) => `
    <div class="metric" data-reveal><span class="key">"${esc(slug(m.label))}"</span><b>${esc(m.value)}</b><p>${esc(m.detail)}</p></div>`).join("");
  $("caps").innerHTML = P.focus.map((f) => `
    <div class="cap" data-reveal>${icon(f.icon, 18)}<div><h4>${esc(f.title)}</h4><p>${esc(f.text)}</p></div></div>`).join("");

  // projects table + describe
  let ns = "All";
  let current = P.projects[0].id;
  const describe = (p) => {
    $("describe").innerHTML = `
      <div><span class="dim">$ kubectl describe project ${esc(p.id)}</span></div>
      <div class="sec"><span class="k">Name:</span>        <span class="v">${esc(p.title)}</span></div>
      <div><span class="k">Namespace:</span>   <span class="v">${esc(slug(p.category))}</span></div>
      <div><span class="k">Labels:</span>      <span class="v">org=${esc(p.org)}</span></div>
      <div class="sec"><span class="k">Summary:</span><p>${esc(p.summary)}</p></div>
      <div class="sec"><span class="k">Challenge:</span><p>${esc(p.challenge)}</p></div>
      <div class="sec"><span class="k">Spec.built:</span><ul>${p.built.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>
      <div class="sec ev"><span class="k">Events (impact):</span><ul>${p.impact.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>
      <div class="sec tags"><span class="k">Images:</span><br>${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div>`;
  };
  const renderTable = () => {
    const rows = P.projects.filter((p) => ns === "All" || p.category === ns);
    if (!rows.some((p) => p.id === current)) current = rows[0].id;
    $("projTable").tBodies[0].innerHTML = rows.map((p) => `
      <tr data-id="${p.id}" class="${p.id === current ? "is-active" : ""}" tabindex="0">
        <td>${esc(slug(p.category))}</td><td>${esc(p.title)}</td><td>● Healthy</td><td>${esc(p.stack.slice(0, 3).join(", "))}</td>
      </tr>`).join("");
    describe(P.projects.find((p) => p.id === current));
  };
  $("nsFilter").innerHTML = categories().map((c) => `<button class="${c === ns ? "is-active" : ""}" data-ns="${esc(c)}">${c === "All" ? "--all-namespaces" : "-n " + esc(slug(c))}</button>`).join("");
  $("nsFilter").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    ns = b.dataset.ns;
    $("nsFilter").querySelectorAll("button").forEach((x) => x.classList.toggle("is-active", x === b));
    renderTable();
  });
  const pick = (tr) => {
    if (!tr) return;
    current = tr.dataset.id;
    $("projTable").querySelectorAll("tbody tr").forEach((r) => r.classList.toggle("is-active", r === tr));
    describe(P.projects.find((p) => p.id === current));
  };
  $("projTable").addEventListener("click", (e) => pick(e.target.closest("tr[data-id]")));
  $("projTable").addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(e.target.closest("tr[data-id]")); } });
  renderTable();

  // career.log
  const hash = (s) => [...s].reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) >>> 0, 7).toString(16).slice(0, 7);
  const entries = [...P.experience.map((x, i) => ({ ...x, head: i === 0 })), { role: P.education.degree, company: P.education.school, period: P.education.period, points: [], edu: true }];
  $("gitlog").innerHTML = entries.map((x) => `
    <div class="commit" data-reveal><div class="graph"></div><div class="c">
      <span class="hash">${hash(x.role + x.company)}</span> ${x.head ? `<span class="ref">(<b>HEAD → main</b>, tag: current)</span>` : x.edu ? `<span class="ref">(tag: init)</span>` : ""}
      <h4>${esc(x.role)} @ ${esc(x.company)}</h4>
      <div class="date">${esc(x.period)}</div>
      ${x.points.length ? `<ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
    </div></div>`).join("");

  // stack.yaml
  const y = [`<span class="k">apiVersion</span>: <span class="s">portfolio/v1</span>`, `<span class="k">kind</span>: <span class="s">Toolbox</span>`, `<span class="k">metadata</span>:`, `  <span class="k">name</span>: <span class="s">${esc(slug(pr.name))}</span>`, `<span class="k">spec</span>:`];
  for (const g of P.skills) {
    y.push(`  <span class="k">${esc(slug(g.group))}</span>:`);
    y.push(`    <span class="p">[</span>${g.items.map((i) => `<span class="s">${esc(i)}</span>`).join('<span class="p">, </span>')}<span class="p">]</span>`);
  }
  y.push(`  <span class="k">certifications</span>:`);
  P.certifications.forEach((c) => y.push(`    - <span class="s">${esc(c.name)}</span> <span class="c"># ${esc(c.issuer)}, ${esc(c.date)}</span>`));
  y.push(`    - <span class="s">Certified Kubernetes Administrator</span> <span class="c"># up next</span>`);
  $("yaml").innerHTML = y.join("\n");

  // contact.sh
  $("contact").innerHTML = `
    <p class="line"><b>→</b> ${esc(pr.available)}</p>
    <p class="line"><b>→</b> location: ${esc(pr.location)} (IST, UTC+5:30)</p>
    <div class="btns">
      <a class="kbtn kbtn--go" href="${link("linkedin")}" target="_blank" rel="noopener">${icon("linkedin", 16)} open linkedin</a>
      ${pr.links.github ? `<a class="kbtn" href="${link("github")}" target="_blank" rel="noopener">${icon("github", 16)} git remote -v</a>` : ""}
      ${pr.links.email ? `<a class="kbtn" href="${link("email")}">${icon("mail", 16)} mail</a>` : ""}
      ${pr.links.resume ? `<a class="kbtn" href="${link("resume")}" target="_blank" rel="noopener">${icon("file", 16)} resume.pdf</a>` : ""}
    </div>`;

  $("statusbar").innerHTML = `<span>⎇ <b>main</b></span><span>✓ <b>0 errors</b></span><span>UTF-8</span><span>YAML</span><span>© ${year} ${esc(pr.name)}</span>`;

  // Explorer clock
  const tick = () => { $("clock").textContent = `⏱ ${new Date().toLocaleTimeString("en-IN", { timeZone: pr.timezone, hour: "2-digit", minute: "2-digit" })} IST`; };
  tick(); setInterval(tick, 30000);

  scrollSpy("#files a");
  reveal();
})();
