// FRAME Gaming Cafe - app.js (Milestone 8)
//
// Loaded on every page. It has three parts:
//   1. STATIONS  - the starting data
//   2. Store     - saves and loads data with localStorage (our temporary database)
//   3. Landing page code + mobile menu

// Starting data for the stations. The field names match the columns of a
// future "stations" database table, so moving to a database later is easy.
var STATIONS = [
  { station_id: 1, station_name: "PC-01",  station_type: "Gaming PC",     price_per_hour: 50,  status: "Available" },
  { station_id: 2, station_name: "PC-02",  station_type: "Gaming PC",     price_per_hour: 50,  status: "Available" },
  { station_id: 3, station_name: "PC-03",  station_type: "High-End PC",   price_per_hour: 70,  status: "Available" },
  { station_id: 4, station_name: "PS5-01", station_type: "PlayStation 5", price_per_hour: 80,  status: "Available" },
  { station_id: 5, station_name: "VIP-01", station_type: "VIP Room",      price_per_hour: 150, status: "Available" }
];

// =====================================================================
//  Store: our "database" for now. It saves data in the browser (localStorage).
//  The pages only talk to Store, so later we can replace the inside of these
//  functions with real database calls and the pages stay the same.
// =====================================================================

var KEY_STATIONS = "frame.stations";
var KEY_RESERVATIONS = "frame.reservations";
var KEY_NEXT_ID = "frame.nextReservationId";

// localStorage only keeps text, so we convert with JSON.
function loadData(key, fallback) {
  var text = localStorage.getItem(key);
  if (text === null) {
    return fallback;
  }
  return JSON.parse(text);
}

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// An Error that also has a number: 400 = bad data, 404 = not found, 409 = conflict
function makeError(message, status) {
  var error = new Error(message);
  error.status = status;
  return error;
}

// Gives every new reservation its own number (like AUTO_INCREMENT in MySQL).
function takeNextId() {
  var id = Number(loadData(KEY_NEXT_ID, 1));
  saveData(KEY_NEXT_ID, id + 1);
  return id;
}

// Form values are text, so change them to the right types before saving.
function cleanData(data) {
  var time = String(data.start_time || "").trim();
  if (time.length === 5) {
    time = time + ":00";
  }
  return {
    station_id: Number(data.station_id),
    reservation_date: String(data.reservation_date || ""),
    start_time: time,
    duration: Number(data.duration),
    number_of_players: Number(data.number_of_players),
    payment_method: String(data.payment_method || "").trim(),
    status: String(data.status || "Pending").trim(),
    name: String(data.name || "").trim(),
    contact_number: String(data.contact_number || "").trim(),
    email: String(data.email || "").trim()
  };
}

// Returns "" when everything is fine, or a message saying what is wrong.
function validateData(row) {
  if (!row.name) return "Name is required.";
  if (!row.contact_number) return "Contact number is required.";
  if (!row.email || row.email.indexOf("@") === -1) return "A valid email is required.";
  if (!row.station_id) return "Please choose a station.";
  if (!row.reservation_date) return "Please choose a date.";
  if (!row.start_time) return "Please choose a start time.";
  if (!row.duration || row.duration < 1) return "Please choose a duration.";
  if (!row.number_of_players || row.number_of_players < 1) return "Players must be at least 1.";
  if (!row.payment_method) return "Please choose a payment method.";
  return "";
}

// Adds station_name, station_type and price_per_hour to a reservation
// (this is what a SQL JOIN would do).
function withStation(row) {
  var stations = Store.stations();
  var copy = {};
  for (var key in row) {
    copy[key] = row[key];
  }
  copy.station_name = "Unknown";
  copy.station_type = "-";
  copy.price_per_hour = 0;
  for (var i = 0; i < stations.length; i++) {
    if (stations[i].station_id === row.station_id) {
      copy.station_name = stations[i].station_name;
      copy.station_type = stations[i].station_type;
      copy.price_per_hour = stations[i].price_per_hour;
    }
  }
  return copy;
}

var Store = {};

// The stations are copied into localStorage the first time the site opens.
Store.stations = function () {
  var saved = loadData(KEY_STATIONS, null);
  if (saved === null) {
    saveData(KEY_STATIONS, STATIONS);
    return STATIONS;
  }
  return saved;
};

// CREATE
Store.create = function (data) {
  var row = cleanData(data);
  var problem = validateData(row);
  if (problem !== "") {
    throw makeError(problem, 400);
  }
  // Only for NEW reservations, so an admin can still edit old ones (for example mark them Completed).
  if (row.reservation_date < todayString()) {
    throw makeError("The date cannot be in the past.", 400);
  }
  if (isDoubleBooked(row.station_id, row.reservation_date, row.start_time, row.duration, 0)) {
    throw makeError(BOOKED_MESSAGE, 409);
  }
  var rows = loadData(KEY_RESERVATIONS, []);
  row.reservation_id = takeNextId();
  row.status = "Pending";
  rows.push(row);
  saveData(KEY_RESERVATIONS, rows);
  return withStation(row);
};

// Finds the position of a reservation in the array (-1 if it is not there).
function indexOfId(rows, id) {
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i].reservation_id) === String(id)) {
      return i;
    }
  }
  return -1;
}

// READ: all reservations, newest first
Store.list = function () {
  var rows = loadData(KEY_RESERVATIONS, []);
  rows.sort(function (a, b) {
    return b.reservation_id - a.reservation_id;
  });
  var result = [];
  for (var i = 0; i < rows.length; i++) {
    result.push(withStation(rows[i]));
  }
  return result;
};

// READ: one reservation (or null)
Store.get = function (id) {
  var rows = loadData(KEY_RESERVATIONS, []);
  var index = indexOfId(rows, id);
  if (index === -1) {
    return null;
  }
  return withStation(rows[index]);
};

// UPDATE
Store.update = function (id, data) {
  var rows = loadData(KEY_RESERVATIONS, []);
  var index = indexOfId(rows, id);
  if (index === -1) {
    throw makeError("Reservation not found.", 404);
  }
  var row = cleanData(data);
  var problem = validateData(row);
  if (problem !== "") {
    throw makeError(problem, 400);
  }
  if (ALLOWED_STATUS.indexOf(row.status) === -1) {
    throw makeError("Invalid status.", 400);
  }
  if (row.status !== "Cancelled" &&
      isDoubleBooked(row.station_id, row.reservation_date, row.start_time, row.duration, id)) {
    throw makeError(BOOKED_MESSAGE, 409);
  }
  row.reservation_id = rows[index].reservation_id;
  rows[index] = row;
  saveData(KEY_RESERVATIONS, rows);
  return withStation(row);
};

// DELETE
Store.remove = function (id) {
  var rows = loadData(KEY_RESERVATIONS, []);
  var index = indexOfId(rows, id);
  if (index === -1) {
    throw makeError("Reservation not found.", 404);
  }
  rows.splice(index, 1);
  saveData(KEY_RESERVATIONS, rows);
  return { message: "Reservation deleted." };
};

var BOOKED_MESSAGE = "THIS STATION IS ALREADY RESERVED FOR THIS DATE AND TIME.";
var ALLOWED_STATUS = ["Pending", "Confirmed", "Cancelled", "Completed"];

// "18:30:00" -> 1110 (minutes after midnight)
function toMinutes(time) {
  var parts = time.split(":");
  return Number(parts[0]) * 60 + Number(parts[1]);
}

// Is this station already booked at any time that overlaps the new booking?
// Example: 18:00 for 2 hours blocks 18:00 to 20:00, so 19:00 is rejected too.
// "ignoreId" lets an edit skip the reservation it is editing.
// Cancelled reservations do not block a slot.
function isDoubleBooked(station_id, date, time, duration, ignoreId) {
  var start = toMinutes(time);
  var end = start + duration * 60;
  var rows = loadData(KEY_RESERVATIONS, []);
  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    if (r.station_id !== station_id || r.reservation_date !== date) continue;
    if (r.status === "Cancelled" || r.reservation_id === Number(ignoreId || 0)) continue;
    var rStart = toMinutes(r.start_time);
    var rEnd = rStart + r.duration * 60;
    if (start < rEnd && rStart < end) {
      return true;
    }
  }
  return false;
}

// Today as "2026-10-05", to compare with the date from the form.
function todayString() {
  var d = new Date();
  var month = String(d.getMonth() + 1).padStart(2, "0");
  var day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + month + "-" + day;
}

// Handy for demos: type Store.reset() in the browser console to delete all saved data.
Store.reset = function () {
  localStorage.removeItem(KEY_STATIONS);
  localStorage.removeItem(KEY_RESERVATIONS);
  localStorage.removeItem(KEY_NEXT_ID);
};

// =====================================================================
//  Landing page + mobile menu (the menu runs on every page)
// =====================================================================

// ---------- Mobile menu ----------
var navToggle = document.getElementById("navToggle");
var navList = document.getElementById("navList");

if (navToggle && navList) {
  navToggle.addEventListener("click", function () {
    var isOpen = navList.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close the menu after picking a link
  navList.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      navList.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ---------- Stations + pricing (read from Store) ----------
var stationList = document.getElementById("stationList");
var pricingGrid = document.getElementById("pricingGrid");

// Turns 5 into "05"
function twoDigits(number) {
  if (number < 10) {
    return "0" + number;
  }
  return String(number);
}

function showStations(stations) {
  var html = "";
  for (var i = 0; i < stations.length; i++) {
    var s = stations[i];
    var statusClass = s.status === "Available" ? "is-available" : "";
    html +=
      '<a class="station-row" href="reservation.html?station=' + s.station_id + '">' +
        '<span class="mono muted">' + twoDigits(i + 1) + "</span>" +
        '<span class="station-name">' + s.station_name + "</span>" +
        '<span class="station-type">' + s.station_type + "</span>" +
        '<span class="mono station-price">₱' + s.price_per_hour + " / HR</span>" +
        '<span class="status-text ' + statusClass + '">' + s.status.toUpperCase() + "</span>" +
        '<span class="arrow" aria-hidden="true">→</span>' +
      "</a>";
  }
  stationList.innerHTML = html;
}

// One pricing block per station type (the first station of each type sets the price)
function showPricing(stations) {
  var seenTypes = [];
  var html = "";
  for (var i = 0; i < stations.length; i++) {
    var s = stations[i];
    if (seenTypes.includes(s.station_type)) {
      continue;
    }
    seenTypes.push(s.station_type);

    // "Gaming PC" is shown as "Regular PC" in the pricing list
    var priceName = s.station_type;
    if (priceName === "Gaming PC") {
      priceName = "Regular PC";
    }
    html +=
      '<div class="price-item">' +
        '<span class="mono muted">' + twoDigits(seenTypes.length) + "</span>" +
        '<p class="price-name">' + priceName.toUpperCase() + "</p>" +
        '<p class="price-value">₱' + s.price_per_hour + '<span class="mono muted"> / HOUR</span></p>' +
      "</div>";
  }
  pricingGrid.innerHTML = html;
}

function loadStations() {
  if (!stationList) {
    return; // not the landing page
  }
  try {
    var stations = Store.stations();
    showStations(stations);
    showPricing(stations);
    document.getElementById("stationCount").textContent = twoDigits(stations.length);
  } catch (error) {
    var note = '<p class="empty-note">Stations could not be loaded. Try refreshing the page.</p>';
    stationList.innerHTML = note;
    pricingGrid.innerHTML = note;
  }
}

loadStations();
