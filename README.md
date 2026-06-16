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

Notes can be written as Markdown files under `notes/`. The shared reader page `notes/view.html` loads a note folder from the `note` query parameter. For example, `notes/view.html?note=git-basic-flow` renders `notes/git-basic-flow/index.md`.

To add another Markdown note:

1. Create a folder under `notes/`, for example `notes/my-new-note/`.
2. Create `notes/my-new-note/index.md`.
3. Add a card to `notes.html`.
4. Link the card to `notes/view.html?note=my-new-note`.

Images can live inside the same note folder and use simple relative paths:

```markdown
![Circuit diagram](circuit.png)
```

Inline and block LaTeX formulas are rendered with MathJax:

```markdown
Inline: $E = mc^2$

Block:
$$
\dot{x} = Ax + Bu
$$
```

When previewing locally, run a small web server from the repository root instead of opening the HTML file directly:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/notes/view.html?note=boost-state-space`.

## Suggested repository structure for research projects

Keep the website repository lightweight. Put code and datasets in separate project repositories, then link them from the project pages.

Example:

- `xuchu-ma.github.io` — personal website
- `boost-converter-physics-informed-modeling` — code, scripts, report
- `transformer-ca-cnn` — code and model README
- `dga-forecasting-cbam-siren-lstm` — code and model README

## License

You may use MIT License for website code. For datasets, check whether you have the right to redistribute them before making them public.
