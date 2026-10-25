# 🔍 Site Review Lab

![vanilla JS](https://img.shields.io/badge/vanilla-JS-f7df1e?logo=javascript&logoColor=black)
![45 checks](https://img.shields.io/badge/checklist-45%20items-ffb000)
![license](https://img.shields.io/badge/license-MIT-4dd0e1)

**A structured QA & review toolkit for websites — the exact checklist I use when I test and refine sites.**

> Part of [The Antigle](https://github.com/mukund-buddy) 🔥 — built with AI assistance, tested and refined by hand.

**Live demo:**  [link](https://mukund-buddy.github.io/site-review-lab/)
---

## 🎯 Why This Exists

This is the most "me" project in my GitHub. My actual workflow as a builder is:

> AI generates a site → **I test it like a suspicious user** → I note everything wrong → it gets fixed → repeat.

Most people skip the middle part. This toolkit turns that middle part into a
repeatable, scoreable process. The checklist isn't invented — it's what I
genuinely click through on every site I build or refine.

## ✨ What's Inside

- **45 checklist items** across 5 categories (Visual/UX, Function, Content, Performance, Trust)
- **Severity levels** — critical / major / minor, so you know what to fix first
- **Live scoring** — weighted score updates as you check items (data-driven, easy to edit)
- **Per-site reports** — enter any URL, review it, export the report as JSON
- **Zero setup** — open `index.html`, review, done. Nothing leaves your browser.

## 🚀 How It Works

```
index.html     →  the review UI (checklist + live score + report)
style.css      →  dark, focused, tool-like
checklist.js   →  THE HEART — all rules live here, edit freely
app.js         →  reads the checklist data, renders it, calculates score, exports report
```

**The cool part for learners:** the entire checklist is data (`checklist.js`),
not code. Want to add your own rule? Add one object. No JS knowledge needed.
(It's loaded as a plain script, so the tool works even from a `file://` double-click.)

## 🗺️ Roadmap

- [x] Checklist + weighted scoring (v1)
- [x] JSON report export
- [ ] Screenshot attachments per issue
- [ ] Comparison mode (before vs after redesign)
- [ ] Shareable report links

## 🧑‍💻 Built Differently (Honest Note)

AI-assisted, human-tested. I use this on my own sites before anyone else sees
them. If a rule in the checklist is pointless, I delete it — the list is
curated by actually using it, not generated once and forgotten.

## 🏷️ Suggested GitHub Topics

`website-review` `qa` `checklist` `site-audit` `scoring` `developer-tools` `vanilla-js` `client-side` `the-antigle`

## 📄 License

MIT
