# Testing — Milestone 8

Fill in **Actual Result** and **Status** (Pass / Fail / Not tested) only after you really try each test. Tip: type `Store.reset()` in the browser console and refresh to start clean.

| # | Test | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| T01 | Submit the form with everything empty | Error under each field. Nothing saved. | | |
| T02 | Valid reservation | Confirmation with a reservation number. Row appears in admin. | | |
| T03 | Invalid email (`abc`) | "Enter a valid email" message. | | |
| T04 | Players = 0 | "Players must be at least 1." | | |
| T05 | Price estimate (PC-03, 2 hours) | ₱140. | | |
| T06 | Date in the past (pick it, and also type it) | "The date cannot be in the past." (fixed in this milestone) | | |
| T07 | Duplicate: same station, date and start time | "THIS STATION IS ALREADY RESERVED..." | | |
| T08 | Overlap: PC-01 18:00 for 2h, then PC-01 19:00 same day | Rejected (fixed in this milestone) | | |
| T09 | Back-to-back: PC-01 18:00 for 2h, then PC-01 20:00 same day | Accepted | | |
| T10 | Different station, same date and time | Accepted | | |
| T11 | View reservations in admin | Newest first. Counts match the rows. | | |
| T12 | Edit a reservation (status → Confirmed) | Badge and counts change. Still there after refresh. | | |
| T13 | Edit an old reservation (past date) to Completed | Allowed (past-date rule is only for new bookings). | | |
| T14 | Edit into a taken slot | Edit window shows the "already reserved" message. | | |
| T15 | Delete → press Cancel | Reservation stays. | | |
| T16 | Delete → press OK | Row disappears. Counts go down. | | |
| T17 | Cancelled booking frees the slot | A new booking in that slot is accepted. | | |
| T18 | Search by name, by ID (`004` and `#004`), by station | Only matching rows. "SHOWING x OF y" is right. | | |
| T19 | Each status filter + search together | Both conditions apply. | | |
| T20 | Search with no match | "No reservations match..." message. | | |
| T21 | localStorage keys | `frame.stations`, `frame.reservations`, `frame.nextReservationId` exist. | | |
| T22 | Refresh the page | Data is still there. | | |
| T23 | Open in a second browser or private window | Empty. Data is per browser (this is the limitation we pitch a database for). | | |
| T24 | `Store.reset()` in the console, then refresh | Everything is cleared. | | |
| T25 | All menu and page links | Every link goes to the right place. | | |
| T26 | Phone width (about 390px) on all 3 pages | No sideways scrolling. Menu works. Admin table is stacked. | | |
| T27 | Tablet width (about 820px) | Layout still looks neat. | | |
