(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav__toggle");
  var navList = document.querySelector(".nav__list");
  var navLinks = document.querySelectorAll(".nav__link");

  function setYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  function closeNav() {
    if (!navToggle || !navList) return;
    navList.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  function toggleNav() {
    if (!navToggle || !navList) return;
    var open = navList.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  function setActiveNav() {
    var sections = ["hero", "about", "hfr", "pricing", "contact"];
    var scrollPos = window.scrollY + 120;

    var activeId = "hero";
    for (var i = sections.length - 1; i >= 0; i--) {
      var id = sections[i];
      var el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) {
        activeId = id;
        break;
      }
    }

    navLinks.forEach(function (link) {
      var hash = (link.getAttribute("href") || "").replace(/^#/, "");
      var match =
        (hash === "about" ||
          hash === "hfr" ||
          hash === "pricing" ||
          hash === "contact") &&
        hash === activeId;
      link.classList.toggle("is-active", match);
    });
  }

  function initNavToggle() {
    if (!navToggle || !navList) return;
    navToggle.addEventListener("click", function () {
      toggleNav();
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 42rem)").matches) {
          closeNav();
        }
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  setYear();
  onScroll();
  window.addEventListener("scroll", function () {
    onScroll();
    setActiveNav();
  }, { passive: true });

  initNavToggle();
  setActiveNav();
})();
