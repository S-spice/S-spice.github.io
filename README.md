# Xuchu Ma Research Portfolio

A minimal static research portfolio for GitHub Pages.

## How to use

1. Replace placeholder text in HTML files.
2. Put your CV at `assets/files/Xuchu_Ma_CV.pdf`.
3. Add project figures to `assets/img/`.
4. Write note content in Markdown files under `notes/`, then keep a matching HTML wrapper for each note page.
5. Push the repository to GitHub.
6. Enable GitHub Pages from the repository settings.

## Writing notes in Markdown

Notes can be written as Markdown files under `notes/`. The shared reader page `notes/view.html` loads a Markdown file from the `note` query parameter. For example, `notes/view.html?note=git-basic-flow` renders `notes/git-basic-flow.md`.

To add another Markdown note:

1. Create a Markdown file under `notes/`, for example `notes/git-basic-flow.md`.
2. Add a card to `notes.html`.
3. Link the card to `notes/view.html?note=git-basic-flow`.

If you prefer a cleaner URL for a specific article, you can also copy a thin HTML wrapper such as `notes/boost-state-space.html`, update its `<title>` and `data-markdown-src`, then link to that wrapper instead.

When previewing locally, run a small web server from the repository root instead of opening the HTML file directly:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/notes/boost-state-space.html`.

## Suggested repository structure for research projects

Keep the website repository lightweight. Put code and datasets in separate project repositories, then link them from the project pages.

Example:

- `xuchu-ma.github.io` — personal website
- `boost-converter-physics-informed-modeling` — code, scripts, report
- `transformer-ca-cnn` — code and model README
- `dga-forecasting-cbam-siren-lstm` — code and model README

## License

You may use MIT License for website code. For datasets, check whether you have the right to redistribute them before making them public.
