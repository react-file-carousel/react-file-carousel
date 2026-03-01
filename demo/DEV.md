# Demo App - Dev & Testing Instructions

## Quick Start

```bash
cd demo
npm install   # only needed once, or after adding new deps
npm run dev   # starts Vite at http://localhost:5173
```

That's it. Edit any file in the library's `src/` and the browser hot-reloads automatically.

## How It Works

`vite.config.ts` has a resolve alias:

```ts
resolve: {
  alias: {
    'react-file-carousel': path.resolve(__dirname, '../src/index.ts'),
  },
}
```

This tells Vite to import directly from the library's **source TypeScript files** instead of the built `dist/`. Vite compiles them on the fly and its HMR watches for changes — no build step, no reinstall, no manual refresh.

## When You Need `npm run build`

The alias is only used by the demo app. You still need to run `npm run build` from the project root when:

- Publishing the package to npm
- Testing the actual built output (CJS/ESM bundles, CSS, type declarations)
