// Selecting DOM elements
const dropdown = document.querySelector(".navbar__right__dropdown");
const dropdownRows = document.querySelectorAll(".navbar__right__dropdown__row");
const userWrapper = document.querySelector(".navbar__right__user__wrapper");
const bellIcon = document.querySelector(".navbar__right__bell__icon");
const alertDropdown = document.querySelector(".navbar__right__alert__dropdown");
const planCard = document.querySelector(".plan__card");
const setup = document.querySelector(".setup");
const setupItems = document.querySelectorAll(".setup__item");
const checkboxs = document.querySelectorAll(".setup__item__header__checkbox");
const progress = document.querySelector(
  ".setup__header__left__progress__value"
);
const count = document.querySelector(
  ".setup__header__left__progress__wrapper__count"
);
const filterIcon = document.getElementById("filter-icon");

// CSS classes
const dropdownActiveClass = "navbar__right__dropdown--active";
const alertDropdownActiveClass = "navbar__right__alert__dropdown--active";
const planCardHiddenClass = "plan__card--hidden";
const setupItemsActiveClass = "setup__items--active";
const checkboxActiveClass = "setup__item__header__checkbox--active";
const setupItemActiveClass = "setup__item--active";

// Toggle dropdown visibility
const toggleDropdown = () => {
  alertDropdown.classList.remove(alertDropdownActiveClass);
  dropdown.classList.toggle(dropdownActiveClass);

  const isExpanded = userWrapper.getAttribute("aria-expanded") === "true";

  if (isExpanded) {
    userWrapper.ariaExpanded = "false";
  } else {
    userWrapper.ariaExpanded = "true";
    dropdownRows.item(0).focus();
  }
};

// Toggle alert dropdown visibility
const toggleAlertDropdown = () => {
  dropdown.classList.remove(dropdownActiveClass);
  alertDropdown.classList.toggle(alertDropdownActiveClass);

  const isExpanded = bellIcon.getAttribute("aria-expanded") === "true";

  if (isExpanded) {
    bellIcon.ariaExpanded = "false";
  } else {
    bellIcon.ariaExpanded = "true";
    filterIcon.focus();
  }
};

// Close dropdowns on Escape key press
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (alertDropdown.classList.contains(alertDropdownActiveClass)) {
      toggleAlertDropdown();
      bellIcon.focus();
    }
    if (dropdown.classList.contains(dropdownActiveClass)) {
      toggleDropdown();
      userWrapper.focus();
    }
  }
});

// Toggle plan card visibility
const togglePlanCard = () => {
  planCard.classList.toggle(planCardHiddenClass);
};

// Toggle setup visibility
const toggleSetup = () => {
  setup.classList.toggle(setupItemsActiveClass);
};

// Close other setup items when one is clicked
const handleCloseRest = (index) => {
  [...setupItems]
    .filter((_, i) => i !== index)
    .forEach((item) => {
      item.classList.remove(setupItemActiveClass);
      item.setAttribute("aria-expanded", "false");
    });
};

// Setup item event listeners
setupItems.forEach((setupItem, index) => {
  const setupItemHeader = setupItem.querySelector(".setup__item__header");
  const checkbox = setupItem.querySelector(".setup__item__header__checkbox");

  // Click event on setup item header
  setupItemHeader.addEventListener("click", (event) => {
    event.preventDefault();

    if (setupItem.classList.contains(setupItemActiveClass)) return;

    setupItem.classList.add(setupItemActiveClass);
    setupItem.setAttribute("aria-expanded", "true");
    handleCloseRest(index);
  });

  // Click event on checkbox
  checkbox.addEventListener("click", () => {
    const isChecked = checkbox.classList.contains(checkboxActiveClass);

    checkbox.classList.toggle(checkboxActiveClass);

    checkbox.setAttribute("aria-checked", !isChecked);
    const ariaLabel = checkbox.getAttribute("aria-label");

    checkbox.setAttribute(
      "aria-label",
      isChecked
        ? ariaLabel.replace("Uncheck", "Check")
        : ariaLabel.replace("Check", "Uncheck")
    );

    // Update progress after checkbox click
    updateProgress();

    // if the current step is checked move to the next step
    if (!isChecked) setTimeout(() => expandNextStep(index), 0);
  });
});

// Update progress based on checked checkboxes
const updateProgress = () => {
  const checked = document.querySelectorAll("." + checkboxActiveClass);
  count.innerHTML = checked.length;
  progress.style.setProperty("width", `${(72 / 5) * checked.length}px`);
};

// Expand next setup item if available
const expandNextStep = (index) => {
  const nextElm = setupItems.item(index + 1);
  const isNextChecked = nextElm
    ? nextElm
        .querySelector(".setup__item__header__checkbox")
        .getAttribute("aria-checked") === "true"
    : false;

  if (
    nextElm &&
    !nextElm.classList.contains(setupItemActiveClass) &&
    !isNextChecked
  ) {
    activateNextStep(nextElm);
  } else {
    const items = [...setupItems].filter(
      (item) =>
        !item
          .querySelector(".setup__item__header__checkbox")
          .classList.contains(checkboxActiveClass)
    );

    if (items.length > 0) {
      activateNextStep(items[0]);
    }
  }
};

const activateNextStep = (elm) => {
  const nextStep = elm.querySelector(".setup__item__header");

  nextStep.click();

  nextStep.querySelector(".setup__item__header__checkbox").focus();
};
