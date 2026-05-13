const menuBtn = document.querySelector("#menuBtn");
const menu = document.querySelector("#menu");

menuBtn?.addEventListener("click", () => {
  document.body.classList.toggle("is-menu-open");
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => document.body.classList.remove("is-menu-open"));
});

document.querySelectorAll("video").forEach((video) => {
  video.muted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  const tryPlay = () => {
    const promise = video.play();
    if (promise && typeof promise.catch === "function") {
      promise.catch(() => {
        video.controls = true;
      });
    }
  };

  video.addEventListener("loadeddata", tryPlay, { once: true });
  tryPlay();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const heroVideo = document.querySelector("#heroVideo");
window.addEventListener("scroll", () => {
  if (!heroVideo) return;
  const y = window.scrollY;
  heroVideo.style.transform = `scale(${1.01 + Math.min(y / 9000, 0.04)}) translateY(${Math.min(y / 18, 28)}px)`;
}, { passive: true });
