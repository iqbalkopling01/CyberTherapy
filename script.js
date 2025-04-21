document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("dark-mode-toggle");
  toggle.addEventListener("click", function () {
    // Replace 'dark-mode' with Tailwind's 'dark' class
    document.documentElement.classList.toggle("dark");
  });

  function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  const sidebarToggle = document.querySelector(".sidebar-toggle");
  sidebarToggle.addEventListener("click", function () {
    // Retain 'sidebar-visible' for toggling visibility
    document.body.classList.toggle("sidebar-visible");
  });

  const sidebar = document.querySelector(".sidebar");
  const readingProgressContainer = document.querySelector(
    ".reading-progress-container"
  );
  const headers = document.querySelectorAll(".post-content :is(h1, h2, h3)");

  headers.forEach((header, index) => {
    const headerId = header.id || `header${index + 1}`;
    header.id = headerId;
    header.setAttribute("tabindex", "0");

    // Replace 'sidebar-link' with a Tailwind-compatible class
    const link = document.createElement("a");
    link.href = `#${headerId}`;
    link.textContent = header.textContent;
    link.className = "text-blue-500"; // Example Tailwind class
    link.dataset.headerId = headerId;

    sidebar.insertBefore(link, readingProgressContainer);
  });

  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetHeader = document.getElementById(targetId);

      if (targetHeader) {
        const headerOffset =
          targetHeader.getBoundingClientRect().top +
          window.pageYOffset -
          window.innerHeight / 2 +
          targetHeader.offsetHeight / 2;
        window.scrollTo({ top: headerOffset, behavior: "smooth" });
      }
    });
  });

  function handleScroll() {
    const headers = document.querySelectorAll(".post-content :is(h1, h2, h3)");
    let lastPassedHeaderId = null;

    headers.forEach((header) => {
      if (header.getBoundingClientRect().top < window.innerHeight / 2) {
        lastPassedHeaderId = header.id;
      }
    });

    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    sidebarLinks.forEach((link) => {
      if (lastPassedHeaderId === link.dataset.headerId) {
        // Replace 'active' with a Tailwind-compatible class
        link.classList.add("font-bold"); // Example Tailwind class
      } else {
        link.classList.remove("font-bold");
      }
    });

    const firstHeader = document.querySelector(
      ".post-content :is(h1, h2, h3):first-of-type"
    );
    const content = document.querySelector(".post-content");
    const paragraphs = content.querySelectorAll("p");
    const lastParagraph = paragraphs[paragraphs.length - 1];

    const startOffset =
      firstHeader.getBoundingClientRect().top +
      window.pageYOffset -
      window.innerHeight / 2;
    const endOffset =
      lastParagraph.getBoundingClientRect().bottom +
      window.pageYOffset -
      window.innerHeight / 2;

    const scrollTop = window.pageYOffset;
    const scrollRange = endOffset - startOffset;
    const scrollPosition = scrollTop - startOffset;

    let progress = scrollPosition / scrollRange;
    progress = Math.max(0, Math.min(1, progress));

    document.querySelector(".reading-progress-bar").style.width =
      progress * 100 + "%";
  }

  document.addEventListener("scroll", throttle(handleScroll, 25));
});