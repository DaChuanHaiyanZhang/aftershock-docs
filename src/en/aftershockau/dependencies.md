# Dependencies & Plugins

[[toc]]

## Core Frameworks & Runtime Environment

| Package | Description |
|------|----------|
| [@shopify/hydrogen](https://shopify.dev/docs/storefronts/headless/hydrogen/getting-started) | Shopify's official React framework, supporting server-side rendering and Hydrogen APIs. |
| [@shopify/remix-oxygen](https://shopify.dev/docs/storefronts/headless/hydrogen/getting-started) | Integration of Remix with Shopify's Oxygen Edge Runtime. |
| [@shopify/mini-oxygen](https://www.npmjs.com/package/@shopify/mini-oxygen) | Local simulation of the Oxygen runtime environment. (Used for mocking data) |
| [@remix-run/react](https://github.com/remix-run/remix) / server-runtime / fs-routes / route-config / dev | Core modules of the Remix framework, responsible for routing, data loading, building, etc. |
| [react / react-dom](https://react.dev/reference/react-dom) | React core library and DOM renderer. |
| [react-router-dom](https://reactrouter.remix.run) | Frontend routing navigation library. |
| [graphql](https://graphql.org/) | Query language for APIs. |

## Content Management & Experimentation System

| Package | Description |
|------|----------|
| [@prismicio/client](https://github.com/prismicio/prismic-client) | [Prismic](https://prismic.io/) integration for **content management and modular page components**. |
| [@intelligems/headless](https://headless.intelligems.io/) | A/B testing, pricing experiments, and feature flag control. |

---

## File Upload & Media Management

| Package | Description |
|------|----------|
| uploadcare-widget | Native Uploadcare upload control, corresponding to external script `uploadcare.full.min.js`. |
| @uploadcare/react-uploader | React component wrapper for Uploadcare. |
| spark-md5 | Computes file MD5 values (used for caching or upload verification). |

---

## Email & Communication

| Package | Description |
|------|----------|
| [Frontapp](https://dev.frontapp.com/reference/installation) | Customer service online chat tool. |
| @emailjs/browser / emailjs | Sends emails directly from the frontend using EmailJS, requiring no server-side configuration. |
| nodemailer | Node library for sending emails on the backend (Hydrogen Functions). |

---

## Animation, UI & Interaction

| Package | Description |
|------|----------|
| framer-motion | React animation library for smooth transitions and effects. |
| gsap | High-performance animation engine supporting complex timeline controls. |
| react-fast-marquee | Marquee effect component. |
| react-zoom-pan-pinch | Zoom and drag interaction for images/elements. |
| react-loading-skeleton | Page skeleton screen component. |
| swiper | Slideshow and carousel component library. |
| tailwind-scrollbar | Tailwind plugin for styling scrollbars. |

---

## Search, Sharing & Analytics

| Package | Description |
|------|----------|
| fuse.js | Lightweight fuzzy search engine for product searches. |
| react-share | Social media sharing button components. |
| isbot | Detects if a visitor is a search engine crawler, used for SEO optimization. |
| qrcode.react | React component for generating QR codes. |

---

## Utilities & Tools

| Package | Description |
|------|----------|
| crypto-js | Encryption utility library (SHA, AES, etc.). |
| js-cookie | Browser cookie management. |
| remix-utils | Remix helper functions, such as caching and session management. |

---

## Development & Build Tools

| Package | Description |
|------|----------|
| vite / vite-tsconfig-paths / vite-plugin-cjs-interop | Frontend build and bundling tools. |
| vite-bundle-visualizer / rollup-plugin-visualizer | Bundle size analysis tools. |
| eslint / eslint-plugin-hydrogen / @remix-run/eslint-config | Code quality and style checking. |
| tailwindcss / autoprefixer / postcss | Styling and CSS processing toolchain. |
| typescript / @types/react / @types/react-dom / @types/eslint | TypeScript support and type definitions. |
| prettier / @shopify/prettier-config | Code formatting. |
| @total-typescript/ts-reset | Resets TypeScript built-in types for enhanced type safety. |
| @graphql-codegen/cli / graphql / graphql-tag | GraphQL query and type generation tools. |

---

## Shopify CLI & Hydrogen Tools

| Package | Description |
|------|----------|
| @shopify/cli | Shopify's official CLI tool for Hydrogen development and deployment. |
| @shopify/hydrogen-codegen | Automatically generates GraphQL queries and type definitions. |
| @shopify/oxygen-workers-types | Shopify Edge Runtime type definitions. |

---

## Other Useful Components

| Package | Description |
|------|----------|
| @stagewise/toolbar | Development and debugging toolbar. |
| @react-icons/all-files / react-icons | Commonly used icon component library (FontAwesome, Feather, etc.). |

---

## Category Overview

| Category | Purpose | Key Packages |
|------|----------|--------|
| Core Frameworks | Hydrogen + Remix | @shopify/hydrogen, @remix-run/react |
| Content Management | CMS / Experimentation System | @prismicio/*, @intelligems/headless |
| Upload System | File upload/CDN | uploadcare-widget, @uploadcare/react-uploader |
| Animation & Interaction | UI Effects & Interactions | framer-motion, gsap, swiper |
| Email System | Email Sending | emailjs, nodemailer |
| Search & Sharing | Search & Social Sharing | fuse.js, react-share, isbot |
| Build Optimization | Vite + ESLint + Prettier | vite, eslint, prettier |

---