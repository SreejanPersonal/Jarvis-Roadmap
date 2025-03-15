# Jarvis Roadmap - Interactive Learning Path Navigator

[![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)](https://github.com/SreejanPersonal/Jarvis-Roadmap)
[![License](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)

## Overview

Jarvis Roadmap is an innovative web application designed to provide an interactive and engaging way to navigate through learning paths and development roadmaps. Built with React, TypeScript, and modern web technologies, this tool helps users visualize and track their progress through various technical learning journeys.

## Features

- **Interactive Timeline Visualization**: Navigate through roadmap checkpoints with an intuitive timeline interface
- **Responsive Design**: Seamless experience across desktop and mobile devices
- **Theme Customization**: Toggle between light and dark themes for comfortable viewing
- **Progress Tracking**: Mark checkpoints as completed and track your learning journey
- **Rich Content Support**: Display detailed information including descriptions, requirements, and key concepts
- **Modern UI Components**: Built with Shadcn UI for a polished and consistent look

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher) or yarn
- Git

### Cloning the Repository

```bash
# Clone the repository
git clone https://github.com/SreejanPersonal/Jarvis-Roadmap.git

# Navigate to the project directory
cd Jarvis-Roadmap

# Install dependencies
npm install
# or
yarn install
```

### Development Setup

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
# Create a production build
npm run build
# or
yarn build

# Preview the production build
npm run preview
# or
yarn preview
```

## Project Structure

```
Jarvis-Roadmap/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # Reusable React components
│   ├── contexts/        # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and data
│   ├── pages/           # Page components
│   └── App.tsx          # Root component
├── package.json         # Project dependencies and scripts
└── vite.config.ts      # Vite configuration
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_APP_TITLE=Jarvis Roadmap
VITE_APP_DESCRIPTION=Interactive Learning Path Navigator
```

### Customization

1. **Theme Configuration**
   - Modify `tailwind.config.ts` to customize colors, typography, and other design tokens
   - Update theme variables in `src/index.css`

2. **Component Styling**
   - Use Tailwind CSS utility classes for component styling
   - Customize Shadcn UI components in `src/components/ui`

3. **Roadmap Data**
   - Edit `src/lib/roadmap-data.ts` to modify or add new roadmap items
   - Follow the `RoadmapItem` interface for type safety

## Examples and Usage

### Adding a New Roadmap Item

```typescript
// src/lib/roadmap-data.ts
export const roadmapData: RoadmapItem[] = [
  {
    id: 1,
    title: "Getting Started with AI",
    description: "Introduction to artificial intelligence concepts",
    datePublished: "2024-03-20",
    content: "Detailed content about AI basics...",
    duration: "30 minutes",
    tags: ["AI", "Machine Learning", "Basics"],
    thumbnailUrl: "/placeholder.svg",
    completed: false,
    isLatest: true,
    requirements: ["Basic programming knowledge"],
    keyConcepts: ["AI fundamentals", "Machine Learning basics"]
  }
  // Add more items...
]
```

### Implementing a Custom Theme

```typescript
// src/contexts/ThemeContext.tsx
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Update documentation for significant changes
- Add appropriate tests for new features

## Troubleshooting

### Common Issues

1. **Development Server Won't Start**
   - Ensure all dependencies are installed
   - Check for port conflicts
   - Verify Node.js version compatibility

2. **Styling Issues**
   - Clear browser cache
   - Rebuild Tailwind CSS classes
   - Check for CSS specificity conflicts

3. **Type Errors**
   - Update TypeScript dependencies
   - Check for missing type definitions
   - Verify tsconfig.json settings

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please:
1. Check the [GitHub Issues](https://github.com/SreejanPersonal/Jarvis-Roadmap/issues) for existing problems and solutions
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the steps to reproduce the issue

## Acknowledgments

- [React](https://reactjs.org/) - Frontend library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn UI](https://ui.shadcn.com/) - UI components
- [Vite](https://vitejs.dev/) - Build tool
