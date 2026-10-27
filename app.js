const $ = (s) => document.querySelector(s);
const FIELDS = [
  "name",
  "title",
  "about",
  "email",
  "phone",
  "location",
  "github",
  "linkedin",
  "skills",
];
const LISTS = {
  education: ["Degree", "College", "Year"],
  experience: ["Role", "Company", "Duration"],
  projects: ["Title", "Description", "Link"],
};
const EMPTY = () => ({
  f: {},
  l: { education: [], experience: [], projects: [] },
  tpl: "modern",
  theme: "dark",
  accent: "#14b8a6",
  photo: "",
});
let S = EMPTY();

// ---------- helpers ----------
const esc = (s) =>
  String(s || "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const url = (u) =>
  !u ? "" : /^(https?:|mailto:|tel:)/.test(u) ? u : "https://" + u;
const slug = () =>
  (S.f.name || "my")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "my";

// ---------- portfolio CSS: 4 templates (markup same, CSS alag) ----------
const THEMES = {
  dark: "--bg:#0b1020;--fg:#e8ebf5;--mut:#98a2bd;--card:#141b30;--bd:#243049",
  light: "--bg:#f6f7fb;--fg:#141824;--mut:#5d6679;--card:#ffffff;--bd:#dde1ec",
};
const TPL = {
  minimal: `body{font-family:Georgia,serif;line-height:1.7}
.wrap{max-width:720px;margin:auto;padding:50px 22px}
.ph{width:96px;height:96px;border-radius:8px;object-fit:cover}
h1{font-size:clamp(30px,5vw,44px);margin:12px 0 2px}.role{color:var(--mut);font-size:18px}
section{border-top:1px solid var(--bd);padding:22px 0}h2{font-style:italic;font-weight:400}
.grid{display:block}.card{border:0;background:none;padding:0 0 12px}`,
  modern: `.wrap{max-width:1000px;margin:auto;padding:30px 20px}
aside{text-align:center;padding:50px 0 30px}
.ph{width:130px;height:130px;border-radius:50%;object-fit:cover;border:3px solid var(--ac)}
h1{font-size:clamp(32px,6vw,52px);margin:14px 0 4px}.role{color:var(--ac);font-size:20px;font-weight:600}
.links{justify-content:center}
section{background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:24px;margin:18px 0}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}`,
  gradient: `aside{background:linear-gradient(135deg,var(--ac),#7c3aed);color:#fff;text-align:center;padding:64px 20px 90px}
aside a,aside .m,.role{color:#fff}
.ph{width:120px;height:120px;border-radius:50%;object-fit:cover;border:4px solid #fff}
h1{font-size:clamp(32px,6vw,54px);margin:14px 0 4px}.links{justify-content:center}
main{max-width:900px;margin:-50px auto 0;padding:0 18px}
section{background:var(--card);border:1px solid var(--bd);border-radius:18px;padding:24px;margin-bottom:18px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px}`,
  sidebar: `.wrap{display:grid;grid-template-columns:300px 1fr;min-height:100vh}
aside{background:var(--card);border-right:1px solid var(--bd);padding:40px 24px}
.ph{width:120px;height:120px;border-radius:16px;object-fit:cover}
h1{font-size:28px;margin:14px 0 4px}.role{color:var(--ac);font-weight:600}
.links{flex-direction:column;align-items:flex-start}
main{padding:40px;max-width:820px}section{margin-bottom:32px}.grid{display:grid;gap:14px}
@media(max-width:760px){.wrap{grid-template-columns:1fr}aside{border-right:0;border-bottom:1px solid var(--bd)}main{padding:24px 18px}}`,
};

function build() {
  const d = S.f,
    rows = (k) => S.l[k].filter((r) => r.some(Boolean));
  const skills = (d.skills || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  const contact = [
    d.email && ["Email", "mailto:" + d.email],
    d.phone && [d.phone, "tel:" + d.phone],
    d.github && ["GitHub", url(d.github)],
    d.linkedin && ["LinkedIn", url(d.linkedin)],
  ]
    .filter(Boolean)
    .map(
      ([t, h]) =>
        `<a href="${esc(h)}" target="_blank" rel="noopener">${esc(t)}</a>`,
    )
    .join("");
  const pair = (r) =>
    `<div class="card"><strong>${esc(r[0])}</strong><div class="m">${esc(r[1])}${r[2] ? " · " + esc(r[2]) : ""}</div></div>`;
  const sec = (h, b) => (b ? `<section><h2>${h}</h2>${b}</section>` : "");
  const prj = rows("projects")
    .map(
      (r) =>
        `<div class="card"><strong>${esc(r[0])}</strong><p class="m">${esc(r[1])}</p>${r[2] ? `<a href="${esc(url(r[2]))}" target="_blank" rel="noopener">View project</a>` : ""}</div>`,
    )
    .join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(d.name || "Portfolio")} | Portfolio</title><style>
:root{${THEMES[S.theme]};--ac:${S.accent}}*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
a{color:var(--ac);text-decoration:none;font-weight:600}h2{margin:0 0 14px;font-size:22px}
.links{display:flex;gap:14px;flex-wrap:wrap;margin-top:14px}.chips{display:flex;gap:8px;flex-wrap:wrap}
.chip{border:1px solid var(--ac);padding:4px 12px;border-radius:99px;font-size:14px}
.card{background:var(--bg);border:1px solid var(--bd);border-radius:12px;padding:14px;margin-bottom:10px}
.m{color:var(--mut);margin:4px 0}footer{text-align:center;color:var(--mut);padding:24px;font-size:13px}
${TPL[S.tpl]}</style></head><body><div class="wrap"><aside>
${S.photo ? `<img class="ph" src="${S.photo}" alt="${esc(d.name)}">` : ""}<h1>${esc(d.name || "Your Name")}</h1>
<div class="role">${esc(d.title || "Your title")}</div>${d.location ? `<div class="m">${esc(d.location)}</div>` : ""}
<div class="links">${contact}</div></aside><main>
${sec("About", d.about ? `<p>${esc(d.about).replace(/\n/g, "<br>")}</p>` : "")}
${sec("Skills", skills.length ? `<div class="chips">${skills.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>` : "")}
${sec("Projects", prj ? `<div class="grid">${prj}</div>` : "")}
${sec("Experience", rows("experience").map(pair).join(""))}
${sec("Education", rows("education").map(pair).join(""))}
</main></div><footer>&copy; ${new Date().getFullYear()} ${esc(d.name)}</footer></body></html>`;
}

// ---------- render + save ----------
let t;
function render() {
  $("#frame").srcdoc = build();
  document
    .querySelectorAll("[data-t]")
    .forEach((b) => b.classList.toggle("on", b.dataset.t === S.tpl));
  document
    .querySelectorAll("[data-p]")
    .forEach((b) => b.classList.toggle("on", b.dataset.p === S.theme));
  clearTimeout(t);
  t = setTimeout(() => {
    try {
      localStorage.setItem("spg2", JSON.stringify(S));
    } catch (e) {}
  }, 400);
}

// ---------- dynamic lists (add / remove) ----------
function drawList(k) {
  $("#l-" + k).innerHTML = S.l[k]
    .map(
      (r, i) => `<div class="item">${LISTS[k]
        .map(
          (ph, j) =>
            `<input data-k="${k}" data-i="${i}" data-j="${j}" placeholder="${ph}" value="${esc(r[j])}">`,
        )
        .join("")}
    <button class="btn x" data-rm="${k}:${i}">Remove</button></div>`,
    )
    .join("");
}
function syncForm() {
  FIELDS.forEach(
    (f) => (document.querySelector(`[data-f=${f}]`).value = S.f[f] || ""),
  );
  $("#accent").value = S.accent;
  Object.keys(LISTS).forEach(drawList);
  render();
}

// ---------- events ----------
document.querySelectorAll("[data-f]").forEach((el) =>
  el.addEventListener("input", () => {
    S.f[el.dataset.f] = el.value;
    render();
  }),
);
document.addEventListener("input", (e) => {
  const k = e.target.dataset.k;
  if (k) {
    S.l[k][e.target.dataset.i][e.target.dataset.j] = e.target.value;
    render();
  }
});
document.addEventListener("click", (e) => {
  const a = e.target.dataset.add,
    r = e.target.dataset.rm;
  if (a) {
    S.l[a].push(["", "", ""]);
    drawList(a);
    render();
  }
  if (r) {
    const [k, i] = r.split(":");
    S.l[k].splice(+i, 1);
    drawList(k);
    render();
  }
});
$("#accent").addEventListener("input", (e) => {
  S.accent = e.target.value;
  render();
});
document.querySelectorAll("[data-t]").forEach(
  (b) =>
    (b.onclick = () => {
      S.tpl = b.dataset.t;
      render();
    }),
);
document.querySelectorAll("[data-p]").forEach(
  (b) =>
    (b.onclick = () => {
      S.theme = b.dataset.p;
      render();
    }),
);
document.querySelectorAll("[data-w]").forEach(
  (b) =>
    (b.onclick = () => {
      $("#frame").style.width = b.dataset.w;
    }),
);
$("#appTheme").onclick = () => {
  const r = document.documentElement;
  r.dataset.theme = r.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("spg2-app", r.dataset.theme);
  } catch (e) {}
};
$("#photo").onchange = (e) => {
  const f = e.target.files[0];
  if (!f) return;
  if (f.size > 1500000) return alert("Photo 1.5 MB se chhoti rakho.");
  const fr = new FileReader();
  fr.onload = () => {
    S.photo = fr.result;
    render();
  };
  fr.readAsDataURL(f);
};
$("#reset").onclick = () => {
  if (confirm("Saara data clear karna hai?")) {
    S = EMPTY();
    $("#photo").value = "";
    syncForm();
  }
};
$("#sample").onclick = () => {
  S.f = {
    name: "your name",
    title: "B.Tech CSE Student | Full-Stack Developer",
    about:
      "Main B.Tech student hoon jo clean web apps banana pasand karta hai. Students ke liye useful tools banana mujhe accha lagta hai.",
    email: "you@example.com",
    phone: "+91                ",
    location: "Uttar Pradesh, India",
    github: "github.com/yourname",
    linkedin: "linkedin.com/in/yourname",
    skills: "HTML, CSS, JavaScript, Python, Flask, SQL, Git",
  };
  S.l = {
    education: [
      ["B.Tech Computer Science", "Your College", "2026 - 2030"],
      ["Intermediate (PCM)", "Your School", "2022"],
    ],
    experience: [["Web Developer Intern", "Example Co.", "Jun - Aug 2026"]],
    projects: [
      [
        "Study Material Site",
        "Free notes and PYQs for B.Tech students",
        "github.com/yourname/notes",
      ],
      [
        "Campus Timetable App",
        "Daily class schedule with reminders",
        "github.com/yourname/timetable",
      ],
    ],
  };
  syncForm();
};

// ---------- downloads ----------
$("#dlHtml").onclick = () => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([build()], { type: "text/html" }));
  a.download = slug() + "-portfolio.html";
  a.click();
  URL.revokeObjectURL(a.href);
};
$("#dlPdf").onclick = () => {
  if (!window.html2pdf)
    return alert("PDF ke liye internet chahiye (html2pdf CDN load nahi hua).");
  const body = $("#frame").contentDocument.body;
  html2pdf()
    .set({
      margin: 0,
      filename: slug() + "-portfolio.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: getComputedStyle(body).backgroundColor,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .from(body)
    .save();
};

// ---------- init ----------
try {
  const at = localStorage.getItem("spg2-app");
  if (at) document.documentElement.dataset.theme = at;
  const saved = JSON.parse(localStorage.getItem("spg2") || "null");
  if (saved) {
    S = Object.assign(EMPTY(), saved);
    syncForm();
  } else $("#sample").click();
} catch (e) {
  $("#sample").click();
}
