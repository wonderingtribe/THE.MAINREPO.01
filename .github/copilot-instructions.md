# Copilot Coding Agent - Repository Onboarding Notes

Purpose
- Give a coding agent everything needed to make, test, and validate code changes quickly and safely.
- Reduce guesswork and bash/build failures.
- Highlight required tools, common pitfalls, and validation steps so PRs the agent opens are more likely to pass CI and be accepted.

IMPORTANT NOTE ABOUT REPOSITORY INVENTORY
- I queried the repository index to assemble this file. That API response may be incomplete (directory listing results are capped). If something below looks out-of-date, check the repository contents UI: https://github.com/wonderingtribe/THE.MAINREPO.01/tree/main before making assumptions.

High-level summary
- This repository appears to be a multi-language monorepo / project collection oriented around a TypeScript/Next.js frontend and Node.js services, with Python and Go components present elsewhere. It contains docs, Docker support, CI configuration (Azure Pipelines), and multiple helper files (Makefile, docker-compose, sonar config).
- Primary languages present (by repo statistics): TypeScript, JavaScript, HTML, CSS, Python, Go, Shell, Dockerfile.

Top-level facts (important for every change)
- Node runtime: engines in package descriptors require Node >= 18 and npm >= 9. Use Node 18+ (prefer LTS). Always match this when running npm commands or creating containers.
- Lockfile: package-lock.json exists. Use npm ci (not npm install) in CI and when reproducing CI locally for deterministic installs.
- TypeScript is used (tsconfig.json and next-env.d.ts present). If you change types, run type checks.
- Tests use Jest (jest.config.js) — run jest locally before pushing.
- Docker and docker-compose definitions exist (Dockerfile, docker-compose.yml). Many developers build/run inside containers; ensure Dockerfile and compose commands remain consistent.
- CI/validation: azure-pipelines.yml is present (CI may run in Azure Pipelines). There may also be GitHub workflows (check .github/workflows). Replicate steps locally when possible.

Build & validation checklist (what you must do before opening a PR)
These are prescriptive — follow them in order and do not skip checks.

Environment
- Always create a clean workspace or run in a fresh container.
- Always copy `.env.example` -> `.env` or set environment variables from `.env.example` to avoid missing config at runtime. Never commit secrets.
- If you touch Python code, install Python dependencies: python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt.
- For Node work, use Node 18+ and npm 9+. Use nvm or Docker to lock version if needed.

Bootstrap (first-time setup)
1. Node (root or per-package):
   - nvm install 18
   - nvm use 18
   - npm ci
   - Note: use `npm ci` to ensure the lockfile is respected. If package-lock.json and package.json diverge, run `npm install` locally and update the lockfile in a dedicated dependency PR.
2. Python:
   - python3 -m venv .venv
   - source .venv/bin/activate
   - pip install -r requirements.txt
3. Containers (optional/isolated env):
   - docker compose up --build (or docker-compose up --build) — this will start services defined in docker-compose.yml.

Build
- Root-level "build" may be a placeholder. Real builds may live in subprojects (e.g., frontend or AI-WONDERLAND-INNOVATION-). Inspect package.json files in the subfolders.
- General build sequence:
  1. npm ci
  2. npm run lint
  3. npm run test (or npm run test:coverage)
  4. npx tsc --noEmit (typecheck; if no global build script, run in workspace/package where tsconfig.json lives)
  5. npm run build (where applicable; if root build is placeholder, locate and run the package-level build)
- If a Makefile is present, prefer `make help` to see implemented targets and follow project-specific targets (e.g., `make dev`, `make test`).

Test and validations
- Always run tests and linters locally:
  - npm run lint
  - npm run lint:fix (to auto-fix where safe)
  - npm run format or prettier --write .
  - npm run test (jest --passWithNoTests). If Jest reports zero tests, validate test directories exist.
  - For TypeScript: npx tsc --noEmit
- Security and dependency checks:
  - npm audit (or npm audit fix for low-risk upgrades — open a dependency PR for upgrades).
  - Scan for secrets (do not commit .env values). Check SECURITY.md for reporting procedure.
  - If Sonar is used (sonar-project.properties exists), run local Sonar scan only if configured locally; otherwise rely on CI.

Replicating CI locally
- Inspect azure-pipelines.yml and any .github/workflows/ files (if present). Reproduce:
  1. Clean checkout: git clean -fdx
  2. npm ci
  3. npm run lint
  4. npm run test
  5. Run any build step referenced by the pipeline (e.g., `make build` or package-level `npm run build`)
- If something in CI refers to environment variables or secrets, confirm that alternative local values are safe to use or mock them.

Common pitfalls & observed guidance (from repository layout)
- Always use the lockfile: use `npm ci` (CI) and `npm install` only when intentionally updating dependencies.
- The root package.json has placeholder build steps — the "real" build may be in subfolders; search for package.json files in subdirs and run their build scripts.
- Do not commit .env or secrets. Use .env.example as a template.
- If you update TypeScript types, run full typecheck and existing tests. New type errors indicate you must adjust code or types together.
- Docker builds can mask local runtime differences. If a Docker image is used in CI, build and run the image locally before opening the PR.

Project layout (key files & locations you should check first)
- Root (priority list — check these files before making changes):
  - README.md
  - PROJECT_SETUP_SUMMARY.md
  - package.json, package-lock.json
  - tsconfig.json, next-env.d.ts, next.config.js / next.config.ts
  - jest.config.js
  - Dockerfile, docker-compose.yml
  - Makefile
  - azure-pipelines.yml
  - sonar-project.properties
  - .env.example, .env.local
  - SECURITY.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md
  - requirements.txt (Python)
  - directories: src/, frontend/, backend/, app/, services/, scripts/, docs/, public/
- Subprojects:
  - AI-WONDERLAND-INNOVATION- (contains its own package.json and UI packages)
  - frontend/ (likely Next.js app)
  - backend/ (check for service-specific package.json or language-specific setup)
- CI/CD:
  - azure-pipelines.yml — primary pipeline to inspect and replicate.
  - workflow_config.yml — may control GitHub workflow behavior.

What to search (before changing anything)
- Grep for:
  - HACK, TODO, FIXME, XXX — these indicate fragile code.
  - "TODO: fix" and legacy comments in critical paths.
  - package.json scripts in subfolders.
- Look into:
  - azure-pipelines.yml and any GitHub Actions under .github/workflows/
  - PACKAGE.json files in any subdirs to find actual build/test commands
  - .env.example for required env vars and secrets masking rules
  - Makefile targets (run `make help`)

If something fails locally
- Step 1: Run `git status` and ensure you are on a clean branch
- Step 2: Clean install:
  - rm -rf node_modules
  - npm ci
  - (for Python) rm -rf .venv && recreate
- Step 3: Re-run linter and tests
- Step 4: If a command times out in CI, check pipeline logs for timeouts and try running the failing step locally with increased verbosity.
- If a dependency mismatch appears (lockfile vs package.json), do not update automatically in the target PR — open a small dependency-update PR with only package/lock changes and CI green before merging larger changes.

Security & code safety checks (must-do)
- Do not include secrets in commits. Use .env.example to explain required env variables and mark any optional keys.
- Run `npm audit` and include an audit summary in PRs if you modified dependencies.
- Check SECURITY.md for reporting vulnerabilities and follow the repo policy if you find a secret or vuln.
- When modifying auth, crypto, or payment code (Stripe present), run integration tests and add safeguards. Prefer small, reversible changes.

Editing & PR guidance
- Keep changes minimal and scoped. Large refactors require a design/plan in an issue first.
- Run all validation steps locally. Add or update unit tests for behavioral changes.
- Update package-lock.json only in dependency PRs.
- Include a PR description that lists the exact local commands you ran to validate your change (install, lint, test, build).
- If you modify runtime or build versions (Node, Python), include rationale and CI proof.

When to search further
- Trust this file by default. Only perform codebase-wide searches if:
  - The instructions above are incomplete for the task at hand.
  - CI fails in a way not explained here.
  - There are missing package.json scripts for the area you need to change.
- When you search, prefer:
  - package.json files in subdirectories
  - CI config files (azure-pipelines.yml, .github/workflows/)
  - the Makefile and docker-compose.yml for the intended environment.

Quick reference command list
- Bootstrap Node: nvm install 18 && nvm use 18 && npm ci
- Lint: npm run lint
- Lint fix: npm run lint:fix
- Format: npm run format
- Test: npm run test
- Typecheck: npx tsc --noEmit
- Docker compose: docker compose up --build
- Python deps: python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
- Clean workspace: git clean -fdx && npm ci

Final instruction to the agent
- Follow these instructions strictly before making and opening any code-change PR.
- Only perform targeted searches when the instructions are insufficient or proven incorrect.
- Double-check security-sensitive changes (auth, payments, secret handling) with a human reviewer before merging.

If any of the specifics above contradicts files you find (package.json scripts, CI contents, Makefile targets), trust the source files — update this onboarding file in a small PR describing the discrepancy so future agents have an accurate saved reference.

Acknowledgement
- These notes were prepared from a repository inventory snapshot. Verify azure-pipelines.yml and per-package package.json scripts before running CI-like sequences.