document.addEventListener("DOMContentLoaded", function () {
  if (window.Fancybox) {
    Fancybox.bind('[data-fancybox="gallery"]', {
      theme: "dark",
      animated: true,
      showClass: "fancybox-fadeIn",
      hideClass: "fancybox-fadeOut",
      dragToClose: true,
      Toolbar: false,
      Thumbs: false,
      closeButton: true,
      Image: {
        zoom: false,
        pan: true,
      },
      Video: {
        autoplay: true,
      },
    });
  }
});
// =========================
// SWIPER FUNCTIONALITY
// =========================
document.addEventListener("DOMContentLoaded", function () {
  if (window.Swiper) {
    var swiper = new Swiper(".swiper", {
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      slidesPerView: 1,
      spaceBetween: 16,
    });
  }
  if (window.Fancybox) {
    Fancybox.bind('[data-fancybox="gallery"]', {
      theme: "dark",
      animated: true,
      showClass: "fancybox-fadeIn",
      hideClass: "fancybox-fadeOut",
      dragToClose: true,
      Toolbar: false,
      Thumbs: false,
      closeButton: true,
      Image: {
        zoom: false,
        pan: true,
      },
      Video: {
        autoplay: true,
      },
    });
  }
});
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
  // Get user's local time zone abbreviation
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const time = now.toLocaleTimeString([], timeOptions);
  const dateTimeEl = document.getElementById("date-time");
  if (dateTimeEl) {
    dateTimeEl.innerHTML = `<span style=\"color:#888;\">${date}</span> | ${time}`;
  }
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = year;
  }
}
updateDateTime();
setInterval(updateDateTime, 1000);

// =========================

// =========================
// FANCYBOX FUNCTIONALITY
// =========================
// Dynamically load Fancybox JS and initialize after DOM is ready
function loadFancybox() {
  var script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js";
  script.onload = function () {
    if (window.Fancybox) {
      Fancybox.bind('[data-fancybox="gallery"]', {
        theme: "dark",
        animated: true,
        showClass: "fancybox-fadeIn",
        hideClass: "fancybox-fadeOut",
        dragToClose: true,
        Toolbar: false,
        Thumbs: false,
        closeButton: false,
        Image: {
          zoom: false,
          pan: true,
        },
        Video: {
          autoplay: true,
        },
      });
    } else {
      console.error("Fancybox failed to load.");
    }
  };
  script.onerror = function () {
    console.error("Failed to load Fancybox JS from CDN.");
  };
  document.body.appendChild(script);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadFancybox);
} else {
  loadFancybox();
}

function closeLightbox() {
  // =========================
  // FANCYBOX FUNCTIONALITY
  // =========================
  // Dynamically load Fancybox JS
  const fancyboxScript = document.createElement("script");
  fancyboxScript.src =
    "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js";
  fancyboxScript.onload = function () {
    Fancybox.bind('[data-fancybox="gallery"]', {
      theme: "dark",
      animated: true,
      showClass: "fancybox-fadeIn",
      hideClass: "fancybox-fadeOut",
      dragToClose: true,
      Toolbar: false,
      Thumbs: false,
      closeButton: false,
      Image: {
        zoom: false,
        pan: true,
      },
      Video: {
        autoplay: true,
      },
    });
  };
  document.head.appendChild(fancyboxScript);
  imageOffsetX = 0;

  var swiper = new Swiper(".swiper", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 16,
  });

  Fancybox.bind('[data-fancybox="gallery"]', {
    theme: "dark",
    animated: true,
    showClass: "fancybox-fadeIn",
    hideClass: "fancybox-fadeOut",
    dragToClose: true,
    Toolbar: false,
    Thumbs: false,
    closeButton: false,
    Image: {
      zoom: false,
      pan: true,
    },
    Video: {
      autoplay: true,
    },
  });
}
