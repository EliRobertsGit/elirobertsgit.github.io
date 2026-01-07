// Simple page switching without reloads
const pages = document.querySelectorAll(".page");

function showPage(id) {
  const current = document.querySelector(".page.active");
  const next = document.getElementById(id);

  if (current === next) return;

  // animate current out
  if (current) {
    current.classList.add("leaving");
    setTimeout(() => {
      current.classList.remove("active", "leaving");
    }, 300);
  }

  // animate next in
  next.classList.add("active");
}

// top nav
document.querySelectorAll("[data-target]").forEach(el => {
  el.addEventListener("click", () => {
    const target = el.getAttribute("data-target");
    showPage(target);
  });
});

// default state
showPage("home");
