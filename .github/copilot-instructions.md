# GitHub Copilot Instructions for AI-WONDERLAND

## Project Overview

This is a comprehensive AI builder for websites and apps that combines a powerful backend API with a modern React/Next.js frontend. The project is cross-platform, integrates with multiple AI services, and provides API keys, domains, and related services to users. It features drag-and-drop UI construction, code export, multi-page editing, AI model integration, API generator, domain management, and analytics. This project is containerized with Docker to ensure multiplatform compatibility.

## Preferred Technologies

### Backend

- Node.js/Express for REST API
- MongoDB (via Mongoose) and PostgreSQL (via Sequelize) for data storage
- Redis for caching
- JWT for authentication
- Docker for containerization

### Frontend

- React 19 (with functional components and hooks)
- Next.js 16 (for SSR/SSG)
- Tailwind CSS for styling
- Framer Motion for animations
- @dnd-kit and react-dnd for drag-and-drop functionality

## Code Style and Standards

### General Guidelines

- Write clean, readable, and maintainable code.
- Follow consistent naming conventions. Use `camelCase` for variables and functions, and `PascalCase` for classes.
- Keep functions small and focused on a single responsibility.
- Use ES6+ syntax throughout
- Favor arrow functions and functional React components
- Prefer composition over inheritance
- Use Context API and custom hooks for state management
- Use PropTypes or TypeScript (optional) for type safety
- Prefer async/await for asynchronous code

### JavaScript Best Practices

- Use modern JavaScript (ES6+ features like `const`, `let`, arrow functions, and classes).
- Use **ESLint** for static analysis to find and fix problems in your JavaScript code. Adhere to the configured ESLint rules.
- Use **Prettier** for consistent code formatting. Ensure code is formatted before committing.
- Document functions, classes, and complex logic using **JSDoc** comments.

## Security Best Practices

### API Keys and Secrets

- **NEVER** hardcode API keys, secrets, or credentials in the code.
- Use environment variables (e.g., via `.env` files for local development) for all sensitive configuration.
- Add `.env` and other secret files to `.gitignore` to prevent accidental commits.
- In production, use a secure secret management system provided by your cloud provider (e.g., GitHub Secrets, AWS Secrets Manager, Azure Key Vault).

### Input Validation

- Always validate and sanitize user input to prevent XSS and other injection attacks.
- Implement proper authentication and authorization checks for all API endpoints.
- If using a database, use an ORM or parameterized queries to prevent SQL injection.
- Validate file uploads, restrict file types, and scan for malware.

### Data Protection

- Encrypt sensitive data at rest and in transit.
- Use HTTPS for all network communications.
- Implement proper error handling that does not expose sensitive information or stack traces to the user.
- Follow the principle of least privilege for access control.

## Cross-Platform and Deployment (Using Docker)

- **Containerization is Key**: The project uses **Docker** to ensure a consistent environment across development, testing, and production, regardless of the host operating system (Windows, macOS, Linux). All new services and components should be containerized.
- **Use the Dockerfile**: Adhere to the existing `Dockerfile` for building the application's container image. Any changes to dependencies or build steps should be reflected there.
- **Leverage the Makefile**: The `Makefile` provides convenient commands for common Docker operations (e.g., `make build`, `make run`, `make test`). Use these commands to streamline your workflow and ensure consistency. Add new commands to the `Makefile` for any new routine tasks.
- **Platform-Independent Code**: Even within Docker, write platform-independent JavaScript. For instance, use the `path` module in Node.js for handling file paths (`path.join()`, `path.resolve()`) instead of hardcoding slashes.
- **Configuration**: All environment-specific configurations should be passed into the container using environment variables, not baked into the image. This aligns with the security best practice of not hardcoding secrets.
- **Testing**: When testing locally, run your tests inside the Docker container to mimic the production environment as closely as possible.

## Testing Requirements

### Test Coverage and Frameworks

- Write unit tests for all new features and bug fixes using a framework like **Jest** or **Mocha**.
- For end-to-end testing, consider using a tool like **Cypress** or **Playwright**.
- Aim for high test coverage (ideally 80%+).
- Include edge cases, error scenarios, and integration points in your tests.

### Test Organization

- Place test files alongside the source files with a `.test.js` or `.spec.js` extension, or in a `__tests__` directory.
- Use descriptive test names that explain what is being tested (e.g., `it('should return an error for invalid input')`).
- Follow the Arrange-Act-Assert pattern in tests.
- Mock external dependencies, APIs, and services using Jest's built-in mocking capabilities or libraries like `sinon`.

## AI Integration Guidelines

- Implement robust error handling for AI service failures (e.g., API downtime, unexpected responses).
- Add rate limiting and exponential backoff/retry logic for AI API calls to handle transient errors.
- Cache AI responses when appropriate to improve performance and reduce costs.
- Document which AI services are being used, their purpose, and their API versions.
- Consider fallback options or graceful degradation when AI services are unavailable.
- Provide connectors for user-supplied and built-in AI models

## Project Structure

### Backend Structure

- `src/api/`: API controllers, routes, and middleware
- `src/auth/`: Authentication and authorization logic
- `src/config/`: Configuration management
- `src/database/`: Database connections and models
- `src/models/`: Data models (User, Project, etc.)

### Frontend Structure

- `src/components/builder/`: Drag-and-drop canvas, sidebar, toolbar
- `src/components/editor/`: Code editor integration (Monaco, CodeMirror)
- `src/components/preview/`: Live preview modules
- `src/components/pages/`: Multi-page and routing logic
- `src/components/ai/`: AI integration widgets
- `src/components/auth/`: Authentication forms
- `src/components/api/`: API connector UI
- `src/components/marketplace/`: Component/plugin marketplace
- `src/components/templates/`: Template gallery/importer
- `src/components/domain/`: Domain management UI
- `src/components/analytics/`: Analytics widgets
- `src/context/`: React contexts for state/user/builder
- `src/hooks/`: Custom React hooks
- `src/services/`: API and integration logic
- `src/utils/`: Helper utilities
- `src/styles/`: Global and component styles

## Special Instructions

### Frontend Features

- For drag-and-drop logic, use react-dnd or @dnd-kit
- For live code editing, use Monaco Editor or CodeMirror
- For code export, generate clean HTML/JSX or Next.js code
- For authentication, support Auth0, Firebase Auth, or Supabase Auth
- For domains, support manual assignment and future reseller API integration
- For analytics, integrate Google Analytics or similar tools

### Backend Features

- Use Express with proper middleware (helmet, cors, rate limiting)
- Implement JWT-based authentication with refresh tokens
- Use Joi for input validation
- Support both MongoDB and PostgreSQL databases
- Implement Redis caching for performance
- Integrate with Stripe for payments

## Dependencies and Packages

- Manage dependencies using `package.json`. Use `npm` or `yarn` for package management.
- Minimize external dependencies to reduce the attack surface and bundle size.
- Keep dependencies up-to-date with security patches using tools like `npm audit` or GitHub's Dependabot.
- Document the purpose of each dependency in the `README.md` or a contributing guide.
- Review licenses before adding new dependencies to ensure compatibility.

## Performance Considerations

- Optimize for performance without sacrificing readability.
- Implement caching strategies (in-memory, Redis, etc.) for frequently accessed data.
- Avoid unnecessary API calls or database queries. Use techniques like pagination and filtering.
- Profile and monitor performance-critical code paths using tools like Node.js's built-in profiler or third-party APM services.

## Git and Version Control

- Write clear and descriptive commit messages following the [Conventional Commits](https://www.conventionalcommits.org/) specification.
- Keep commits small and focused on a single logical change.
- Create feature branches from `main` or `develop` for new development.
- Review code changes via Pull Requests before merging.

## Continuous Integration

- Ensure all code passes CI checks (linting, testing, building) before merging. Configure these checks in **GitHub Actions**.
- Fix failing tests promptly.
- Monitor GitHub Actions workflows for build and test results.

## Example Tasks

### Frontend Tasks

- Suggest code for adding new UI components to the builder
- Suggest code for implementing multi-page navigation
- Suggest code for integrating a REST API
- Suggest code for exporting user projects as HTML/React/Next.js code
- Suggest code for adding authentication and user management

### Backend Tasks

- Suggest code for creating new API endpoints
- Suggest code for implementing authentication flows
- Suggest code for database migrations
- Suggest code for integrating new AI providers
- Suggest code for implementing caching strategies

---

This file is intended to help GitHub Copilot provide context-aware, high-quality suggestions for this project.
