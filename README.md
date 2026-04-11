# hello-yunu

Personal portfolio site for Yunu Choi — a full-page scrolling experience set against an animated night sky.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Three.js** via `@react-three/fiber` + `@react-three/drei` — stars, twinkling layers, shooting comets
- **MUI** — component library and theming
- **@react-spring/web** — spring-based scroll and UI animations
- **Vercel Analytics**

## Features

- Full-page scroll with wheel/touch hijacking — one gesture moves one section
- Animated star field with twinkling layers and diagonal shooting comets
- Per-scene fade + blur transitions driven by scroll position
- Night sky colour system — all values defined in `src/theme.tsx`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
