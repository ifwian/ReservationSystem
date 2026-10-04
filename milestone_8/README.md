# FRAME Gaming Café — Milestone 8: Rules, Search, Polish and Testing

| Milestone | 8 of 8 |
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
| 7 | **Update** and **Delete** (CRUD complete) | ✅ done |
| 8 | No double booking, search/filter, past-date check, `TESTING.md` | ▶ **this step** |

## What this milestone adds

- Double-booking rule on create and edit; cancelled bookings free their slot
- The rule compares **time ranges**, so 18:00 for 2h also blocks 19:00
- Past dates rejected for new reservations
- Search (name, ID, station) and status filter with "SHOWING x OF y"
- `Store.reset()` for demos, and `TESTING.md` with a blank results table

## Files (new or changed since the last milestone)

| File | Status |
|---|---|
| `TESTING.md` | NEW |
| `admin.html` | CHANGED |
| `admin.js` | CHANGED |
| `app.js` | CHANGED |
| `style.css` | CHANGED |

## How to run and test

Open the folder with the VS Code **Live Server** extension (right-click `index.html` → Open with Live Server), or run `python -m http.server 8000` in this folder and open `http://localhost:8000`. Do not double-click: some browsers do not share localStorage between pages opened from disk.

1. Book the same station and time twice, then 18:00 for 2h and 19:00
2. Both are rejected; a past date is rejected
3. Search and filter the table; run the table in `TESTING.md`

## Talking point for our professor

> We added the rules and search, then tested with a table where we write only real results. The next step is to talk about a real database, because localStorage is per browser.

## Honest limitations

- Data stays in one browser; no shared data between devices
- No real login, and localStorage can be edited in DevTools
- Bookings that cross midnight are not handled

## Next

Consultation: pitch Node.js + Express + MySQL, because localStorage only keeps data in one browser.

## Our notes

- [ ] Screenshot of this milestone
- [ ] Commit for this milestone
- [ ] Problems we ran into and what we changed:
- [ ] What we learned:
