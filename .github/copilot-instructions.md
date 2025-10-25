# Copilot Instructions for frontend-builder

## Project Purpose

This repository is an advanced React/Next.js SaaS website and app builder.  
It features drag-and-drop UI construction, code export, multi-page editing, AI model integration, API generator, domain management, analytics, and more.

## Preferred Technologies

- React (with functional components and hooks)
- Next.js (for SSR/SSG, if used)
- Material-UI, Ant Design, or Tailwind CSS for styling
- Node.js/Express or Python/FastAPI for backend API (if applicable)
- Uses modular folder structure for components, contexts, hooks, services, etc.

## Coding Style

- Use ES6+ syntax throughout
- Favor arrow functions and functional React components
- Prefer composition over inheritance
- Use Context API and custom hooks for state management
- Use PropTypes or TypeScript (optional) for type safety
- Prefer async/await for asynchronous code

## Project Structure

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

- For drag-and-drop logic, use react-dnd or similar library
- For live code editing, use Monaco Editor or CodeMirror
- For code export, generate clean HTML/JSX or Next.js code
- For AI integration, provide connectors for user-supplied and built-in models
- For authentication, support Auth0, Firebase Auth, or Supabase Auth
- For domains, support manual assignment and future reseller API integration
- For analytics, integrate Google Analytics or similar tools

## Example Tasks

- Suggest code for adding new UI components to the builder
- Suggest code for implementing multi-page navigation
- Suggest code for integrating a REST API
- Suggest code for exporting user projects as HTML/React/Next.js code
- Suggest code for adding authentication and user management

---

This file is intended to help GitHub Copilot provide context-aware, high-quality suggestions for this project.
