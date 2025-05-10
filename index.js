// JavaScript
const burger = document.getElementById("burger");
const overlay = document.getElementById("overlay");
const navLinks = document.getElementById("nav-links");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

// Закрытие меню
document.addEventListener("click", (e) => {
  if (!burger.contains(e.target) && !overlay.contains(e.target)) {
    closeMenu();
  }
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

function closeMenu() {
  burger.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}
//............................................Табы....................................................

// Получаем все элементы табов и кнопок
const tabButtons = document.querySelectorAll(".reproductions__tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

// Функция для переключения табов
function switchTab(tabId) {
  // Скрываем все табы
  tabContents.forEach((content) => {
    content.classList.remove("active-tab"); // Изменено на active-tab
  });

  // Убираем активный класс у всех кнопок
  tabButtons.forEach((button) => {
    button.classList.remove("active-tab"); // Изменено на active-tab
  });

  // Показываем выбранный таб
  document.getElementById(tabId).classList.add("active-tab"); // Изменено на active-tab

  // Делаем кнопку активной
  document.querySelector(`[data-tab="${tabId}"]`).classList.add("active-tab"); // Изменено на active-tab
}

// Добавляем обработчики событий на кнопки
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabId = button.dataset.tab;
    switchTab(tabId);
  });
});

//............................................Табы c Mokky....................................................

document.addEventListener("DOMContentLoaded", () => {
  const tabsContainer = document.querySelector(".reproductions__content");
  const API_URL = "https://your-mokky-endpoint.com/tabs"; // Ваш URL от Mokky

  // Функция рендеринга карточки
  function renderCard(item) {
    return `
      <div class="tab-item">
        <div class="tab-item_box">
          <div class="reproductions__cart-img">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="reproductions__cart-artist">${item.artist}</div>
          <div class="reproductions__cart-title">${item.title}</div>
          <div class="reproductions__cart-details">${item.details}</div>
          <div class="reproductions__cart-price">${item.price}</div>
          <button class="reproductions__cart-btn button">В корзину</button>
        </div>
      </div>
    `;
  }

  // Загрузка данных и инициализация табов
  async function initTabs() {
    try {
      const response = await fetch(
        "https://036555b924763015.mokky.dev/mockData"
      );
      const tabsData = await response.json();

      // Рендерим табы
      const tabsHTML = tabsData
        .map(
          (tab) => `
        <div class="tab-content" id="tab${tab.id}">
          <div class="reproductions__cards-grid">
            ${tab.items.map(renderCard).join("")}
          </div>
        </div>
      `
        )
        .join("");

      tabsContainer.innerHTML = tabsHTML;

      // Активируем первый таб
      document.querySelector(".tab-content").classList.add("active-tab"); // Изменено на active-tab
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  }

  // Переключение табов
  function handleTabClick(tabId) {
    // Скрываем все табы
    document.querySelectorAll(".tab-content").forEach((tab) => {
      tab.classList.remove("active-tab"); // Изменено на active-tab
    });

    // Показываем выбранный таб
    const activeTab = document.getElementById(tabId);
    if (activeTab) activeTab.classList.add("active-tab"); // Изменено на active-tab
  }

  // Инициализация
  initTabs();

  // Делегирование событий для кнопок табов
  document
    .querySelector(".reproductions__tab-buttons")
    .addEventListener("click", (e) => {
      if (e.target.classList.contains("reproductions__tab-btn")) {
        const tabId = e.target.dataset.tab;
        handleTabClick(tabId);
      }
    });
});

// ////////////////////////////////////Слайдер//////////////////////////////////////////////////////////////////
