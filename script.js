const revealTargets = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-link");
const sectionIds = ["home", "projects", "about", "support"];
const heroVideo = document.querySelector(".hero video");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
);

revealTargets.forEach((el) => revealObserver.observe(el));

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { threshold: 0.5 }
);

sectionIds.forEach((id) => {
  const section = document.getElementById(id);
  if (section) activeObserver.observe(section);
});

window.addEventListener("scroll", () => {
  if (!heroVideo) return;
  const y = window.scrollY;
  heroVideo.style.transform = `scale(1.03) translateY(${Math.min(y * 0.05, 22)}px)`;
}, { passive: true });
