/* INDEX JS */

// =========================
// DATE & TIME FUNCTIONALITY
// =========================
function updateDateTime() {
  const now = new Date();
  // Format as MM.DD.YYYY
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const year = now.getFullYear();
  const date = `${month}.${day}.${year}`;
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateTimeEl = document.getElementById("date-time");
  if (dateTimeEl) {
    dateTimeEl.innerHTML = `<span style="color:#888;">${date}</span> | ${time}`;
  }
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = year;
  }
}
updateDateTime();
setInterval(updateDateTime, 1000);

// =========================
// LIGHTBOX FUNCTIONALITY
// =========================
const images = Array.from(
  document.querySelectorAll(".project-image img, .additional-images img")
);
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxOverlay = document.getElementById("lightbox-overlay");

let lightboxIndex = 0;
let startX = 0;
let endX = 0;

function openLightbox(index) {
  lightboxIndex = index;
  if (lightboxImg && images[lightboxIndex]) {
    lightboxImg.src = images[lightboxIndex].src;
    lightbox.style.display = "flex";
  }
}

function closeLightbox() {
  if (lightbox) {
    lightbox.style.display = "none";
    if (lightboxImg) lightboxImg.src = "";
  }
}

function showPrev() {
  lightboxIndex = (lightboxIndex - 1 + images.length) % images.length;
  if (lightboxImg) lightboxImg.src = images[lightboxIndex].src;
}

function showNext() {
  lightboxIndex = (lightboxIndex + 1) % images.length;
  if (lightboxImg) lightboxImg.src = images[lightboxIndex].src;
}

// Swipe functionality
function handleTouchStart(e) {
  startX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
}

function handleSwipe() {
  const swipeThreshold = 50; // Minimum distance for a swipe
  const diff = startX - endX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swiped left - go to next image
      showNext();
    } else {
      // Swiped right - go to previous image
      showPrev();
    }
  }
}

images.forEach((img, i) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", (e) => {
    e.stopPropagation();
    openLightbox(i);
  });
});

if (lightboxPrev) {
  lightboxPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrev();
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener("click", (e) => {
    e.stopPropagation();
    showNext();
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLightbox();
  });
}

if (lightboxOverlay) {
  lightboxOverlay.addEventListener("click", closeLightbox);
}

// Add touch event listeners to lightbox
if (lightbox) {
  lightbox.addEventListener("touchstart", handleTouchStart, { passive: true });
  lightbox.addEventListener("touchend", handleTouchEnd, { passive: true });
}

document.addEventListener("keydown", (e) => {
  if (lightbox && lightbox.style.display === "flex") {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  }
});

/* ABOUT JS */
// =========================
// DATE & TIME FUNCTIONALITY
// =========================
function updateDateTime() {
  const now = new Date();
  // Format as MM.DD.YYYY
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const year = now.getFullYear();
  const date = `${month}.${day}.${year}`;
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateTimeEl = document.getElementById("date-time");
  if (dateTimeEl) {
    dateTimeEl.innerHTML = `<span style="color:#888;">${date}</span> | ${time}`;
  }
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = year;
  }
}
updateDateTime();
setInterval(updateDateTime, 1000);
