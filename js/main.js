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
let isZoomed = false;
let zoomLevel = 1;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let imageOffsetX = 0;
let imageOffsetY = 0;

function openLightbox(index) {
  lightboxIndex = index;
  if (lightboxImg && images[lightboxIndex]) {
    lightboxImg.src = images[lightboxIndex].src;
    lightbox.style.display = "flex";
    resetZoom();
  }
}

function closeLightbox() {
  if (lightbox) {
    lightbox.style.display = "none";
    if (lightboxImg) lightboxImg.src = "";
    resetZoom();
  }
}

function showPrev() {
  lightboxIndex = (lightboxIndex - 1 + images.length) % images.length;
  if (lightboxImg) {
    lightboxImg.src = images[lightboxIndex].src;
    resetZoom();
  }
}

function showNext() {
  lightboxIndex = (lightboxIndex + 1) % images.length;
  if (lightboxImg) {
    lightboxImg.src = images[lightboxIndex].src;
    resetZoom();
  }
}

// Zoom functionality
function resetZoom() {
  isZoomed = false;
  zoomLevel = 1;
  imageOffsetX = 0;
  imageOffsetY = 0;
  if (lightboxImg) {
    lightboxImg.style.transform = "scale(1) translate(0px, 0px)";
    lightboxImg.style.cursor = "zoom-in";
    lightboxImg.style.transition = "transform 0.3s ease";
  }
}

function toggleZoom(e) {
  if (!isZoomed) {
    // Zoom in
    zoomLevel = 2.5;
    isZoomed = true;

    // Calculate zoom origin based on click/touch position
    const rect = lightboxImg.getBoundingClientRect();
    const clientX =
      e.clientX ||
      (e.touches && e.touches[0].clientX) ||
      rect.left + rect.width / 2;
    const clientY =
      e.clientY ||
      (e.touches && e.touches[0].clientY) ||
      rect.top + rect.height / 2;

    const clickX = clientX - rect.left;
    const clickY = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    imageOffsetX = (centerX - clickX) * 0.6;
    imageOffsetY = (centerY - clickY) * 0.6;

    lightboxImg.style.transition = "transform 0.3s ease";
    lightboxImg.style.transform = `scale(${zoomLevel}) translate(${imageOffsetX}px, ${imageOffsetY}px)`;
    lightboxImg.style.cursor = "zoom-out";
  } else {
    // Zoom out
    resetZoom();
  }
}

// Drag functionality for zoomed images
function handleMouseDown(e) {
  if (isZoomed) {
    isDragging = true;
    dragStartX = e.clientX - imageOffsetX;
    dragStartY = e.clientY - imageOffsetY;
    lightboxImg.style.cursor = "grabbing";
    lightboxImg.style.transition = "none";
    e.preventDefault();
  }
}

function handleMouseMove(e) {
  if (isDragging && isZoomed) {
    imageOffsetX = e.clientX - dragStartX;
    imageOffsetY = e.clientY - dragStartY;
    lightboxImg.style.transform = `scale(${zoomLevel}) translate(${imageOffsetX}px, ${imageOffsetY}px)`;
    e.preventDefault();
  }
}

function handleMouseUp() {
  if (isDragging) {
    isDragging = false;
    lightboxImg.style.cursor = isZoomed ? "zoom-out" : "zoom-in";
  }
}

// Touch events for mobile zoom and pan
function handleTouchStart(e) {
  if (e.touches.length === 1) {
    if (!isZoomed) {
      startX = e.touches[0].clientX;
    } else {
      // Single touch on zoomed image - start dragging
      isDragging = true;
      dragStartX = e.touches[0].clientX - imageOffsetX;
      dragStartY = e.touches[0].clientY - imageOffsetY;
      lightboxImg.style.transition = "none";
    }
  }
}

function handleTouchMove(e) {
  if (e.touches.length === 1 && isDragging && isZoomed) {
    imageOffsetX = e.touches[0].clientX - dragStartX;
    imageOffsetY = e.touches[0].clientY - dragStartY;
    lightboxImg.style.transform = `scale(${zoomLevel}) translate(${imageOffsetX}px, ${imageOffsetY}px)`;
    e.preventDefault();
  }
}

function handleTouchEnd(e) {
  if (isDragging) {
    isDragging = false;
    return;
  }

  if (!isZoomed && e.changedTouches.length === 1) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  }
}

// Double tap for mobile zoom
let lastTap = 0;
function handleDoubleTap(e) {
  const currentTime = new Date().getTime();
  const tapLength = currentTime - lastTap;

  if (tapLength < 500 && tapLength > 0) {
    e.preventDefault();
    toggleZoom(e);
  }

  lastTap = currentTime;
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

// Add zoom functionality to lightbox image
if (lightboxImg) {
  // Desktop: click to zoom
  lightboxImg.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleZoom(e);
  });

  // Desktop: mouse events for dragging
  lightboxImg.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  // Mobile: double tap to zoom
  lightboxImg.addEventListener("touchend", handleDoubleTap);
}

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
  lightboxOverlay.addEventListener("click", (e) => {
    if (!isZoomed) {
      closeLightbox();
    }
  });
}

// Add touch event listeners to lightbox
if (lightbox) {
  lightbox.addEventListener("touchstart", handleTouchStart, { passive: false });
  lightbox.addEventListener("touchmove", handleTouchMove, { passive: false });
  lightbox.addEventListener("touchend", handleTouchEnd, { passive: false });
}

document.addEventListener("keydown", (e) => {
  if (lightbox && lightbox.style.display === "flex") {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft" && !isZoomed) showPrev();
    if (e.key === "ArrowRight" && !isZoomed) showNext();
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
