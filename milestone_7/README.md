# FRAME Gaming Café — Milestone 7: Update and Delete

| Milestone | 7 of 8 |
|---|---|
| Storage | localStorage |

## Roadmap

| # | Goal | Progress |
|---|---|---|
| 1 | Static HTML page + basic CSS | ✅ done |
| 2 | Flexbox/Grid layout, responsive breakpoints, wrapped mobile nav (no JavaScript yet) | ✅ done |
| 3 | `app.js`: stations and pricing from a mock array, mobile menu button | ✅ done |
| 4 | Reservation form with validation (saves nothing yet) | ✅ done |
| 5 | localStorage `Store`, **Create**, confirmation | ✅ done |
| 6 | Admin page: **Read**, status counts | ✅ done |
| 7 | **Update** and **Delete** (CRUD complete) | ▶ **this step** |
| 8 | No double booking, search/filter, past-date check, `TESTING.md` | ⬜ later |

## What this milestone adds

- EDIT window for every field including status (`Store.update()`)
- DELETE with an "Are you sure…?" question (`Store.remove()`)
- Table and counts refresh after each change
- Reservation numbers are never reused

## Files (new or changed since the last milestone)

| File | Status |
|---|---|
| `admin.html` | CHANGED |
| `admin.js` | CHANGED |
| `app.js` | CHANGED |
| `style.css` | CHANGED |

## How to run and test

Open the folder with the VS Code **Live Server** extension (right-click `index.html` → Open with Live Server), or run `python -m http.server 8000` in this folder and open `http://localhost:8000`. Do not double-click: some browsers do not share localStorage between pages opened from disk.

1. In admin, click EDIT and change the status
2. Badge and counts change
3. Click DELETE: Cancel keeps it, OK removes it

## Talking point for our professor

> Update and Delete now work, so we have full CRUD. Delete asks for confirmation first.

## Honest limitations

- Admin page is public (no login)
- No double-booking rule yet

## Next

Milestone 8: rules, search and testing.

## Our notes

- [ ] Screenshot of this milestone
- [ ] Commit for this milestone
- [ ] Problems we ran into and what we changed:
- [ ] What we learned:
