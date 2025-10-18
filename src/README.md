# Source Code

> **Status**: 🚧 Coming Soon

This directory will contain the main application source code.

## Planned Structure

```
src/
├── api/              # API routes and controllers
├── core/             # Core business logic
│   ├── flow-runtime/ # Flow execution engine
│   ├── blocks/       # Block implementations
│   └── adapters/     # Model provider adapters
├── models/           # Data models and schemas
├── services/         # Business services
├── middleware/       # Express middleware
├── utils/            # Utility functions
├── config/           # Configuration management
└── index.js          # Application entry point
```

## Development

When implementing features:

1. Follow the modular architecture
2. Keep components loosely coupled
3. Write unit tests alongside code
4. Document public APIs
5. Handle errors appropriately

## Testing

Each module should have corresponding tests in the `tests/` directory.
