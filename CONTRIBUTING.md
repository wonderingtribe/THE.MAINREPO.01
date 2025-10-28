# Contributing to Ai-bilder

Thank you for your interest in contributing to Ai-bilder! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Issues

- Check if the issue has already been reported
- Use the issue templates when available
- Provide clear descriptions and reproduction steps
- Include relevant system information

### Submitting Changes

1. Fork the repository
2. Create a new branch for your feature or fix
3. Make your changes with clear commit messages
4. Write or update tests as needed
5. Ensure all tests pass
6. Submit a pull request

### Pull Request Guidelines

- Follow the existing code style
- Write clear, descriptive commit messages
- Update documentation as needed
- Add tests for new features
- Ensure CI/CD checks pass

### Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/AI-WONDER-LABs/Ai-bilder.git
   cd Ai-bilder
   ```

2. **Install dependencies**

   ```bash
   make setup
   # Or manually:
   npm ci
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

4. **Run tests to verify setup**

   ```bash
   make test
   ```

5. **Start development server**
   ```bash
   make dev
   ```

### Coding Standards

- **GitHub Copilot Instructions**: This repository includes comprehensive coding instructions for GitHub Copilot in `.github/copilot-instructions.md`. These instructions help ensure consistent code generation and provide context about our project structure, technologies, and best practices.

- **Linting**: We use ESLint for code quality

  ```bash
  make lint          # Check for issues
  make lint-fix      # Auto-fix issues
  ```

- **Formatting**: We use Prettier for code formatting

  ```bash
  npm run format          # Format all files
  npm run format:check    # Check formatting
  ```

- **Testing**: Write tests for all new features
  ```bash
  make test              # Run tests
  make test-coverage     # Run with coverage
  ```

### Commit Conventions

- Use clear, descriptive commit messages
- Reference issue numbers when applicable
- Follow conventional commits format when possible:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `test:` for test changes
  - `chore:` for maintenance tasks

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes following our coding standards
3. Run `make lint && make test` to ensure quality
4. Update documentation as needed
5. Submit a pull request with a clear description

## Code of Conduct

Please note that this project follows a Code of Conduct. By participating, you are expected to uphold this code.

## Questions?

Feel free to open an issue for questions or clarifications.
