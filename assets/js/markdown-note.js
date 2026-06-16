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
      src = `${slug}/index.md`;
    }
  }

  if (!src) {
    note.innerHTML = "<p>Markdown source is missing.</p>";
    return;
  }

  const renderError = (message) => {
    note.innerHTML = `<p class="note-error">${message}</p>`;
  };

  const noteBasePath = src.includes("/") ? src.slice(0, src.lastIndexOf("/") + 1) : "";
  const relativeUrlPattern = /^(?![a-z][a-z0-9+.-]*:|\/\/|\/|#)/i;

  const protectMath = (markdown) => {
    const math = [];
    const pattern = /(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|(?<!\\)\$(?!\s)(?:\\.|[^\n$\\])+(?<!\s)(?<!\\)\$)/g;
    const text = markdown.replace(pattern, (match) => {
      const token = `@@MATH_${math.length}@@`;
      math.push(match);
      return token;
    });

    return { text, math };
  };

  const restoreMath = (html, math) => {
    return math.reduce((result, value, index) => {
      return result.split(`@@MATH_${index}@@`).join(value);
    }, html);
  };

  const resolveLocalUrls = () => {
    note.querySelectorAll("img[src]").forEach((image) => {
      const srcValue = image.getAttribute("src");

      if (srcValue && relativeUrlPattern.test(srcValue)) {
        image.setAttribute("src", `${noteBasePath}${srcValue}`);
      }
    });

    note.querySelectorAll("a[href]").forEach((link) => {
      const hrefValue = link.getAttribute("href");

      if (!hrefValue) {
        return;
      }

      if (/^https?:\/\//i.test(hrefValue)) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      } else if (relativeUrlPattern.test(hrefValue)) {
        link.setAttribute("href", `${noteBasePath}${hrefValue}`);
      }
    });
  };

  const typesetMath = async () => {
    if (!window.MathJax) {
      return;
    }

    if (window.MathJax.startup && window.MathJax.startup.promise) {
      await window.MathJax.startup.promise;
    }

    if (window.MathJax.typesetPromise) {
      if (window.MathJax.typesetClear) {
        window.MathJax.typesetClear([note]);
      }

      await window.MathJax.typesetPromise([note]);
    }
  };

  const renderMarkdown = async (markdown) => {
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

    const protectedMarkdown = protectMath(markdown);
    const html = window.marked.parse(protectedMarkdown.text);
    const cleanHtml = window.DOMPurify ? window.DOMPurify.sanitize(html) : html;
    note.innerHTML = restoreMath(cleanHtml, protectedMarkdown.math);
    resolveLocalUrls();

    const title = note.querySelector("h1");
    if (title) {
      document.title = `${title.textContent} | Xuchu Ma`;
    }

    await typesetMath();
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
