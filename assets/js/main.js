/* ============================================
   Events Platform — Main JavaScript
   ============================================ */

const EVENTS_DATA = [
  {
    id: 1,
    title: "Summer Music Festival",
    category: "music",
    date: "2026-07-08",
    address: "Central Park, Downtown",
    place: "Main Stage Arena",
    image: "assets/img/event-music.jpg",
    images: ["assets/img/event-music.jpg", "assets/img/gallery-1.jpg", "assets/img/gallery-2.jpg"],
    description: "Join us for an unforgettable evening of live music featuring top local and international artists. Food trucks, art installations, and family-friendly activities throughout the day.",
    shortDescription: "Live music festival with top artists and food trucks.",
    trending: true
  },
  {
    id: 2,
    title: "City Marathon 2026",
    category: "sport",
    date: "2026-07-10",
    address: "Riverside Boulevard",
    place: "Starting Line — City Hall",
    image: "assets/img/event-sport.jpg",
    images: ["assets/img/event-sport.jpg", "assets/img/gallery-3.jpg"],
    description: "The annual city marathon welcomes runners of all levels. Choose from full marathon, half marathon, or 5K fun run. Registration includes a commemorative medal and refreshments.",
    shortDescription: "Annual marathon for all skill levels — 5K to full marathon.",
    trending: true
  },
  {
    id: 3,
    title: "Family Fun Day",
    category: "family",
    date: "2026-07-06",
    address: "Green Valley Park",
    place: "Community Center Grounds",
    image: "assets/img/event-family.jpg",
    images: ["assets/img/event-family.jpg"],
    description: "A day packed with games, face painting, bounce houses, and workshops for kids and parents. Free entry for children under 12.",
    shortDescription: "Games, workshops, and activities for the whole family.",
    trending: true
  },
  {
    id: 4,
    title: "Heritage Culture Expo",
    category: "culture",
    date: "2026-07-12",
    address: "Museum District",
    place: "National Heritage Hall",
    image: "assets/img/event-culture.jpg",
    images: ["assets/img/event-culture.jpg", "assets/img/gallery-4.jpeg"],
    description: "Explore traditions, crafts, and cuisines from around the world. Live demonstrations, cultural performances, and artisan market stalls.",
    shortDescription: "World cultures showcase with crafts, food, and performances.",
    trending: true
  },
  {
    id: 5,
    title: "Street Food Festival",
    category: "food",
    date: "2026-07-15",
    address: "Harbor Square",
    place: "Waterfront Promenade",
    image: "assets/img/event-food.jpg",
    images: ["assets/img/event-food.jpg"],
    description: "Taste dishes from over 40 food vendors representing cuisines from every continent. Cooking demos and chef meet-and-greets included.",
    shortDescription: "40+ vendors serving global street food by the waterfront.",
    trending: false
  },
  {
    id: 6,
    title: "Modern Art Exhibition",
    category: "art",
    date: "2026-07-18",
    address: "Gallery Lane, Arts Quarter",
    place: "Contemporary Art Museum",
    image: "assets/img/event-art.jpg",
    images: ["assets/img/event-art.jpg", "assets/img/gallery-5.jpg", "assets/img/gallery-6.jpeg"],
    description: "Featuring works from emerging and established contemporary artists. Guided tours available every hour. Opening night reception with the artists.",
    shortDescription: "Contemporary art from emerging and established artists.",
    trending: false
  },
  {
    id: 7,
    title: "Youth Soccer Tournament",
    category: "sport",
    date: "2026-07-20",
    address: "Sports Complex, North Side",
    place: "Field A & B",
    image: "assets/img/event-sport-2.jpg",
    images: ["assets/img/event-sport-2.jpg"],
    description: "Regional youth soccer championship for ages 10–18. Come support local teams and enjoy concessions and halftime entertainment.",
    shortDescription: "Regional youth soccer championship, ages 10–18.",
    trending: false
  },
  {
    id: 8,
    title: "Jazz Under the Stars",
    category: "music",
    date: "2026-07-22",
    address: "Rooftop Terrace, Sky Tower",
    place: "Level 30 Observatory",
    image: "assets/img/event-music-2.jpg",
    images: ["assets/img/event-music-2.jpg"],
    description: "An intimate evening of jazz with panoramic city views. Limited seating — reserve early. Cocktail and dessert menu available.",
    shortDescription: "Intimate jazz evening with panoramic city views.",
    trending: true
  }
];

const CATEGORIES = [
  { id: "sport", label: "Sport", icon: "fa-futbol" },
  { id: "music", label: "Music", icon: "fa-music" },
  { id: "family", label: "Family", icon: "fa-people-group" },
  { id: "culture", label: "Culture", icon: "fa-landmark" },
  { id: "food", label: "Food", icon: "fa-utensils" },
  { id: "art", label: "Art", icon: "fa-palette" }
];

/* ---------- Utilities ---------- */
function formatDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function getEventById(id) {
  return EVENTS_DATA.find(e => e.id === parseInt(id, 10));
}

function getTrendingEvents() {
  return EVENTS_DATA.filter(e => e.trending);
}

function getNewestEvents(limit = 6) {
  return [...EVENTS_DATA]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, limit);
}

function getRelatedEvents(currentId, category, limit = 3) {
  return EVENTS_DATA
    .filter(e => e.id !== currentId && e.category === category)
    .slice(0, limit);
}

function placeholderImg(text) {
  return `https://placehold.co/600x400/2563eb/ffffff?text=${encodeURIComponent(text)}`;
}

function getImageSrc(path, fallbackText) {
  return path && !path.startsWith("http") ? path : (path || placeholderImg(fallbackText));
}

/* ---------- Dark Mode ---------- */
function initDarkMode() {
  const toggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcon(saved);

  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector("#themeToggle i");
  if (icon) {
    icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
}

/* ---------- Active Nav Link ---------- */
function setActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-navbar .nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

/* ---------- Event Card HTML ---------- */
function createEventCard(event, showDetailsBtn = true) {
  const imgSrc = getImageSrc(event.image, event.title);
  return `
    <div class="col-md-6 col-lg-4 mb-4">
      <div class="card event-card h-100">
        <img src="${imgSrc}" class="card-img-top" alt="${event.title}"
             onerror="this.src='${placeholderImg(event.title)}'">
        <div class="card-body">
          <span class="badge badge-category badge-${event.category} mb-2">${capitalize(event.category)}</span>
          <h5 class="card-title">${event.title}</h5>
          <div class="event-meta">
            <span><i class="fa-regular fa-calendar"></i> ${formatDate(event.date)}</span>
            <span><i class="fa-solid fa-location-dot"></i> ${event.place}</span>
            <span><i class="fa-solid fa-map-pin"></i> ${event.address}</span>
          </div>
          <p class="card-text">${event.shortDescription}</p>
          ${showDetailsBtn ? `<a href="event.html?id=${event.id}" class="btn btn-primary btn-sm mt-auto align-self-start">View Details</a>` : ""}
        </div>
      </div>
    </div>`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ---------- Index Page ---------- */
function initIndexPage() {
  renderTrendingEvents();
  renderCategoryBadges();
  renderNewestEvents();
}

function renderTrendingEvents() {
  const container = document.getElementById("trendingEvents");
  if (!container) return;

  const trending = getTrendingEvents();
  container.innerHTML = trending.map(event => {
    const imgSrc = getImageSrc(event.image, event.title);
    return `
      <div class="trend-card card">
        <div class="card-img-wrapper">
          <img src="${imgSrc}" class="card-img-top" alt="${event.title}"
               onerror="this.src='${placeholderImg(event.title)}'">
          <span class="badge-trend"><i class="fa-solid fa-fire"></i> Trending</span>
        </div>
        <div class="card-body">
          <span class="badge badge-category badge-${event.category}">${capitalize(event.category)}</span>
          <h5 class="card-title mt-2">${event.title}</h5>
          <p class="card-text text-muted small">${formatDate(event.date)} · ${event.place}</p>
          <a href="event.html?id=${event.id}" class="btn btn-outline-primary btn-sm">Learn More</a>
        </div>
      </div>`;
  }).join("");
}

function renderCategoryBadges() {
  const container = document.getElementById("categoryBadges");
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <a href="events.html?category=${cat.id}" class="category-badge">
      <i class="fa-solid ${cat.icon}"></i> ${cat.label}
    </a>
  `).join("");
}

function renderNewestEvents() {
  const container = document.getElementById("newestEvents");
  if (!container) return;

  const newest = getNewestEvents();
  container.innerHTML = newest.map(e => createEventCard(e)).join("");
}

/* ---------- Events List Page ---------- */
function initEventsPage() {
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get("category");

  if (categoryParam) {
    const catSelect = document.getElementById("filterCategory");
    if (catSelect) catSelect.value = categoryParam;
  }

  renderAllEvents();
  bindEventFilters();
}

function renderAllEvents(events = EVENTS_DATA) {
  const container = document.getElementById("eventsList");
  const noResults = document.getElementById("noResults");
  if (!container) return;

  if (events.length === 0) {
    container.innerHTML = "";
    if (noResults) noResults.classList.remove("d-none");
    return;
  }

  if (noResults) noResults.classList.add("d-none");
  container.innerHTML = events.map(e => createEventCard(e)).join("");
}

function bindEventFilters() {
  const searchInput = document.getElementById("searchEvents");
  const filterDate = document.getElementById("filterDate");
  const filterCategory = document.getElementById("filterCategory");
  const filterAddress = document.getElementById("filterAddress");
  const sortBy = document.getElementById("sortBy");
  const resetBtn = document.getElementById("resetFilters");

  const applyFilters = () => {
    let filtered = [...EVENTS_DATA];

    const search = searchInput?.value.trim().toLowerCase() || "";
    if (search) {
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(search) ||
        e.shortDescription.toLowerCase().includes(search) ||
        e.address.toLowerCase().includes(search)
      );
    }

    const dateVal = filterDate?.value || "";
    if (dateVal) {
      filtered = filtered.filter(e => e.date === dateVal);
    }

    const catVal = filterCategory?.value || "";
    if (catVal) {
      filtered = filtered.filter(e => e.category === catVal);
    }

    const addrVal = filterAddress?.value.trim().toLowerCase() || "";
    if (addrVal) {
      filtered = filtered.filter(e => e.address.toLowerCase().includes(addrVal));
    }

    const sort = sortBy?.value || "date-asc";
    if (sort === "date-asc") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sort === "date-desc") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === "category") {
      filtered.sort((a, b) => a.category.localeCompare(b.category));
    }

    renderAllEvents(filtered);
  };

  [searchInput, filterDate, filterCategory, filterAddress, sortBy].forEach(el => {
    if (el) el.addEventListener("input", applyFilters);
    if (el && el.tagName === "SELECT") el.addEventListener("change", applyFilters);
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (filterDate) filterDate.value = "";
      if (filterCategory) filterCategory.value = "";
      if (filterAddress) filterAddress.value = "";
      if (sortBy) sortBy.value = "date-asc";
      renderAllEvents();
      if (document.getElementById("noResults")) {
        document.getElementById("noResults").classList.add("d-none");
      }
    });
  }
}

/* ---------- Event Detail Page ---------- */
function initEventDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const event = getEventById(id);

  if (!event) {
    document.getElementById("eventDetailContent").innerHTML = `
      <div class="alert alert-warning text-center">
        <i class="fa-solid fa-circle-exclamation"></i> Event not found.
        <a href="events.html" class="alert-link">Browse all events</a>
      </div>`;
    return;
  }

  document.title = `${event.title} — EventHub`;

  const imgSrc = getImageSrc(event.image, event.title);
  document.getElementById("eventDetailContent").innerHTML = `
    <div class="event-detail-hero">
      <img src="${imgSrc}" alt="${event.title}" onerror="this.src='${placeholderImg(event.title)}'">
      <div class="overlay">
        <div>
          <span class="badge badge-category badge-${event.category} mb-2">${capitalize(event.category)}</span>
          <h1>${event.title}</h1>
        </div>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-lg-8">
        <div class="event-meta mb-3" style="font-size: 1rem;">
          <span><i class="fa-regular fa-calendar"></i> ${formatDate(event.date)}</span>
          <span><i class="fa-solid fa-location-dot"></i> ${event.place}</span>
          <span><i class="fa-solid fa-map-pin"></i> ${event.address}</span>
        </div>
        <p class="lead">${event.shortDescription}</p>
        <p>${event.description}</p>

        <h4 class="mt-4 mb-3">Photo Gallery</h4>
        <div class="gallery-grid mb-4">
          ${event.images.map((img, i) => `
            <img src="${getImageSrc(img, event.title + ' ' + (i + 1))}" alt="Gallery ${i + 1}"
                 data-bs-toggle="modal" data-bs-target="#galleryModal"
                 data-img="${getImageSrc(img, event.title + ' ' + (i + 1))}"
                 onerror="this.src='${placeholderImg(event.title + ' ' + (i + 1))}'"
                 class="gallery-thumb">
          `).join("")}
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Location</h5>
            <img src="assets/img/map.jpg" alt="Map" class="map-placeholder mb-3">
            <p class="small text-muted mb-0"><i class="fa-solid fa-map-pin"></i> ${event.address}</p>
          </div>
        </div>
        <div class="action-buttons">
          <button class="btn btn-primary" id="addToCalendar">
            <i class="fa-regular fa-calendar-plus"></i> Add to Calendar
          </button>
          <button class="btn btn-outline-primary" id="shareEvent" data-bs-toggle="modal" data-bs-target="#shareModal">
            <i class="fa-solid fa-share-nodes"></i> Share Event
          </button>
        </div>
      </div>
    </div>

    <section class="mt-5">
      <h3 class="section-title">Related Events</h3>
      <div class="row" id="relatedEvents"></div>
    </section>`;

  const related = getRelatedEvents(event.id, event.category);
  const relatedContainer = document.getElementById("relatedEvents");
  if (relatedContainer) {
    relatedContainer.innerHTML = related.length
      ? related.map(e => createEventCard(e)).join("")
      : `<div class="col-12"><p class="text-muted">No related events at this time.</p></div>`;
  }

  document.getElementById("addToCalendar")?.addEventListener("click", () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${event.date.replace(/-/g, "")}`,
      `SUMMARY:${event.title}`,
      `LOCATION:${event.address}`,
      `DESCRIPTION:${event.description}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.title.replace(/\s+/g, "-")}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.querySelectorAll(".gallery-thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      const modalImg = document.getElementById("galleryModalImg");
      if (modalImg) modalImg.src = thumb.dataset.img;
    });
  });
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const alertSuccess = document.getElementById("contactAlertSuccess");
  const alertError = document.getElementById("contactAlertError");
  const errorMessage = document.getElementById("contactErrorMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    hideAlerts();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    const errors = [];

    if (!name) errors.push("Name is required.");
    if (!email) errors.push("Email is required.");
    else if (!isValidEmail(email)) errors.push("Please enter a valid email address.");
    if (!message) errors.push("Message is required.");

    if (errors.length > 0) {
      if (errorMessage) errorMessage.innerHTML = errors.map(err => `<li>${err}</li>`).join("");
      if (alertError) {
        alertError.classList.remove("d-none");
        alertError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    if (alertSuccess) {
      alertSuccess.classList.remove("d-none");
      alertSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    form.reset();
  });

  function hideAlerts() {
    alertSuccess?.classList.add("d-none");
    alertError?.classList.add("d-none");
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  setActiveNav();

  const page = document.body.dataset.page;
  switch (page) {
    case "index": initIndexPage(); break;
    case "events": initEventsPage(); break;
    case "event-detail": initEventDetailPage(); break;
    case "contact": initContactForm(); break;
  }
});
