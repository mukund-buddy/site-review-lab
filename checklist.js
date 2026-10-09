/* Site Review Lab checklist — data as a script global (works on file://). Edit freely. */
window.CHECKLIST = {
  "meta": {
    "project": "Site Review Lab",
    "author": "mukund-buddy",
    "note": "Edit this file freely to add/remove checklist items. This is YOUR toolkit."
  },
  "categories": [
    {
      "id": "visual",
      "name": "Visual & UX",
      "weight": 25,
      "items": [
        {
          "id": "v1",
          "text": "Visual hierarchy is clear — eyes know where to look first",
          "severity": "major"
        },
        {
          "id": "v2",
          "text": "Text is readable everywhere (contrast + font size)",
          "severity": "critical"
        },
        {
          "id": "v3",
          "text": "Spacing feels consistent — nothing cramped, nothing floating",
          "severity": "minor"
        },
        {
          "id": "v4",
          "text": "Colors are consistent with one clear palette",
          "severity": "minor"
        },
        {
          "id": "v5",
          "text": "Buttons look clickable and have hover states",
          "severity": "major"
        },
        {
          "id": "v6",
          "text": "Layout works on mobile (375px), tablet and desktop",
          "severity": "critical"
        },
        {
          "id": "v7",
          "text": "Images/icons don't stretch, blur or break alignment",
          "severity": "minor"
        },
        {
          "id": "v8",
          "text": "No horizontal scroll on any screen size",
          "severity": "major"
        },
        {
          "id": "v9",
          "text": "Animations feel smooth, not laggy or distracting",
          "severity": "minor"
        },
        {
          "id": "v10",
          "text": "Empty states look intentional (not broken)",
          "severity": "minor"
        },
        {
          "id": "v11",
          "text": "Dark/light mode (if present) is fully consistent",
          "severity": "minor"
        },
        {
          "id": "v12",
          "text": "Page doesn't jump around while loading (no layout shift)",
          "severity": "major"
        }
      ]
    },
    {
      "id": "function",
      "name": "Functionality",
      "weight": 30,
      "items": [
        {
          "id": "f1",
          "text": "Every single link and button goes somewhere real",
          "severity": "critical"
        },
        {
          "id": "f2",
          "text": "Forms validate input and show helpful errors",
          "severity": "major"
        },
        {
          "id": "f3",
          "text": "Forms survive wrong input (no crash on empty/weird data)",
          "severity": "major"
        },
        {
          "id": "f4",
          "text": "Nothing breaks when JavaScript is slow or blocked",
          "severity": "minor"
        },
        {
          "id": "f5",
          "text": "Back button behaves as expected",
          "severity": "minor"
        },
        {
          "id": "f6",
          "text": "Keyboard navigation works (Tab order is sane)",
          "severity": "major"
        },
        {
          "id": "f7",
          "text": "Browser console has zero red errors on every page",
          "severity": "critical"
        },
        {
          "id": "f8",
          "text": "Refresh mid-action doesn't corrupt state",
          "severity": "minor"
        },
        {
          "id": "f9",
          "text": "Copy/paste works in all inputs",
          "severity": "minor"
        },
        {
          "id": "f10",
          "text": "Site works after a hard refresh (Ctrl+Shift+R)",
          "severity": "major"
        },
        {
          "id": "f11",
          "text": "404 page exists and is helpful",
          "severity": "minor"
        },
        {
          "id": "f12",
          "text": "Works in Chrome AND at least one other browser",
          "severity": "major"
        }
      ]
    },
    {
      "id": "content",
      "name": "Content",
      "weight": 15,
      "items": [
        {
          "id": "c1",
          "text": "No typos — read every heading and button label out loud",
          "severity": "major"
        },
        {
          "id": "c2",
          "text": "Headline tells me what this is within 5 seconds",
          "severity": "critical"
        },
        {
          "id": "c3",
          "text": "Placeholder text (lorem ipsum) is 100% gone",
          "severity": "critical"
        },
        {
          "id": "c4",
          "text": "Tone is consistent (no mixing formal + meme-speak randomly)",
          "severity": "minor"
        },
        {
          "id": "c5",
          "text": "Contact/info links point to real destinations",
          "severity": "major"
        },
        {
          "id": "c6",
          "text": "Page title + meta description exist and make sense",
          "severity": "major"
        },
        {
          "id": "c7",
          "text": "Dates, versions and numbers are accurate",
          "severity": "minor"
        }
      ]
    },
    {
      "id": "performance",
      "name": "Performance",
      "weight": 20,
      "items": [
        {
          "id": "p1",
          "text": "Page loads in under 3 seconds on normal wifi",
          "severity": "major"
        },
        {
          "id": "p2",
          "text": "Images are compressed / reasonably sized",
          "severity": "major"
        },
        {
          "id": "p3",
          "text": "No giant unused libraries for tiny features",
          "severity": "minor"
        },
        {
          "id": "p4",
          "text": "Scrolling stays at 60fps (no jank)",
          "severity": "minor"
        },
        {
          "id": "p5",
          "text": "Total page weight is sane (< 3MB ideally)",
          "severity": "minor"
        },
        {
          "id": "p6",
          "text": "Nothing blocks the main thread at startup",
          "severity": "minor"
        },
        {
          "id": "p7",
          "text": "Caching headers / CDN in use if it's a live site",
          "severity": "minor"
        }
      ]
    },
    {
      "id": "trust",
      "name": "Trust & Polish",
      "weight": 10,
      "items": [
        {
          "id": "t1",
          "text": "HTTPS works and http redirects to it",
          "severity": "critical"
        },
        {
          "id": "t2",
          "text": "Favicon exists (browser tab doesn't look default)",
          "severity": "minor"
        },
        {
          "id": "t3",
          "text": "Footer has working links (privacy, contact, etc.)",
          "severity": "minor"
        },
        {
          "id": "t4",
          "text": "No dead social icons",
          "severity": "major"
        },
        {
          "id": "t5",
          "text": "Site looks intentional even at ugly zoom levels (50%–200%)",
          "severity": "minor"
        },
        {
          "id": "t6",
          "text": "Print stylesheet or at least printable content",
          "severity": "minor"
        },
        {
          "id": "t7",
          "text": "Nothing embarrassing shows up in page source comments",
          "severity": "minor"
        }
      ]
    }
  ]
};
