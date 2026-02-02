const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const typewriterText = document.querySelector(".typewriter-text");
if (typewriterText) {
  const phrases = typewriterText.dataset.phrases
    ? typewriterText.dataset.phrases.split(",")
    : [];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const updateTypewriter = () => {
    if (prefersReducedMotion.matches || phrases.length === 0) {
      typewriterText.textContent = phrases[0] || "reliable systems";
      return;
    }

    const currentPhrase = phrases[phraseIndex];
    const visibleText = currentPhrase.slice(0, charIndex);
    typewriterText.textContent = visibleText;

    if (!isDeleting && charIndex < currentPhrase.length) {
      charIndex += 1;
      setTimeout(updateTypewriter, 90);
      return;
    }

    if (isDeleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(updateTypewriter, 50);
      return;
    }

    if (!isDeleting && charIndex >= currentPhrase.length) {
      isDeleting = true;
      setTimeout(updateTypewriter, 1200);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(updateTypewriter, 300);
    }
  };

  updateTypewriter();
}

const revealTargets = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-links a[data-section]");

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.section === id);
  });
};

if (revealTargets.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (entry.target.id) {
            setActiveLink(entry.target.id);
          }
        }
      });
    },
    { threshold: 0.2 }
  );

  revealTargets.forEach((section) => {
    if (prefersReducedMotion.matches) {
      section.classList.add("is-visible");
    }
    observer.observe(section);
  });
} else if (revealTargets[0]) {
  setActiveLink(revealTargets[0].id);
}

const projectRows = document.querySelectorAll(".project-row");
projectRows.forEach((row) => {
  const toggle = row.querySelector(".project-toggle");
  const body = row.querySelector(".project-body");

  if (!toggle || !body) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.textContent = isOpen ? "View details" : "Hide details";
    body.hidden = isOpen;
    row.classList.toggle("is-open", !isOpen);
  });
});

const filterButtons = document.querySelectorAll(".filter-button");
const applyFilter = (filter) => {
  projectRows.forEach((row) => {
    const tech = row.dataset.tech || "";
    const matches = filter === "all" || tech.includes(filter);
    row.hidden = !matches;
  });
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    applyFilter(button.dataset.filter);
  });
});

const mindsetItems = document.querySelectorAll(".mindset-item");
mindsetItems.forEach((item) => {
  item.addEventListener("click", () => {
    const isOpen = item.getAttribute("aria-expanded") === "true";
    item.setAttribute("aria-expanded", String(!isOpen));
  });
});
