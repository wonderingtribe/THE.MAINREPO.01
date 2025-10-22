# CircleCI Docs Static Site: Technical Documentation

Welcome to the comprehensive technical documentation for the CircleCI Docs Static Site project. This documentation is designed to help developers, content authors, and contributors understand the project's architecture, workflow, and best practices.

## Table of Contents
- [Overview](#overview)
- [Documentation Files](#documentation-files)
- [Getting Started](#getting-started)
- [Contributing](#contributing)

## Overview

The CircleCI Docs Static Site is a documentation platform built using [Antora](https://antora.org/), a static site generator designed for multi-repository documentation. This project combines:

- **Component-based architecture**: Organized documentation into logical sections
- **AsciiDoc content**: Powerful markup language for technical documentation
- **Custom UI**: Tailored presentation with modern web technologies
- **Automated build pipeline**: Streamlined development and deployment process

## Documentation Files

This technical documentation consists of several specialized files:

| File | Purpose |
|------|---------|
| [README.md](README.md) | Project overview and basic usage |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Detailed system architecture |
| [DEVELOPMENT.md](DEVELOPMENT.md) | Development setup and workflows |
| [CONTENT_AUTHORING.md](CONTENT_AUTHORING.md) | Writing and formatting guidelines |
| [TECHNICAL_REFERENCE.md](TECHNICAL_REFERENCE.md) | Detailed technical specifications |
| [API_DOCS_INTEGRATION.md](API_DOCS_INTEGRATION.md) | API documentation integration guide |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Guidelines for contributors |

## Getting Started

### For Contributors

1. **Set up your environment**:
   ```bash
   git clone https://github.com/circleci/circleci-docs.git
   cd circleci-docs
   npm ci
   ```
2. **Make sure you've cloned server-4* branches (Server Administration Docs)**

```bash
   npm run fetch-server-branches
   ```

3. **Start the development server**:
   ```bash
   npm run start:dev
   ```

4. **Test the setup** (optional):
   ```bash
   ./scripts/test-setup.sh
   ```

### Enable Search (Optional)

The documentation site includes optional Algolia-powered search functionality. Search is **disabled by default** to prevent accidental exposure of API keys.

To enable search in your local or private deployment:

1. **Obtain Algolia credentials** (do not commit these to the repository):
   - `ALGOLIA_APP_ID`: Your Algolia application ID
   - `ALGOLIA_SEARCH_ONLY_KEY`: Your Algolia search-only API key (not the admin key)
   - `ALGOLIA_INDEX_NAME`: The name of your Algolia search index

2. **Configure via environment variables**:
   Create or update your `.env` file (this file is gitignored):
   ```bash
   ALGOLIA_APP_ID=your_app_id
   ALGOLIA_SEARCH_ONLY_KEY=your_search_key
   ALGOLIA_INDEX_NAME=your_index_name
   ```

3. **Configure in your build**:
   When building the site, ensure your build configuration passes these values to `site.keys.algolia` in the Antora playbook. The UI will automatically enable search when these keys are present.

**Security Note**: Never commit API keys or credentials to the repository. Always use environment variables and keep sensitive values in `.env` files (which are excluded by `.gitignore`).

### For API Documentation

This project includes integrated API documentation built with Redocly:

1. **Test the integration**:
   ```bash
   ./scripts/test-setup.sh
   ```

2. **Build API docs**:
   ```bash
   npm run build:api-docs
   ```

3. **Customize API docs**:
   - Replace `api-spec.yaml` with your OpenAPI specification
   - Edit `redocly.yaml` for styling and configuration
   - See [API_DOCS_INTEGRATION.md](API_DOCS_INTEGRATION.md) for details

### Technical Reference

3. **Review the architecture**:
   - Read [ARCHITECTURE.md](ARCHITECTURE.md) for system design
   - Review [DEVELOPMENT.md](DEVELOPMENT.md) for development workflow
   - Consult [TECHNICAL_REFERENCE.md](TECHNICAL_REFERENCE.md) for detailed specs

### For Content Authors

1. **Understand the content organization**:
   - Read [CONTENT_AUTHORING.md](CONTENT_AUTHORING.md) for guidelines
   - Review existing content for examples and patterns

2. **Set up your environment**:
   - Follow the developer setup instructions
   - Start the development server to preview changes

3. **Create or edit content**:
   - Follow the AsciiDoc formatting guidelines
   - Use the appropriate component structure
   - Test your content locally

## Contributing

We welcome contributions to both the documentation content and the technical infrastructure. To contribute:

1. Review [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines
2. Set up your development environment
3. Create a branch for your changes
4. Submit a pull request

