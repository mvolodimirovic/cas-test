# CAS.ai Test Assignment

Responsive 3-step registration form built with semantic HTML5, local Tailwind CSS build, and vanilla JavaScript.

## Live demo

Add your deployment URL here after publishing to GitHub Pages.

## Project requirements covered

- 3-step form with step indicator
- Next / Back navigation
- Only active step is visible
- Step-by-step client-side validation
- Inline error messages
- JSON output to `console.log()` on submit
- Responsive layout for desktop and mobile
- No CDN usage — all assets are local

## Tech stack

- HTML5
- Tailwind CSS v4 (compiled locally into a static CSS file)
- Vanilla JavaScript (ES modules)
- Node.js for the local Tailwind build and static preview server

## Project structure

```text
.
├── assets
│   ├── css
│   │   └── main.css
│   └── js
│       ├── app.js
│       └── modules
│           ├── form-state.js
│           ├── form-ui.js
│           └── form-validation.js
├── scripts
│   ├── build-tailwind.js
│   └── serve.js
├── src
│   └── styles
│       └── tailwind.css
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## How to run locally

```bash
npm install
npm run build
npm run serve
```

Open `http://localhost:4173` in the browser.

## Build notes

Tailwind is used the correct "local build" way for a test task like this:

- Tailwind source lives in `src/styles/tailwind.css`
- Local build script compiles it into `assets/css/main.css`
- The HTML file links only the generated local CSS file
- No CDN is used anywhere in the project

## Time spent

Replace with your actual time after final review.

## IDE and plugins/extensions used

Replace with your actual setup.

Example:

- VS Code
- Prettier
- ESLint
- Live Server

## AI tools used

- ChatGPT — project scaffolding, file structure, form logic, validation flow, and README drafting

## Deployment checklist

- Push the project to a public GitHub repository
- Make several meaningful commits in English
- Deploy to GitHub Pages
- Add the live URL to this README
