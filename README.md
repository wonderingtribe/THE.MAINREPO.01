# AI-bilder Monorepo

This repo hosts multiple projects in one place (monorepo). It combines:

- apps/ai-bilder — the original AI-bilder project
- apps/ai-wonderland — SaaS app that helps create CircleCI configurations
- demos/demo-repository — demo code
- docs/circleci — CircleCI documentation (verify licensing for redistribution)

## Structure

```
.
├─ apps/
│  ├─ ai-bilder/
│  └─ ai-wonderland/
├─ demos/
│  └─ demo-repository/
└─ docs/
   └─ circleci/
```

## Getting started

Each app has its own setup and commands. For JavaScript apps:

- cd apps/<app-name>
- npm ci
- npm test (optional)

If an app uses another language/toolchain, see its README in that folder.

## CI

A simple GitHub Actions workflow runs on push/PR. You can expand it later for other languages.

## Notes

- Original repositories will be archived after the monorepo PR merges so their full history and PRs remain accessible in read-only mode.
- If you ever want full git history inside this monorepo later, we can import it then without affecting your archived repos.
