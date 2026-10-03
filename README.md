# Shashank S — Portfolio

Single-page portfolio built with React 19, TypeScript, Tailwind CSS v4 and Motion.

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build → dist/
npm run preview   # serve the production build
```

## Editing content

All content lives in `src/data/portfolio.ts` and comes from the resume. Components only render that data.

- **Resume PDF:** `public/resume/Shashank_S_Resume.pdf`. Replace the file to update both View and Download.
- **Phone number:** set `contact.showPhone = false` to hide it.
- **Education:** the resume lists none, so the section is hidden. Add entries to `education` and it appears.
- **Live demos:** add `live: 'https://…'` to a project to show a "Live" button.

## Deploying

`dist/` is a static site. Deploy it to Vercel, Netlify, GitHub Pages or any static host. No server config is needed because the site has no client-side routes.
