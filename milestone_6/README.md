# FRAME Gaming Café — Milestone 6: Admin Page: Read

| Milestone | 6 of 8 |
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
| 6 | Admin page: **Read**, status counts | ▶ **this step** |
| 7 | **Update** and **Delete** (CRUD complete) | ⬜ later |
| 8 | No double booking, search/filter, past-date check, `TESTING.md` | ⬜ later |

## What this milestone adds

- `admin.html` + `admin.js`: table of saved reservations, newest first
- `Store.list()` and `Store.get()`
- Counts for total, pending, confirmed, cancelled, completed (calculated, not typed)
- Colorless status badges; table stacks on phones
- Admin page is public: **no login**

## Files (new or changed since the last milestone)

| File | Status |
|---|---|
| `admin.html` | NEW |
| `admin.js` | NEW |
| `app.js` | CHANGED |
| `index.html` | CHANGED |
| `style.css` | CHANGED |

## How to run and test

Open the folder with the VS Code **Live Server** extension (right-click `index.html` → Open with Live Server), or run `python -m http.server 8000` in this folder and open `http://localhost:8000`. Do not double-click: some browsers do not share localStorage between pages opened from disk.

1. Make 2-3 reservations, open `admin.html`
2. They appear newest first; counts match
3. No edit/delete buttons yet

## Talking point for our professor

> We added the admin page to read the saved reservations. The counts are calculated from the real data. The page is public for now, which is not secure.

## Honest limitations

- Admin page is public (no login)
- No edit, delete, search or filter yet

## Next

Milestone 7: edit and delete.

## Our notes

- [ ] Screenshot of this milestone
- [ ] Commit for this milestone
- [ ] Problems we ran into and what we changed:
- [ ] What we learned:
