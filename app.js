/* ============================================================
   Site Review Lab — the brain
   Reads checklist.js (window.CHECKLIST) → renders checklist →
   live weighted score → export/import JSON report.
   State persists in localStorage. Everything stays in your browser.
   ============================================================ */

const $ = (id) => document.getElementById(id);

let CHECKLIST = null;
const STATE_KEY = "srl-state";

/* ---------- Safe storage ---------- */
function storeGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}
function storeSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    /* storage blocked — session simply won't persist */
  }
}

let toastTimer = null;
function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ---------- Score math ----------
   Each category weight spreads evenly across its items.
   Checked = full value, unchecked = 0.
   Any unchecked CRITICAL item caps the grade at C — you can't score
   above C while something critical is still broken.
------------------------------------------------ */
function computeScore() {
  let total = 0;
  let earned = 0;
  let done = 0;
  let criticalLeft = 0;
  let count = 0;

  for (const cat of CHECKLIST.categories) {
    const perItem = cat.weight / cat.items.length;
    for (const item of cat.items) {
      total += perItem;
      count++;
      const box = document.getElementById("chk-" + item.id);
      if (box && box.checked) {
        earned += perItem;
        done++;
      } else if (item.severity === "critical") {
        criticalLeft++;
      }
    }
  }

  const pct = total > 0 ? Math.round((earned / total) * 100) : 0;
  return { pct, done, count, criticalLeft };
}

function gradeOf(pct, criticalLeft) {
  if (criticalLeft > 0) {
    if (pct >= 65) return "C — critical issues left";
    if (pct >= 40) return "D — fix the majors first";
    return "E — back to the workshop";
  }
  if (pct >= 90) return "A — ship it";
  if (pct >= 80) return "B — almost there";
  if (pct >= 65) return "C — needs a refinement pass";
  if (pct >= 40) return "D — fix the majors first";
  return "E — back to the workshop";
}

function updateScore() {
  const { pct, done, count, criticalLeft } = computeScore();

  $("scoreValue").textContent = count === 0 ? "–" : pct + "%";
  $("scoreGrade").textContent =
    count === 0 ? "start checking items" : gradeOf(pct, criticalLeft);
  $("scoreFill").style.width = pct + "%";
  $("scoreBar").setAttribute("aria-valuenow", String(pct));
  $("doneCount").textContent = done;
  $("totalCount").textContent = count;
  $("criticalLeft").textContent =
    criticalLeft === 0
      ? "no critical issues left"
      : criticalLeft + " critical item(s) still unchecked";
}

/* ---------- Persistence ---------- */
function saveState() {
  const checked = {};
  document.querySelectorAll('.item input[type="checkbox"]').forEach((b) => {
    if (b.checked) checked[b.id.replace("chk-", "")] = true;
  });
  storeSet(
    STATE_KEY,
    JSON.stringify({ url: $("siteUrl").value, checked: checked })
  );
}

function restoreState() {
  const raw = storeGet(STATE_KEY);
  if (!raw) return;
  let state;
  try {
    state = JSON.parse(raw);
  } catch (e) {
    return;
  }
  if (state.url) $("siteUrl").value = state.url;
  if (state.checked) {
    Object.keys(state.checked).forEach((id) => {
      const box = document.getElementById("chk-" + id);
      if (box) {
        box.checked = true;
        box.closest(".item").classList.add("checked");
      }
    });
  }
}

/* ---------- Render ---------- */
function renderChecklist() {
  const root = $("checklist");
  root.innerHTML = "";

  for (const cat of CHECKLIST.categories) {
    const section = document.createElement("div");
    section.className = "category";

    const head = document.createElement("div");
    head.className = "category-head";
    const h2 = document.createElement("h2");
    h2.textContent = cat.name;
    const weight = document.createElement("span");
    weight.className = "category-weight";
    weight.textContent = "weight " + cat.weight + "%";
    head.append(h2, weight);
    section.appendChild(head);

    for (const item of cat.items) {
      const label = document.createElement("label");
      label.className = "item";

      const box = document.createElement("input");
      box.type = "checkbox";
      box.id = "chk-" + item.id;
      box.addEventListener("change", () => {
        label.classList.toggle("checked", box.checked);
        updateScore();
        saveState();
      });

      const text = document.createElement("span");
      text.className = "text";
      text.textContent = item.text;

      const sev = document.createElement("span");
      sev.className = "sev " + item.severity;
      sev.textContent = item.severity;

      label.append(box, text, sev);
      section.appendChild(label);
    }

    root.appendChild(section);
  }

  updateScore();
}

/* ---------- Report ---------- */
function buildReport() {
  const issues = [];
  for (const cat of CHECKLIST.categories) {
    for (const item of cat.items) {
      const box = document.getElementById("chk-" + item.id);
      if (box && !box.checked) {
        issues.push({
          category: cat.id,
          id: item.id,
          severity: item.severity,
          text: item.text,
        });
      }
    }
  }

  const { pct, done, count, criticalLeft } = computeScore();

  return {
    meta: {
      tool: "Site Review Lab",
      version: "1.1",
      reviewedBy: "mukund-buddy",
      date: new Date().toISOString(),
    },
    site: $("siteUrl").value.trim() || "(not provided)",
    score: {
      percent: pct,
      grade: gradeOf(pct, criticalLeft),
      itemsChecked: done,
      itemsTotal: count,
      criticalIssuesLeft: criticalLeft,
    },
    openIssues: issues,
  };
}

function exportReport() {
  const report = buildReport();

  const blob = new Blob([JSON.stringify(report, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;

  let host = "report";
  try {
    if (report.site !== "(not provided)") host = new URL(report.site).hostname;
  } catch (e) {
    host = report.site.replace(/^https?:\/\//, "").replace(/[^a-z0-9.-]/gi, "").slice(0, 40) || "report";
  }
  const date = new Date().toISOString().slice(0, 10);
  a.download = "site-review-" + host + "-" + date + ".json";

  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  toast("Report downloaded — " + a.download);
}

/* Import a previously exported report and restore the checklist. */
function importReport(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onerror = () => toast("Could not read that file.");
  reader.onload = () => {
    let data;
    try {
      data = JSON.parse(String(reader.result || ""));
    } catch (e) {
      toast("That file isn't a Site Review Lab report.");
      return;
    }
    if (!data || !Array.isArray(data.openIssues)) {
      toast("That file isn't a Site Review Lab report.");
      return;
    }

    const open = new Set(data.openIssues.map((i) => i.id));
    document.querySelectorAll('.item input[type="checkbox"]').forEach((b) => {
      const id = b.id.replace("chk-", "");
      b.checked = !open.has(id);
      b.closest(".item").classList.toggle("checked", b.checked);
    });

    if (typeof data.site === "string" && data.site !== "(not provided)") {
      $("siteUrl").value = data.site;
    }

    updateScore();
    saveState();
    toast("Report imported — " + open.size + " open issue(s) restored.");
  };
  reader.readAsText(file);
}

function resetAll() {
  document.querySelectorAll('.item input[type="checkbox"]').forEach((b) => {
    b.checked = false;
    b.closest(".item").classList.remove("checked");
  });
  $("siteUrl").value = "";
  updateScore();
  saveState();
  toast("Checklist reset.");
}

/* ---------- Boot ---------- */
function boot() {
  if (window.CHECKLIST && Array.isArray(window.CHECKLIST.categories)) {
    CHECKLIST = window.CHECKLIST;
    renderChecklist();
    restoreState();
    updateScore();
  } else {
    $("checklist").innerHTML =
      '<p class="dim center-note"><code>checklist.js</code> did not load — the toolkit cannot run without it. ' +
      "Check that the file sits next to <code>index.html</code>.</p>";
  }
}

$("btnExport").addEventListener("click", exportReport);
$("btnReset").addEventListener("click", resetAll);
$("importInput").addEventListener("change", (e) => {
  importReport(e.target.files[0]);
  e.target.value = "";
});
$("siteUrl").addEventListener("input", saveState);

boot();
