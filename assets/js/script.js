'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all" || selectedValue === "全部") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navbarList = document.querySelector(".navbar-list");
const navbarItems = document.querySelectorAll(".navbar-item");
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
let currentPageIndex = Array.from(pages).findIndex((page) => page.classList.contains("active"));
currentPageIndex = currentPageIndex === -1 ? 0 : currentPageIndex;

const navbarIndicator = document.createElement("span");
navbarIndicator.className = "navbar-indicator";
navbarIndicator.setAttribute("aria-hidden", "true");
navbarList.appendChild(navbarIndicator);

const setActiveNavigation = function (targetIndex) {
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].classList.toggle("active", i === targetIndex);
  }
}

const syncNavbarIndicator = function (targetIndex, immediate = false) {
  const targetItem = navbarItems[targetIndex];

  if (!targetItem) return;

  const insetX = 0;
  const offsetLeft = targetItem.offsetLeft + insetX;
  const offsetWidth = Math.max(targetItem.offsetWidth - insetX * 2, 52);

  if (immediate) {
    navbarIndicator.classList.add("no-animate");
  } else {
    navbarIndicator.classList.remove("is-moving");
    void navbarIndicator.offsetWidth;
    navbarIndicator.classList.add("is-moving");
  }

  navbarIndicator.style.width = `${offsetWidth}px`;
  navbarIndicator.style.transform = `translateX(${offsetLeft}px)`;

  if (immediate) {
    requestAnimationFrame(function () {
      navbarIndicator.classList.remove("no-animate");
    });
  }

  window.clearTimeout(navbarIndicator._moveTimer);
  navbarIndicator._moveTimer = window.setTimeout(function () {
    navbarIndicator.classList.remove("is-moving");
  }, 680);
}

const restartPageEntrance = function (page) {
  page.classList.remove("is-entering");
  void page.offsetWidth;
  page.classList.add("is-entering");

  window.clearTimeout(page._enterTimer);
  page._enterTimer = window.setTimeout(function () {
    page.classList.remove("is-entering");
  }, 700);
}

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    let targetIndex = -1;

    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        targetIndex = j;
        break;
      }
    }

    if (targetIndex === -1 || pages[targetIndex].classList.contains("active")) return;

    const currentPage = document.querySelector("article.active");
    const nextPage = pages[targetIndex];
    const slideDirection = targetIndex > currentPageIndex ? "from-right" : "from-left";

    setActiveNavigation(targetIndex);
    syncNavbarIndicator(targetIndex);

    if (currentPage) {
      currentPage.classList.remove("active", "is-entering", "is-leaving", "from-left", "from-right");
    }

    nextPage.classList.remove("from-left", "from-right");
    nextPage.classList.add(slideDirection);
    nextPage.classList.add("active");
    restartPageEntrance(nextPage);
    currentPageIndex = targetIndex;
    window.scrollTo({ top: 0, behavior: "auto" });

  });
}

window.addEventListener("resize", function () {
  syncNavbarIndicator(currentPageIndex, true);
});

syncNavbarIndicator(currentPageIndex, true);



// day / night theme switch
const themeSwitch = document.querySelector("[data-theme-switch]");
const themeModeButtons = document.querySelectorAll("[data-theme-mode]");
const themeQuery = new URLSearchParams(window.location.search).get("theme");
const themeStorageKey = "qiqi-theme-mode";
const solarLocation = { latitude: 22.3193, longitude: 114.1694 };
let selectedThemeMode = "auto";

const normalizeThemeMode = function (mode) {
  return mode === "day" || mode === "night" || mode === "auto" ? mode : "";
}

const dayOfYear = function (date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

const normalizeDegrees = function (value) {
  return (value + 360) % 360;
}

const normalizeHours = function (value) {
  return (value + 24) % 24;
}

const toRadians = function (degrees) {
  return degrees * Math.PI / 180;
}

const toDegrees = function (radians) {
  return radians * 180 / Math.PI;
}

const calculateSunEvent = function (date, isSunrise) {
  const zenith = 90.833;
  const lngHour = solarLocation.longitude / 15;
  const eventHour = isSunrise ? 6 : 18;
  const approximateTime = dayOfYear(date) + ((eventHour - lngHour) / 24);
  const meanAnomaly = (0.9856 * approximateTime) - 3.289;
  const trueLongitude = normalizeDegrees(
    meanAnomaly +
    (1.916 * Math.sin(toRadians(meanAnomaly))) +
    (0.020 * Math.sin(toRadians(2 * meanAnomaly))) +
    282.634
  );
  let rightAscension = normalizeDegrees(toDegrees(Math.atan(0.91764 * Math.tan(toRadians(trueLongitude)))));

  rightAscension += Math.floor(trueLongitude / 90) * 90 - Math.floor(rightAscension / 90) * 90;
  rightAscension /= 15;

  const sinDec = 0.39782 * Math.sin(toRadians(trueLongitude));
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosHour = (
    Math.cos(toRadians(zenith)) -
    (sinDec * Math.sin(toRadians(solarLocation.latitude)))
  ) / (cosDec * Math.cos(toRadians(solarLocation.latitude)));

  if (cosHour > 1 || cosHour < -1) return null;

  const hourAngle = (isSunrise ? 360 - toDegrees(Math.acos(cosHour)) : toDegrees(Math.acos(cosHour))) / 15;
  const localMeanTime = hourAngle + rightAscension - (0.06571 * approximateTime) - 6.622;
  const utcHour = normalizeHours(localMeanTime - lngHour);
  const localHour = normalizeHours(utcHour - (date.getTimezoneOffset() / 60));

  return Math.round(localHour * 60);
}

const getAutoTheme = function (date = new Date()) {
  const sunrise = calculateSunEvent(date, true) || 360;
  const sunset = calculateSunEvent(date, false) || 1110;
  const currentMinutes = date.getHours() * 60 + date.getMinutes();

  document.body.dataset.sunrise = String(sunrise);
  document.body.dataset.sunset = String(sunset);

  return currentMinutes >= sunrise && currentMinutes < sunset ? "day" : "night";
}

const applyTheme = function (mode, persist = false) {
  selectedThemeMode = normalizeThemeMode(mode) || "auto";

  if (persist) {
    localStorage.setItem(themeStorageKey, selectedThemeMode);
  }

  const resolvedTheme = selectedThemeMode === "auto" ? getAutoTheme() : selectedThemeMode;
  document.body.dataset.theme = resolvedTheme;
  document.body.dataset.themeMode = selectedThemeMode;

  for (let i = 0; i < themeModeButtons.length; i++) {
    const buttonMode = themeModeButtons[i].dataset.themeMode;
    const isActive = buttonMode === selectedThemeMode;
    themeModeButtons[i].classList.toggle("is-active", isActive);
    themeModeButtons[i].setAttribute("aria-pressed", isActive ? "true" : "false");
  }

  if (themeSwitch) {
    themeSwitch.dataset.resolvedTheme = resolvedTheme;
  }
}

applyTheme(
  normalizeThemeMode(themeQuery) ||
  normalizeThemeMode(localStorage.getItem(themeStorageKey)) ||
  "auto"
);

for (let i = 0; i < themeModeButtons.length; i++) {
  themeModeButtons[i].addEventListener("click", function () {
    applyTheme(this.dataset.themeMode, true);
  });
}

window.setInterval(function () {
  if (selectedThemeMode === "auto") {
    applyTheme("auto");
  }
}, 60000);
