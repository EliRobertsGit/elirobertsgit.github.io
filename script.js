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

  // Scroll to top hehe
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
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

const players = document.querySelectorAll(".music-card");

let currentlyPlaying = null;

players.forEach(card => {
  const audio = card.querySelector("audio");
  const playBtn = card.querySelector(".play-btn");
  const bar = card.querySelector(".progress");
  const fill = card.querySelector(".progress-fill");

  playBtn.addEventListener("click", () => {

    // stop any other song
    if (currentlyPlaying && currentlyPlaying !== audio) {
      currentlyPlaying.pause();
      currentlyPlaying.parentElement
        .querySelector(".play-btn").textContent = "▶";
    }

    if (audio.paused) {
      audio.play();
      playBtn.textContent = "⏸";
      currentlyPlaying = audio;
    } else {
      audio.pause();
      playBtn.textContent = "▶";
    }
  });

  // update progress bar
  audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    fill.style.width = `${percent}%`;
  });

  // click to seek
  bar.addEventListener("click", e => {
    const rect = bar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pos * audio.duration;
  });
});
