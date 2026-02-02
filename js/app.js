const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const setActiveLink = (id) => {
  document.querySelectorAll(".nav-links a[data-section]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.section === id);
  });
};

const createTagRow = (items = []) => {
  const row = document.createElement("div");
  row.className = "tag-row";
  items.forEach((item) => {
    const tag = document.createElement("span");
    tag.textContent = item;
    row.appendChild(tag);
  });
  return row;
};

const createList = (items = []) => {
  const list = document.createElement("ul");
  list.className = "bullet-list";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
  return list;
};

const buildProfile = (profile) => {
  const container = document.getElementById("profile");
  if (!container || !profile) return;

  container.innerHTML = `
    <div class="profile-photo">
      <img src="${profile.photo}" alt="${profile.photoAlt}">
    </div>
    <div class="profile-content">
      <p class="eyebrow">${profile.role}</p>
      <h1>${profile.name}</h1>
      <p class="intro">${profile.summary}</p>
      <div class="typewriter" aria-live="polite">
        <span>Focused on</span>
        <span class="typewriter-text">${profile.phrases[0]}</span>
      </div>
      <div class="hero-actions">
        <a class="primary" href="#contact">${profile.ctaPrimary}</a>
        <a class="secondary" href="#projects">${profile.ctaSecondary}</a>
      </div>
    </div>
  `;
};

const buildExperience = (experience) => {
  const container = document.getElementById("experience-list");
  if (!container) return;
  container.innerHTML = "";

  experience.forEach((role) => {
    const article = document.createElement("article");
    article.className = "timeline-item";
    article.innerHTML = `
      <div class="timeline-meta">
        <h3>${role.title}</h3>
        <span>${role.company} · ${role.duration}</span>
      </div>
      <p class="timeline-body">${role.description}</p>
    `;

    if (role.highlights?.length) {
      article.appendChild(createList(role.highlights));
    }

    if (role.tech?.length) {
      article.appendChild(createTagRow(role.tech));
    }

    if (role.projectLink) {
      const link = document.createElement("a");
      link.className = "experience-link";
      link.href = `#${role.projectLink}`;
      link.textContent = role.linkLabel;
      article.appendChild(link);
    }

    container.appendChild(article);
  });
};

const buildProjects = (projects) => {
  const container = document.getElementById("projects-list");
  if (!container) return;
  container.innerHTML = "";

  projects.forEach((project) => {
    const article = document.createElement("article");
    article.className = "project-deepdive";
    article.id = project.id;

    article.innerHTML = `
      <div class="project-header">
        <div>
          <h3>${project.title}</h3>
          <p class="project-subtitle">${project.context}</p>
        </div>
        <button class="project-toggle" type="button" aria-expanded="false">
          View technical breakdown
        </button>
      </div>
      <div class="project-body" hidden>
        <p>${project.overview}</p>
        <div class="project-columns">
          <div>
            <h4>My role & responsibility</h4>
            ${createList(project.responsibilities).outerHTML}
          </div>
          <div>
            <h4>Technical breakdown</h4>
            ${createList(project.technical).outerHTML}
          </div>
        </div>
        <div class="diagram-grid">
          ${project.diagrams
            .map(
              (diagram) => `
                <figure class="diagram-card">
                  <figcaption>${diagram.title}</figcaption>
                  <div class="diagram">${diagram.svg}</div>
                </figure>
              `
            )
            .join("")}
        </div>
        <div class="project-columns">
          <div>
            <h4>Key decisions</h4>
            ${createList(project.decisions).outerHTML}
          </div>
          <div>
            <h4>Trade-offs</h4>
            ${createList(project.tradeoffs).outerHTML}
          </div>
        </div>
        <div>
          <h4>What I would improve</h4>
          ${createList(project.improvements).outerHTML}
        </div>
        ${project.tech?.length ? createTagRow(project.tech).outerHTML : ""}
      </div>
    `;

    container.appendChild(article);
  });
};

const buildLeadership = (leadership) => {
  const container = document.getElementById("leadership-list");
  if (!container) return;
  container.innerHTML = "";

  leadership.forEach((item) => {
    const card = document.createElement("article");
    card.className = "leadership-card";
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p class="muted">${item.organization}</p>
      <p>${item.description}</p>
      <h4>What I did</h4>
      ${createList(item.actions).outerHTML}
      <h4>Skills demonstrated</h4>
      ${createList(item.skills).outerHTML}
    `;
    container.appendChild(card);
  });
};

const buildHobbies = (hobbies) => {
  const container = document.getElementById("hobby-list");
  if (!container) return;
  container.innerHTML = "";

  hobbies.forEach((hobby) => {
    const card = document.createElement("div");
    card.className = "hobby-card";
    card.innerHTML = `
      <span class="hobby-icon">${hobby.icon}</span>
      <div>
        <h3>${hobby.title}</h3>
        <p>${hobby.description}</p>
      </div>
    `;
    container.appendChild(card);
  });
};

const buildSkills = (skills) => {
  const container = document.getElementById("skills-list");
  if (!container) return;
  container.innerHTML = "";

  skills.forEach((group) => {
    const block = document.createElement("div");
    block.innerHTML = `
      <h3>${group.title}</h3>
      ${createList(group.items).outerHTML}
    `;
    container.appendChild(block);
  });
};

const buildEducation = (education) => {
  const container = document.getElementById("education-list");
  if (!container) return;
  container.innerHTML = "";

  education.forEach((item) => {
    const article = document.createElement("article");
    article.className = "timeline-item";
    article.innerHTML = `
      <div class="timeline-meta">
        <h3>${item.school}</h3>
        <span>${item.program} · ${item.duration}</span>
      </div>
      <p class="timeline-body">${item.description}</p>
    `;
    container.appendChild(article);
  });
};

const buildContact = (contact) => {
  const container = document.getElementById("contact-card");
  if (!container || !contact) return;
  container.innerHTML = `
    <p><strong>Email:</strong> ${contact.email}</p>
    <p><strong>LinkedIn:</strong> ${contact.linkedin}</p>
    <p><strong>Location:</strong> ${contact.location}</p>
    <p class="note">${contact.note}</p>
  `;
};

const initTypewriter = (phrases = []) => {
  const typewriterText = document.querySelector(".typewriter-text");
  if (!typewriterText || phrases.length === 0) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const updateTypewriter = () => {
    if (prefersReducedMotion.matches) {
      typewriterText.textContent = phrases[0];
      return;
    }

    const currentPhrase = phrases[phraseIndex];
    typewriterText.textContent = currentPhrase.slice(0, charIndex);

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
};

const initReveal = () => {
  const revealTargets = document.querySelectorAll(".reveal");
  if (!revealTargets.length) return;

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
};

const initProjectToggles = () => {
  document.querySelectorAll(".project-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const parent = toggle.closest(".project-deepdive");
      const body = parent?.querySelector(".project-body");
      if (!body) return;
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.textContent = isOpen
        ? "View technical breakdown"
        : "Hide technical breakdown";
      body.hidden = isOpen;
      parent.classList.toggle("is-open", !isOpen);
    });
  });
};

const initData = async () => {
  const response = await fetch("data/content.json");
  const data = await response.json();

  buildProfile(data.profile);
  buildExperience(data.experience);
  buildProjects(data.projects);
  buildLeadership(data.leadership);
  buildHobbies(data.hobbies);
  buildSkills(data.skills);
  buildEducation(data.education);
  buildContact(data.contact);

  initTypewriter(data.profile.phrases);
  initProjectToggles();
  initReveal();
};

initData();
