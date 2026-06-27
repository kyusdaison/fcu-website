# Future Citizen University — Website

A bilingual (English / 简体中文) static website for **Future Citizen University (FCU)**.
No build step — plain HTML, CSS and JavaScript. Just static files served as-is.

## Pages
- `index.html` — Home: hero, vision, interactive interfaculty diagram, five faculties, degree ladder, contact
- `about.html` — About: vision, mission, academic standards, principles, interfaculty diagram
- `news.html` — News & updates
- `faculty-digital-governance.html` · `faculty-computing-ai.html` · `faculty-economy-finance.html` · `faculty-human-development.html` · `faculty-design-media.html` — the five foundational faculties
- `styles.css` · `app.js` — shared styles and scripts (language toggle, diagram interaction)

## Deploy on Cloudflare Pages (connected to this GitHub repo)
1. Push these files to a GitHub repository **with the files at the repository root** (so `index.html` is at the top level).
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → authorize GitHub → select this repository.
3. Build settings (this is a no-build static site):
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
4. **Save and Deploy.** The site goes live at `https://<project-name>.pages.dev`.
5. Every future push to the repo redeploys automatically.

A custom domain (e.g. `futurecitizen.university`) can be attached later under the Pages project → **Custom domains**.

## Notes
- The language toggle (中 / EN) remembers the visitor's choice via `localStorage`.
- Contact address: `info@fcu.ms`.
