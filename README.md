# CAS.ai Test Assignment

Responsive 3-step registration form built with semantic HTML5, Tailwind CSS, and vanilla JavaScript.

## Live Demo

https://mvolodimirovic.github.io/cas-test/

## Project Overview

This project is a multi-step registration form created as a frontend test assignment for the Junior Frontend Developer position at CAS.ai.

The implementation focuses on clean semantic markup, responsive layout, step-based navigation, client-side validation, and local asset management without using any CDN.

## Requirements Covered

- 3-step registration form
- Step indicator (1 → 2 → 3)
- Next / Back navigation
- Only the active step is visible
- Client-side validation before moving to the next step
- Required field validation
- Email format validation
- Ukrainian phone number validation
- Inline error messages under invalid fields
- Form submission outputs structured JSON to `console.log()`
- Responsive layout for desktop and mobile
- No CDN usage — all assets are stored locally

## Tech Stack

- HTML5
- Tailwind CSS v4
- Vanilla JavaScript
- Tailwind CLI
- GitHub Pages for deployment

## Project Structure

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
├── src
│   └── styles
│       └── tailwind.css
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── README.md