# Frontend AI-WONDERLAND

A powerful React/Next.js SaaS website and app builder with drag-and-drop UI, code export, multi-page support, AI model integration, API generator, domain management, and analytics.

## Features

### ✨ Drag & Drop UI Builder
- Intuitive visual editor for building websites without code
- Component palette with pre-built elements (containers, text, buttons, images, forms, etc.)
- Real-time preview with editable properties
- Nested component support

### 📤 Code Export
- Export clean React/Next.js code
- HTML export support
- Download generated code as files
- Syntax-highlighted code preview

### 📄 Multi-Page Support
- Create and manage multiple pages per project
- Page metadata configuration
- Navigation between pages
- Project organization system

### 🤖 AI Integration
- AI-powered component generation
- Content creation assistance
- Layout suggestions
- Code improvement recommendations

### 🔌 API Generator
- REST API endpoint generation
- GraphQL schema support
- Next.js API route templates
- CRUD operations scaffolding

### 🌐 Domain Management
- Custom domain connection
- DNS record configuration
- SSL certificate support
- Domain verification

### 📊 Analytics Dashboard
- Page view tracking
- Visitor analytics
- Session duration metrics
- Bounce rate monitoring
- Top pages reporting

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **UI Components**: Custom components with React Icons
- **Drag & Drop**: Custom implementation with native HTML5 API
- **Code Quality**: ESLint

## Architecture

The application follows React best practices and modern patterns:

- **Functional Components**: All components use React hooks
- **Context API**: Global state management for app, builder, and user data
- **Custom Hooks**: Reusable logic for drag-drop, analytics, and code export
- **Service Layer**: Separate services for AI, API generation, domain, and analytics
- **TypeScript**: Strong typing throughout the application
- **ES6+**: Modern JavaScript features including async/await
- **Composition**: Reusable and composable components

## Project Structure

```
frontend-builder/
├── app/                      # Next.js app directory
│   ├── analytics/           # Analytics dashboard page
│   ├── builder/             # Main builder interface
│   ├── dashboard/           # User dashboard
│   ├── projects/            # Projects list page
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Home/landing page
├── components/
│   ├── analytics/           # Analytics components
│   ├── builder/             # Builder components
│   │   ├── Canvas.tsx       # Drag-drop canvas
│   │   ├── ComponentPalette.tsx  # Component selector
│   │   ├── PropertiesPanel.tsx   # Property editor
│   │   └── CodeExportModal.tsx   # Code export UI
│   └── ui/                  # UI components
│       └── Header.tsx       # Navigation header
├── contexts/                # React contexts
│   ├── AppContext.tsx       # Project management
│   ├── BuilderContext.tsx   # Builder state
│   └── UserContext.tsx      # User authentication
├── hooks/                   # Custom React hooks
│   ├── useAnalytics.ts      # Analytics hook
│   ├── useCodeExport.ts     # Code export hook
│   └── useDragDrop.ts       # Drag-drop hook
├── services/                # Business logic services
│   ├── aiService.ts         # AI integration
│   ├── analyticsService.ts  # Analytics tracking
│   ├── apiGenerator.ts      # API generation
│   └── domainService.ts     # Domain management
└── types/                   # TypeScript definitions
    └── index.ts             # Type definitions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AI-WONDER-LABs/frontend-builder.git
cd frontend-builder
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Usage

### Creating a Project

1. Navigate to the Dashboard
2. Click "New Project" 
3. Enter project name and description
4. Start building in the Builder interface

### Building a Page

1. Open a project in the Builder
2. Drag components from the left palette onto the canvas
3. Click components to select and edit properties in the right panel
4. Use Preview mode to see the final result
5. Export code when ready

### Code Export

1. Click "Export Code" in the Builder toolbar
2. View the generated React/TypeScript code
3. Copy to clipboard or download as a file
4. Use the code in your own projects

## Key Components

### Contexts

- **AppContext**: Manages projects and global app state
- **BuilderContext**: Handles builder-specific state (current page, components, selection)
- **UserContext**: User authentication and profile

### Services

- **AIService**: AI-powered features (component generation, content creation)
- **APIGeneratorService**: Generates API endpoints and routes
- **DomainService**: Domain configuration and DNS management
- **AnalyticsService**: Event tracking and analytics data

### Custom Hooks

- **useAnalytics**: Analytics data fetching and event tracking
- **useCodeExport**: Code generation and export functionality
- **useDragDrop**: Drag-and-drop interaction handling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
