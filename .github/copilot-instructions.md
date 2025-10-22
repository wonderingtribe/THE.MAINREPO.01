# GitHub Copilot Instructions for Ai-bilder

## Project Overview

This is an AI builder for websites and apps that is cross-platform and integrates with multiple AI services. The project provides API keys, domains, and related services to users.

## Code Style and Standards

### General Guidelines

- Write clean, readable, and maintainable code
- Follow consistent naming conventions across the codebase
- Use meaningful variable and function names that describe their purpose
- Keep functions small and focused on a single responsibility

### Comments and Documentation

- Document all public APIs, functions, and classes
- Add inline comments only when the code logic is complex or non-obvious
- Keep documentation up-to-date with code changes
- Use clear and concise language in comments

## Security Best Practices

### API Keys and Secrets

- **NEVER** hardcode API keys, secrets, or credentials in the code
- Use environment variables for all sensitive configuration
- Store secrets in secure secret management systems
- Add all secret files to `.gitignore` to prevent accidental commits

### Input Validation

- Always validate and sanitize user input
- Implement proper authentication and authorization checks
- Use parameterized queries to prevent SQL injection
- Validate file uploads and restrict file types

### Data Protection

- Encrypt sensitive data at rest and in transit
- Use HTTPS for all network communications
- Implement proper error handling without exposing sensitive information
- Follow the principle of least privilege for access control

## Cross-Platform Considerations

- Ensure code works across different operating systems (Windows, macOS, Linux)
- Use platform-independent path handling
- Test on multiple platforms when possible
- Avoid platform-specific dependencies unless absolutely necessary
- Document any platform-specific requirements or limitations

## Testing Requirements

### Test Coverage

- Write unit tests for all new features and bug fixes
- Aim for high test coverage (ideally 80%+)
- Include edge cases and error scenarios in tests
- Keep tests isolated and independent

### Test Organization

- Place tests in appropriate test directories
- Use descriptive test names that explain what is being tested
- Follow the Arrange-Act-Assert pattern in tests
- Mock external dependencies and API calls

## AI Integration Guidelines

- Implement proper error handling for AI service failures
- Add rate limiting and retry logic for AI API calls
- Cache AI responses when appropriate to reduce costs
- Document which AI services are being used and why
- Consider fallback options when AI services are unavailable

## Dependencies and Packages

- Minimize external dependencies
- Keep dependencies up-to-date with security patches
- Document the purpose of each dependency
- Prefer well-maintained and widely-used packages
- Review licenses before adding new dependencies

## Performance Considerations

- Optimize for performance without sacrificing readability
- Implement caching strategies where appropriate
- Avoid unnecessary API calls or database queries
- Profile and monitor performance-critical code paths

## Git and Version Control

- Write clear and descriptive commit messages
- Keep commits focused on a single change or feature
- Create feature branches for new development
- Review code changes before committing

## Continuous Integration

- Ensure all code passes CI checks before merging
- Fix failing tests promptly
- Monitor Azure Pipelines for build and test results
