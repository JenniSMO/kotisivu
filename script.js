const revealTargets = document.querySelectorAll("section, .reveal");
const navLinks = document.querySelectorAll(".nav-link");
const sectionIds = ["home", "story", "questions", "contact"];
const heroVideo = document.querySelector(".hero-video");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible", "visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
);

revealTargets.forEach((el) => {
  el.classList.add("fade-in");
  revealObserver.observe(el);
});

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

// Sentra-style language dropdown (UI only)
const languageSelector = document.getElementById("languageSelector");
const languageSelectCustom = document.getElementById("languageSelectCustom");
const languageSelectDropdown = document.getElementById("languageSelectDropdown");
const languageSelect = document.getElementById("languageSelect");

if (languageSelector && languageSelectCustom && languageSelectDropdown && languageSelect) {
  const selectedRoot = languageSelectCustom.querySelector(".language-select-selected");
  const selectedFlag = selectedRoot?.querySelector(".language-flag-icon");
  const selectedName = selectedRoot?.querySelector(".language-name");
  const options = languageSelectDropdown.querySelectorAll(".language-option");

  selectedRoot?.addEventListener("click", () => {
    languageSelectCustom.classList.toggle("active");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const lang = option.getAttribute("data-lang") || "fi";
      const flag = option.getAttribute("data-flag") || "./assets/images/finland_flags_flag_9256.png";
      const flagAlt = option.getAttribute("data-alt") || "Suomi";
      const name = option.getAttribute("data-name") || "Suomi";

      languageSelector.setAttribute("data-lang", lang);
      languageSelect.value = lang;
      if (selectedFlag && selectedFlag.tagName === "IMG") {
        selectedFlag.setAttribute("src", flag);
        selectedFlag.setAttribute("alt", flagAlt);
      }
      if (selectedName) selectedName.textContent = name;

      options.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");
      languageSelectCustom.classList.remove("active");
    });
  });

  document.addEventListener("click", (event) => {
    if (!languageSelectCustom.contains(event.target)) {
      languageSelectCustom.classList.remove("active");
    }
  });
}
