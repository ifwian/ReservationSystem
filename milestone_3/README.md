# FRAME Gaming Café — Milestone 3: Mock Data in JavaScript

| Milestone | 3 of 8 |
|---|---|
| Storage | None |

## Roadmap

| # | Goal | Progress |
|---|---|---|
| 1 | Static HTML page + basic CSS | ✅ done |
| 2 | Flexbox/Grid layout, responsive breakpoints, wrapped mobile nav (no JavaScript yet) | ✅ done |
| 3 | `app.js`: stations and pricing from a mock array, mobile menu button | ▶ **this step** |
| 4 | Reservation form with validation (saves nothing yet) | ⬜ later |
| 5 | localStorage `Store`, **Create**, confirmation | ⬜ later |
| 6 | Admin page: **Read**, status counts | ⬜ later |
| 7 | **Update** and **Delete** (CRUD complete) | ⬜ later |
| 8 | No double booking, search/filter, past-date check, `TESTING.md` | ⬜ later |

## What this milestone adds

- `app.js` with a `STATIONS` array (field names match future database columns)
- `showStations()` and `showPricing()` build the lists from the array
- Mobile menu button (open/close)
- Photo support: put `hero.jpg` next to `index.html` to replace the placeholder

## Files (new or changed since the last milestone)

| File | Status |
|---|---|
| `app.js` | NEW |
| `index.html` | CHANGED |
| `style.css` | CHANGED |

## How to run and test

Double-click `index.html`.

1. Open `index.html`
2. Edit the `STATIONS` array in `app.js`, reload
3. Stations and prices change; on a phone the MENU button opens and closes

## Talking point for our professor

> Now the stations live in one array and the page builds the lists from it, so we don't type the same thing twice. The field names are like database columns.

## Honest limitations

- Data is hard-coded in the array
- Nothing is saved yet

## Next

Milestone 4: the reservation form.

## Our notes

- [ ] Screenshot of this milestone
- [ ] Commit for this milestone
- [ ] Problems we ran into and what we changed:
- [ ] What we learned:
