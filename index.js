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
