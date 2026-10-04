// FRAME Gaming Cafe - app.js (Milestone 4)
//
// There is NO storage yet. The stations are a plain array (mock data) and the
// page builds the station list and the prices from it.
// Next: Milestone 4 adds the reservation form. The Store (localStorage) comes in Milestone 5.

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

// ---------- Stations + pricing (read from the STATIONS array) ----------
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
    var stations = STATIONS;   // mock data (no storage yet)
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
