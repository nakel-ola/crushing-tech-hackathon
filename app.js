const dropdown = document.querySelector(".navbar__right__dropdown");
const dropdownRows = document.querySelectorAll(".navbar__right__dropdown__row");
const userWrapper = document.querySelector(".navbar__right__user__wrapper");
const alertDropdown = document.querySelector(".navbar__right__alert__dropdown");
const planCard = document.querySelector(".plan__card");
const setup = document.querySelector(".setup");
const setupItems = document.querySelectorAll(".setup__item");
const checkboxs = document.querySelectorAll(".setup__item__header__checkbox");

const dropdownActiveClass = "navbar__right__dropdown--active";
const alertDropdownActiveClass = "navbar__right__alert__dropdown--active";
const planCardHiddenClass = "plan__card--hidden";
const setupItemsActiveClass = "setup__items--active";
const checkboxActiveClass = "setup__item__header__checkbox--active";

const toggleDropdown = () => {
  alertDropdown.classList.remove(alertDropdownActiveClass);
  dropdown.classList.toggle(dropdownActiveClass);

  const isExpanded = userWrapper.attributes["aria-expanded"].value === "true";

  if (isExpanded) {
    userWrapper.ariaExpanded = "false";
  } else {
    userWrapper.ariaExpanded = "true";
    dropdownRows.item(0).focus();
  }
};

const toggleAlertDropdown = () => {
  dropdown.classList.remove(dropdownActiveClass);
  alertDropdown.classList.toggle(alertDropdownActiveClass);
};

const togglePlanCard = () => {
  planCard.classList.toggle(planCardHiddenClass);
};

const toggleSetup = () => {
  setup.classList.toggle(setupItemsActiveClass);
};

const handleCloseRest = (index) => {
  [...setupItems]
    .filter((_, i) => i !== index)
    .forEach((item) => item.classList.remove("setup__item--active"));
};

setupItems.forEach((setupItem, index) => {
  const setupItemHeader = setupItem.querySelector(".setup__item__header");
  const checkbox = setupItem.querySelector(".setup__item__header__checkbox");

  setupItemHeader.addEventListener("click", (event) => {
    event.preventDefault();
    setupItem.classList.add("setup__item--active");
    handleCloseRest(index);
  });

  checkbox.addEventListener("click", () => {
    checkbox.classList.toggle(checkboxActiveClass);

    const checked = document.querySelectorAll("." + checkboxActiveClass);
    const progress = document.querySelector(
      ".setup__header__left__progress__value"
    );
    const count = document.querySelector(
      ".setup__header__left__progress__wrapper__count"
    );

    count.innerHTML = checked.length;
    progress.style.setProperty("width", `${(72 / 5) * checked.length}px`);

    setTimeout(() => {
      if (index + 1 < 5)
        setupItems
          .item(index + 1)
          .querySelector(".setup__item__header")
          .click();
    }, 0);
  });
});
