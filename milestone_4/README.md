# FRAME Gaming Café — Milestone 4: Reservation Form (Validation Only)

| Milestone | 4 of 8 |
|---|---|
| Storage | None |

## Roadmap

| # | Goal | Progress |
|---|---|---|
| 1 | Static HTML page + basic CSS | ✅ done |
| 2 | Flexbox/Grid layout, responsive breakpoints, wrapped mobile nav (no JavaScript yet) | ✅ done |
| 3 | `app.js`: stations and pricing from a mock array, mobile menu button | ✅ done |
| 4 | Reservation form with validation (saves nothing yet) | ▶ **this step** |
| 5 | localStorage `Store`, **Create**, confirmation | ⬜ later |
| 6 | Admin page: **Read**, status counts | ⬜ later |
| 7 | **Update** and **Delete** (CRUD complete) | ⬜ later |
| 8 | No double booking, search/filter, past-date check, `TESTING.md` | ⬜ later |

## What this milestone adds

- `reservation.html` with 9 fields
- Checking in JavaScript: empty fields, valid email, players of at least 1
- Error messages under each field and a live price estimate in ₱
- Clicking a station on the landing page pre-selects it
- A valid form shows a message only. **Nothing is saved**

## Files (new or changed since the last milestone)

| File | Status |
|---|---|
| `app.js` | CHANGED |
| `index.html` | CHANGED |
| `reservation.html` | NEW |
| `reservation.js` | NEW |
| `style.css` | CHANGED |

## How to run and test

Open the folder with the VS Code **Live Server** extension (right-click `index.html` → Open with Live Server), or run `python -m http.server 8000` in this folder and open `http://localhost:8000`. Do not double-click: some browsers do not share localStorage between pages opened from disk.

1. Use Live Server and open `reservation.html`
2. Submit empty, then with a bad email, then valid
3. Errors show per field; valid shows a message but nothing is stored

## Talking point for our professor

> We built the reservation form and its validation. It does not save anything yet, because we want to be sure the form works before adding storage.

## Honest limitations

- Nothing is saved
- No admin page

## Next

Milestone 5: save to localStorage (Create).

## Our notes

- [ ] Screenshot of this milestone
- [ ] Commit for this milestone
- [ ] Problems we ran into and what we changed:
- [ ] What we learned:
