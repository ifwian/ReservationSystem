# FRAME Gaming Café — Milestone 5: localStorage and Create

| Milestone | 5 of 8 |
|---|---|
| Storage | localStorage |

## Roadmap

| # | Goal | Progress |
|---|---|---|
| 1 | Static HTML page + basic CSS | ✅ done |
| 2 | Flexbox/Grid layout, responsive breakpoints, wrapped mobile nav (no JavaScript yet) | ✅ done |
| 3 | `app.js`: stations and pricing from a mock array, mobile menu button | ✅ done |
| 4 | Reservation form with validation (saves nothing yet) | ✅ done |
| 5 | localStorage `Store`, **Create**, confirmation | ▶ **this step** |
| 6 | Admin page: **Read**, status counts | ⬜ later |
| 7 | **Update** and **Delete** (CRUD complete) | ⬜ later |
| 8 | No double booking, search/filter, past-date check, `TESTING.md` | ⬜ later |

## What this milestone adds

- `Store` in `app.js`: `Store.stations()` and `Store.create()` save to **localStorage**
- Reservation numbers from a counter
- Confirmation panel after a valid submit
- Validation repeated inside `Store` as protection

## Files (new or changed since the last milestone)

| File | Status |
|---|---|
| `app.js` | CHANGED |
| `reservation.html` | CHANGED |
| `reservation.js` | CHANGED |
| `style.css` | CHANGED |

## How to run and test

Open the folder with the VS Code **Live Server** extension (right-click `index.html` → Open with Live Server), or run `python -m http.server 8000` in this folder and open `http://localhost:8000`. Do not double-click: some browsers do not share localStorage between pages opened from disk.

1. Use Live Server, make a reservation
2. Confirmation shows a number like #001
3. DevTools → Application → Local Storage → `frame.reservations`

## Talking point for our professor

> Now reservations are saved in localStorage through one object called Store. This is the Create part of CRUD.

## Honest limitations

- Data stays in this browser only
- No way to view reservations except DevTools
- Same slot can be booked twice (rule is in Milestone 8)

## Next

Milestone 6: admin page (Read).

## Our notes

- [ ] Screenshot of this milestone
- [ ] Commit for this milestone
- [ ] Problems we ran into and what we changed:
- [ ] What we learned:
