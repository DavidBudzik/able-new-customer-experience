# Able Customer Experience App

A modern, full-featured React application built with Vite that provides an interactive customer experience platform. The app combines playbooks, intelligence resources, workspace tools, and workflow execution into a cohesive, user-friendly interface.

## 🚀 Features

### Core Functionality
- **Home Dashboard**: Personalized landing page with featured playbooks, curated intelligence, and quick action tiles
- **Playbooks Library**: Browse and search through all available playbooks with filtering capabilities
- **Intelligence Library**: Access curated intelligence resources and insights
- **Workspace**: 3-panel layout (Sources | Chat | Studio) for focused analysis and collaboration
- **Workflow Execution**: Interactive playbook runner with step-by-step guidance
- **Chat Interface**: Dedicated chat page for conversations and interactions
- **Responsive Design**: Mobile-friendly layouts that adapt seamlessly to different screen sizes

### Design Highlights
- Clean, modern UI with consistent design tokens
- Smooth transitions and hover states
- Accessible focus states and keyboard navigation
- Playbook-specific color theming
- Pixel-perfect spacing using a 4pt grid system

## 📋 Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🛠️ Getting Started

### Installation

```bash
cd app
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

## 📁 Project Structure

```
app/
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── assets/            # Image assets and logos
│   │   ├── able-logo.svg
│   │   └── react.svg
│   ├── components/        # Reusable UI components
│   │   ├── workspace/     # Workspace-specific components
│   │   │   ├── ChatPanel.tsx
│   │   │   ├── SourcesPanel.tsx
│   │   │   └── StudioPanel.tsx
│   │   ├── AbleLogo.tsx
│   │   ├── ChatInputField.tsx
│   │   ├── Hero.tsx       # Hero section with search
│   │   ├── IntelligenceSection.tsx
│   │   ├── PlaybooksSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── Rail.tsx       # Side navigation rail
│   │   ├── StandardWorkflowsSection.tsx
│   │   └── TopBar.tsx
│   ├── pages/            # Page components
│   │   ├── Chat.tsx
│   │   ├── Home.tsx       # Main dashboard
│   │   ├── IntelligenceLibrary.tsx
│   │   ├── Library.tsx
│   │   ├── PlaybooksLibrary.tsx
│   │   ├── Workflow.tsx   # Playbook execution
│   │   └── Workspace.tsx  # 3-panel workspace
│   ├── styles/           # Design tokens and global styles
│   │   └── tokens.css    # CSS custom properties
│   ├── App.tsx           # Main app component with routing
│   ├── App.css           # App-level styles
│   ├── index.css         # Global styles
│   └── main.tsx          # Application entry point
├── dist/                 # Production build output
├── index.html            # HTML template
├── package.json
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md
```

## 🎨 Design System

The app uses CSS custom properties (design tokens) for consistent styling across all components.

### Colors
- **Background**: Warm off-white (`--bg-app: #fbfaf7`)
- **Rail**: Subtle background (`--bg-rail: #f5f4f0`)
- **Text**: Dark brown (`--text: #1c1917`)
- **Muted**: Medium gray (`--muted: #78716c`)
- **Playbook Colors**: Blue, Violet, Purple, Emerald, Amber, Rose, Cyan, Teal
- **CTA**: Red accent (`--cta-default: #e03500`)

### Typography
- **Font Family**: Roboto/Inter with system fallbacks
- **Scale**: 10px (xs) → 32px (3xl)
- **Base Size**: 14px

### Spacing
4pt grid system:
- `--space-xs`: 4px
- `--space-sm`: 8px
- `--space-md`: 12px
- `--space-lg`: 16px
- `--space-xl`: 24px
- `--space-2xl`: 32px
- `--space-3xl`: 48px

### Border Radius
- Small: 8px
- Medium: 12px
- Large: 14px
- Extra Large: 16px
- Full: 999px

### Shadows
- Small, Medium, Large, and Extra Large variants
- Subtle, layered depth effects

## 🗺️ Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Main dashboard with playbooks and intelligence |
| `/chat` | `Chat` | Dedicated chat interface |
| `/library/playbooks` | `PlaybooksLibrary` | Full playbook library with search and filters |
| `/library/intelligence` | `IntelligenceLibrary` | Intelligence resources library |
| `/projects` | `Workspace` | Workspace view (3-panel layout) |
| `/workspace` | `Workspace` | Alternative route to workspace |
| `/workflow/:id` | `Workflow` | Execute a specific playbook by ID |

## 🛠️ Technologies

### Core
- **React 19.2.0**: UI library
- **TypeScript 5.9.3**: Type-safe JavaScript
- **Vite 7.2.4**: Build tool and dev server

### Routing
- **React Router DOM 7.11.0**: Client-side routing

### Icons
- **Lucide React 0.562.0**: Modern icon library

### Development Tools
- **ESLint**: Code linting
- **TypeScript ESLint**: TypeScript-specific linting rules
- **Vite React Plugin**: React Fast Refresh and JSX support

## 🎯 Key Components

### Navigation
- **Rail**: Fixed side navigation with icon-based menu items
- **TopBar**: Top navigation bar (when used)

### Sections
- **Hero**: Search-enabled hero section
- **PlaybooksSection**: Featured playbooks grid
- **IntelligenceSection**: Curated intelligence cards
- **ProjectsSection**: Project workspace cards
- **StandardWorkflowsSection**: Standard workflow templates

### Workspace
- **SourcesPanel**: Source documents and resources
- **ChatPanel**: Interactive chat interface
- **StudioPanel**: Analysis and editing workspace

## 🔧 Development

### Code Style
- TypeScript for type safety
- CSS Modules for component-scoped styles
- Design tokens for consistent styling
- Component-based architecture

### Adding New Features
1. Create components in `src/components/`
2. Add pages in `src/pages/`
3. Update routes in `src/App.tsx`
4. Use design tokens from `src/styles/tokens.css`
5. Follow existing component patterns

### Building for Production
The production build is optimized with:
- Code splitting
- Asset optimization
- Tree shaking
- Minification

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.
