# Software Engineer Portfolio — Vienna

A bright, minimal, recruiter-friendly portfolio built with React, TypeScript, Vite, Tailwind CSS v4, Lucide icons, and subtle Motion animations. It comes with a GitHub Actions workflow for GitHub Pages, optional public GitHub repository integration, accessible navigation, and editable content. No real credentials, work experience, projects, or skills are fabricated.

## 1. Start locally

**Requirements:** Node.js 22+ and npm.

```bash
npm install
npm run dev
```

Open the local address printed by Vite (typically `http://localhost:5173/`).

```bash
npm run check    # eslint + TypeScript + production build
npm run preview  # preview the built website
```

## 2. Customize your content

Edit **`src/data/portfolio.ts`**. This is the single source of truth for your public-facing content:

| Field | What to set |
| --- | --- |
| `identity.name` / `identity.initials` | Your name and 1–3 letter initials |
| `identity.email` | Your email address, e.g. `'hello@example.com'` |
| `identity.githubUrl` / `linkedinUrl` | Complete HTTPS URLs |
| `identity.resumePath` | e.g. `'resume.pdf'` or `null` until available |
| `copy` | Your intro, about text, education summary |
| `skills[].items` | e.g. `['TypeScript', 'Python']` **only if those are your real skills** |
| `projects` | 3–4 real projects; edit name, summary, tags, links, image |
| `experience` | Your real job titles, companies, dates, achievements, tags |

The starting project cards, experience entry, and skill tags are **clearly marked as examples/placeholders**. Replace or remove them before sharing your site with recruiters. Remove `placeholder: true` when you provide real content. No placeholder social button navigates to a made-up profile.

**Project images:** Put files under `public/images/` and set `image: 'images/my-project.webp'`. Images are lazily loaded and resolve correctly on both types of GitHub Pages URL. If `image` is null, a lightweight CSS illustration is shown (labeled as a placeholder). Use compressed WebP/AVIF images for best performance.

**Resume:** Add your real PDF file to `public/resume.pdf` and set `identity.resumePath: 'resume.pdf'`. The download link appears only when a path is set. Ensure the file exists.

**Favicon:** Edit `public/favicon.svg` to replace `YN` with your initials. Do the same in `public/og-image.svg` and customize social preview wording if you'd like. Both SVG files are lightweight and scalable.

**SEO:** Vite generates the document title, description, and social title/description at build time using the profile name. If an actual deployed URL is known, it also outputs canonical URL and social image tags. Update the explanatory description in `vite.config.ts` if you want your own SEO copy. For maximum sharing compatibility, you can replace `public/og-image.svg` with a rendered PNG and update the image filename in `vite.config.ts`.

## 3. Optional: display real GitHub repositories

In `src/data/portfolio.ts`:

```ts
githubIntegration: {
  enabled: true,
  username: 'YOUR_ACTUAL_GITHUB_USERNAME',
  repositories: ['my-project-one', 'my-project-two'], // optional selection; [] = latest public repos
  maxProjects: 3,
},
```

The page requests public repositories from the **GitHub REST API**, omits forks and archived repos, and displays live repository names, descriptions, main language and topics, code link, and homepage (if one exists). It displays loading text while fetching. If GitHub is unreachable, rate-limited, or there are no matching public repositories, it falls back to the locally configured project entries. This requires no API token or backend, but is subject to GitHub's public unauthenticated rate limit. For curated screenshots and descriptions, the hand-edited `projects` list is recommended.

## 4. Publish to GitHub Pages

This project **supports both** URL styles with automatic Vite base detection inside GitHub Actions:

| Repository | Published URL | Auto base |
| --- | --- | --- |
| `USERNAME.github.io` | `https://USERNAME.github.io/` | `/` |
| e.g. `portfolio` | `https://USERNAME.github.io/portfolio/` | `/portfolio/` |

1. Create a new GitHub repository named either `YOUR_USERNAME.github.io` or any repository name you prefer.
2. Commit the project **contents** to the root of your repository and push to the `main` branch.
3. Open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. GitHub automatically runs `.github/workflows/deploy.yml` on pushes to `main`. It lints, type-checks, builds, uploads `dist/`, and publishes the website.
5. Visit the URL shown in the GitHub Actions deployment step or repository Pages settings.

A generic command sequence (after creating an empty repo on GitHub):

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

**Manual build:** For a project-path deployment outside GitHub Actions, create `.env` with `VITE_BASE_PATH=/REPOSITORY/`; for a root deployment, leave the default `/`. You can also provide `VITE_SITE_URL=https://USERNAME.github.io/REPOSITORY/` for canonical and social image metadata. For root deployments, use `https://USERNAME.github.io/`. No environment variable is required for the supplied GitHub Actions workflow.

**Project-path support:** Vite rewrites built JS/CSS asset URLs using `base`; all public image and CV URLs go through `assetUrl()`, which uses Vite's `BASE_URL`. The build emits an appropriately linked, clean `404.html` at each base path. In-page navigation uses regular `#anchors` and does not require React Router or special history fallbacks.

## 5. Accessibility and performance

- Responsive layouts at mobile, tablet, and desktop sizes.
- Keyboard-friendly links, visible focus rings, skip link, semantically named sections, and a dismissible mobile menu (Escape).
- Respects `prefers-reduced-motion` in both CSS and Motion.
- Lightweight custom CSS artwork instead of stock photos and animation-heavy canvases.
- Optional project thumbnails use `loading="lazy"`; fonts are bundled locally.
- Missing email, CV, and links stay disabled/hidden instead of leading to dummy URLs.
- Contact email copy uses the Clipboard API when available, with mailto fallback.
- No tracking scripts, API keys, or backend are required.

## Project layout

```text
src/
  components/    Header, reusable section heading, hero/project artwork, social links, reveal animation
  data/          portfolio.ts — your content, skills, projects, experience
  hooks/         optional GitHub repository integration
  lib/           safe link validation and base-aware public asset helper
  App.tsx        page sections and interactions
  main.tsx       React entry
  styles.css     Tailwind v4 and small design-system CSS
public/          favicon, social preview, and your optional photos/CV
.github/workflows/deploy.yml
vite.config.ts    Vite base detection, SEO HTML, and 404 generator
```

## Useful references

- [Vite: Deploying a static site](https://vite.dev/guide/static-deploy.html#github-pages)
- [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [GitHub Pages with Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Motion: Reduced motion](https://motion.dev/docs/react-use-reduced-motion)

Made to be customized. Replace the placeholders with your real story, then publish.
