# AI-bilder Monorepo

This repo hosts multiple projects in one place (monorepo). It combines:
- ai-bilder (currently at repo root; will be moved under apps/ai-bilder later)
- apps/ai-wonderland — SaaS app that helps create CircleCI configurations
- demos/demo-repository — demo code
- docs/circleci — CircleCI documentation (verify licensing for redistribution)

## Structure

```
.
├─ (root) ai-bilder (current)
├─ apps/
│  └─ ai-wonderland/
├─ demos/
│  └─ demo-repository/
└─ docs/
   └─ circleci/
```

## Getting started

Each app has its own setup and commands. For JavaScript apps:
- cd <path-to-app>
- npm ci
- npm test (optional)

If an app uses another language/toolchain, see its README in that folder.

## CI

A simple GitHub Actions workflow runs on push/PR and only runs Node setup/tests for folders that contain a package.json. You can expand it later for other languages.

## Notes

- Original repositories will be archived after the monorepo PR merges so their full history and PRs remain accessible in read-only mode.
- If you ever want full git history inside this monorepo later, we can import it then without affecting your archived repos.
