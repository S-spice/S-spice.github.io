(() => {
  const note = document.querySelector("[data-markdown-src], [data-markdown-param]");

  if (!note) {
    return;
  }

  let src = note.getAttribute("data-markdown-src");

  if (!src) {
    const paramName = note.getAttribute("data-markdown-param");
    const slug = paramName ? new URLSearchParams(window.location.search).get(paramName) : "";

    if (slug && /^[a-z0-9-]+$/i.test(slug)) {
      src = `${slug}.md`;
    }
  }

  if (!src) {
    note.innerHTML = "<p>Markdown source is missing.</p>";
    return;
  }

  const renderError = (message) => {
    note.innerHTML = `<p class="note-error">${message}</p>`;
  };

  const renderMarkdown = (markdown) => {
    if (!window.marked) {
      renderError("Markdown renderer failed to load.");
      return;
    }

    window.marked.setOptions({
      breaks: false,
      gfm: true,
      headerIds: false,
      mangle: false,
    });

    const html = window.marked.parse(markdown);
    note.innerHTML = window.DOMPurify ? window.DOMPurify.sanitize(html) : html;

    note.querySelectorAll("a[href^='http']").forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });

    const title = note.querySelector("h1");
    if (title) {
      document.title = `${title.textContent} | Xuchu Ma`;
    }
  };

  fetch(src)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not load ${src}`);
      }

      return response.text();
    })
    .then(renderMarkdown)
    .catch(() => {
      renderError("Could not load this Markdown note. If you are previewing locally, run a small web server instead of opening the HTML file directly.");
    });
})();
