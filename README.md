# ironman-generator
A random character sequence generator for **Ironman** matches, supporting Rivals of Aether 2 and Melee rosters.

Every player gets a shuffled order of the full roster. After each match, pick the winner and everyone advances to the next character. Whoever wins the most rounds is the overall leader. If the app ever gets into a bad state press the **Reset All** button or clear local storage.

## Features

- 2–4 players
- **2v2 mode**: two teams of two
- Support for multiple rosters (RoA2 / SSBM)
- Win/loss tracking with per-player score and progress bar
- Undo the last round
- State persists across page refreshes (via local storage)
- **Reset All** clears sequences, results, and player names

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Adding or changing characters

Edit the rosters in `src/data/characters.js`. Each entry needs an `id`, a `name`, and an `icon` path pointing to an image in the public `icons/` folder.

## Deployment (GitHub Pages)

The app is served from the `/ironman/` subpath, set by `base` in `vite.config.js`. If you host it somewhere else, update that value.

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys on every push to `main`. In the repo, go to **Settings → Pages** and set the source to match the workflow (the `gh-pages` branch, or GitHub Actions).
