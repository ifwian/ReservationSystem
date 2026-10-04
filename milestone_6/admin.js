// FRAME Gaming Cafe - admin.js
// READ   : Store.list()

var tableBody = document.getElementById("tableBody");
var tableInfo = document.getElementById("tableInfo");
var emptyNote = document.getElementById("emptyNote");


var allReservations = [];   // every stored reservation

var MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// ---------- Helpers ----------
function padId(id) {
  var text = String(id);
  while (text.length < 3) {
    text = "0" + text;
  }
  return text;
}

function formatDate(isoDate) {
  var parts = isoDate.split("-");
  return MONTHS[Number(parts[1]) - 1] + " " + parts[2] + ", " + parts[0];
}

// Stops names like "<b>" from being treated as HTML
function safe(text) {
  var div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ---------- READ ----------
function loadReservations() {
  try {
    allReservations = Store.list();
    updateCounts();
    showTable();
  } catch (error) {
    tableBody.innerHTML = "";
    tableInfo.textContent = "";
    emptyNote.textContent = "Could not load reservations. Try refreshing the page.";
    emptyNote.classList.remove("hidden");
  }
}

// ---------- Dashboard counts (calculated from the real data) ----------
function updateCounts() {
  var pending = 0;
  var confirmed = 0;
  var cancelled = 0;
  var completed = 0;

  for (var i = 0; i < allReservations.length; i++) {
    var status = allReservations[i].status;
    if (status === "Pending") pending++;
    if (status === "Confirmed") confirmed++;
    if (status === "Cancelled") cancelled++;
    if (status === "Completed") completed++;
  }

  function show(id, number) {
    document.getElementById(id).textContent = number < 10 ? "0" + number : number;
  }
  show("count-total", allReservations.length);
  show("count-pending", pending);
  show("count-confirmed", confirmed);
  show("count-cancelled", cancelled);
  show("count-completed", completed);
}

// ---------- Draw the table ----------
function getVisibleReservations() {
  return allReservations;
}

function showTable() {
  var list = getVisibleReservations();
  var html = "";

  for (var i = 0; i < list.length; i++) {
    var r = list[i];
    var statusClass = "status-" + r.status.toLowerCase();
    html +=
      "<tr>" +
        '<td data-label="ID" class="mono-cell">#' + padId(r.reservation_id) + "</td>" +
        '<td data-label="CUSTOMER">' + '<span class="cust">' + safe(r.name) + '<span class="cell-sub">' + safe(r.contact_number) + "</span></span></td>" +
        '<td data-label="STATION" class="mono-cell">' + safe(r.station_name) + "</td>" +
        '<td data-label="DATE" class="mono-cell">' + formatDate(r.reservation_date) + "</td>" +
        '<td data-label="TIME" class="mono-cell">' + r.start_time.substring(0, 5) + "</td>" +
        '<td data-label="DURATION" class="mono-cell">' + r.duration + " HR</td>" +
        '<td data-label="PLAYERS" class="mono-cell">' + r.number_of_players + "</td>" +
        '<td data-label="PAYMENT" class="mono-cell">' + safe(r.payment_method) + "</td>" +
        '<td data-label="STATUS"><span class="badge ' + statusClass + '">' + r.status + "</span></td>" +
      "</tr>";
  }
  tableBody.innerHTML = html;

  tableInfo.textContent = "SHOWING " + list.length + " OF " + allReservations.length;

  if (list.length === 0) {
    if (allReservations.length === 0) {
      emptyNote.textContent = "No reservations yet. New reservations from the reservation page will appear here.";
    } else {
      emptyNote.textContent = "No reservations to show.";
    }
    emptyNote.classList.remove("hidden");
  } else {
    emptyNote.classList.add("hidden");
  }
}

loadReservations();
