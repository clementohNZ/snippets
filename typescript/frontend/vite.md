# Helpful Vite Snippets

Learn more about Vite [here](https://vitejs.dev/).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Environment Checks](#environment-checks)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Environment Checks

```typescript
export function isDev(): boolean {
  return import.meta.env.DEV
}

export function isProd(): boolean {
  return import.meta.env.PROD
}
```
