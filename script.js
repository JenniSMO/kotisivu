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

// Sentra-style language dropdown + i18n
const languageSelector = document.getElementById("languageSelector");
const languageSelectCustom = document.getElementById("languageSelectCustom");
const languageSelectDropdown = document.getElementById("languageSelectDropdown");
const languageSelect = document.getElementById("languageSelect");

if (languageSelector && languageSelectCustom && languageSelectDropdown && languageSelect) {
  const translations = {
    fi: {
      "nav.home": "Koti",
      "nav.about": "Tietoa",
      "nav.contact": "Yhteystiedot",
      "nav.cta": "Ota yhteyttä",
      "hero.label": "Suomalainen luonto x moderni hyvinvointi",
      "hero.subtitle": "Hyvinvointijärjestelmä päivittäiseen etenemiseen",
      "hero.description":
        "NexaLife on tehty sinulle, joka haluat lisää selkeyttä ilman turhaa kuormitusta. Suunnittele päivä, rakenna rutiineja ja etene tavoitteissa rauhallisella fokuksella.",
      "hero.primaryCta": "Aloita nyt",
      "hero.secondaryCta": "Lue lisää",
      "weare.title": "WE ARE NEXALIFE",
      "weare.text":
        "Kehitämme hyvinvoinnin päiväjärjestelmää, joka auttaa tekemään oikeita asioita oikeaan aikaan. Jokainen ominaisuus on rakennettu ratkaisemaan oikeita arjen pullonkauloja.",
      "story.title": "MISTÄ KAIKKI ALKOI",
      "story.p1": "Arjen hallinta hajosi liian moneen appiin, listaan ja muistioon.",
      "story.p2":
        "Kun suunnittelu, toteutus ja seuranta ovat eri paikoissa, fokus katoaa. NexaLife syntyi tarpeesta yhdistää kaikki olennainen yhteen rytmiin.",
      "story.p3":
        "NexaLife on työkalu, joka tekee etenemisestä selkeää ja rauhallista - päivä kerrallaan.",
      "questions.title": "PARHAAT RATKAISUT ALKAVAT KYSYMYKSISTÄ",
      "questions.subtitle": "Rakensimme NexaLifen kolmen kysymyksen ympärille.",
      "questions.q1.label": "KYSYMYS 1",
      "questions.q1.question": "Miten löydän päivän tärkeimmät asiat ilman jatkuvaa säätöä?",
      "questions.q1.answer":
        "Kun päivän suunnittelu, tehtävät ja rutiinit ovat samassa näkymässä, päätöksenteko nopeutuu ja fokus pysyy olennaisessa.",
      "questions.q2.label": "KYSYMYS 2",
      "questions.q2.question": "Miten rakennan pysyviä tapoja, en vain hetkellistä motivaatiota?",
      "questions.q2.answer":
        "Pienet päivittäiset valinnat, realistinen rytmi ja näkyvä edistyminen tekevät tavoista pysyviä ilman ylikuormitusta.",
      "questions.q3.label": "KYSYMYS 3",
      "questions.q3.question": "Miten pidän hyvinvoinnin mukana myös kiireisinä viikkoina?",
      "questions.q3.answer":
        "Kun hyvinvoinnin seuranta on osa päivittäistä tekemistä, tasapaino säilyy paremmin myös silloin, kun arki kiristyy.",
      "download.title": "LATAA SOVELLUKSEMME",
      "download.subtitle":
        "Aloita NexaLife helposti puhelimellasi. Valitse oma laitteesi ja lataa sovellus.",
      "download.googlePlay": "Google Play",
      "download.appStore": "App Store",
      "help.title": "Tarvitsetko apua?",
      "help.email": "Sähköposti:",
      "help.support": "Tuki:",
      "footer.pages": "Sivut",
      "footer.about": "Tietoa",
      "footer.contact": "Yhteys",
      "footer.legal": "Lakitiedot",
      "footer.privacy": "Tietosuojaseloste",
      "footer.terms": "Käyttöehdot",
      "footer.copyright": "© 2026 Kaikki oikeudet pidätetään.",
    },
    en: {
      "nav.home": "Home",
      "nav.about": "About",
      "nav.contact": "Contact",
      "nav.cta": "Contact us",
      "hero.label": "Finnish nature x modern wellbeing",
      "hero.subtitle": "Wellbeing system for daily progress",
      "hero.description":
        "NexaLife is built for people who want more clarity without extra overload. Plan your day, build routines, and move toward your goals with calm focus.",
      "hero.primaryCta": "Start now",
      "hero.secondaryCta": "Learn more",
      "weare.title": "WE ARE NEXALIFE",
      "weare.text":
        "We build a daily wellbeing system that helps you do the right things at the right time. Every feature is designed to solve real everyday bottlenecks.",
      "story.title": "HOW IT ALL STARTED",
      "story.p1": "Everyday planning was scattered across too many apps, lists, and notes.",
      "story.p2":
        "When planning, execution, and tracking live in different places, focus disappears. NexaLife was created to bring the essentials into one rhythm.",
      "story.p3":
        "NexaLife is a tool that makes progress clear and calm - one day at a time.",
      "questions.title": "THE BEST SOLUTIONS START WITH QUESTIONS",
      "questions.subtitle": "We built NexaLife around three key questions.",
      "questions.q1.label": "QUESTION 1",
      "questions.q1.question": "How do I find today's priorities without constant tweaking?",
      "questions.q1.answer":
        "When planning, tasks, and routines are in one view, decisions become faster and focus stays on what matters.",
      "questions.q2.label": "QUESTION 2",
      "questions.q2.question": "How do I build lasting habits, not just short motivation spikes?",
      "questions.q2.answer":
        "Small daily choices, realistic pacing, and visible progress help habits stick without overload.",
      "questions.q3.label": "QUESTION 3",
      "questions.q3.question": "How do I keep wellbeing in place during busy weeks?",
      "questions.q3.answer":
        "When wellbeing tracking is part of your daily flow, balance holds better even when life gets hectic.",
      "download.title": "DOWNLOAD OUR APP",
      "download.subtitle":
        "Start using NexaLife on your phone. Choose your platform and download the app.",
      "download.googlePlay": "Google Play",
      "download.appStore": "App Store",
      "help.title": "Need help?",
      "help.email": "Email:",
      "help.support": "Support:",
      "footer.pages": "Pages",
      "footer.about": "About",
      "footer.contact": "Contact",
      "footer.legal": "Legal",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Service",
      "footer.copyright": "© 2026 All rights reserved.",
    },
  };

  const selectedRoot = languageSelectCustom.querySelector(".language-select-selected");
  const selectedFlag = selectedRoot?.querySelector(".language-flag-icon");
  const selectedName = selectedRoot?.querySelector(".language-name");
  const options = languageSelectDropdown.querySelectorAll(".language-option");
  const i18nElements = document.querySelectorAll("[data-i18n]");

  const applyLanguage = (lang) => {
    const chosen = translations[lang] ? lang : "fi";
    const dict = translations[chosen];
    document.documentElement.lang = chosen;
    localStorage.setItem("nexalife_lang", chosen);
    document.title =
      chosen === "fi"
        ? "NexaLife - Hyvinvointiautomaatiota arkeen"
        : "NexaLife - Wellbeing automation for everyday life";

    i18nElements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key || !dict[key]) return;
      el.textContent = dict[key];
    });

    const option = Array.from(options).find((opt) => opt.getAttribute("data-lang") === chosen);
    if (option) {
      const flag = option.getAttribute("data-flag") || "./assets/images/finland_flags_flag_9256.png";
      const flagAlt = option.getAttribute("data-alt") || "Suomi";
      const name = option.getAttribute("data-name") || "Suomi";

      languageSelector.setAttribute("data-lang", chosen);
      languageSelect.value = chosen;
      if (selectedFlag && selectedFlag.tagName === "IMG") {
        selectedFlag.setAttribute("src", flag);
        selectedFlag.setAttribute("alt", flagAlt);
      }
      if (selectedName) selectedName.textContent = name;
      options.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");
    }
  };

  selectedRoot?.addEventListener("click", () => {
    languageSelectCustom.classList.toggle("active");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const lang = option.getAttribute("data-lang") || "fi";
      applyLanguage(lang);
      languageSelectCustom.classList.remove("active");
    });
  });

  languageSelect.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
  });

  document.addEventListener("click", (event) => {
    if (!languageSelectCustom.contains(event.target)) {
      languageSelectCustom.classList.remove("active");
    }
  });

  const browserLang = (navigator.language || "fi").toLowerCase().startsWith("fi") ? "fi" : "en";
  const savedLang = localStorage.getItem("nexalife_lang");
  applyLanguage(savedLang || browserLang);
}
