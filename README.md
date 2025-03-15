# Checkpoint Navigator - Your Interactive Roadmap Tool

[![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)](https://github.com/SreejanPersonal/checkpoint-navigator)
[![License](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)
[![Open Issues](https://img.shields.io/github/issues/SreejanPersonal/checkpoint-navigator)](https://github.com/SreejanPersonal/checkpoint-navigator/issues)
[![Pull Requests](https://img.shields.io/github/pulls/SreejanPersonal/checkpoint-navigator)](https://github.com/SreejanPersonal/checkpoint-navigator/pulls)

## Overview

Checkpoint Navigator is an interactive web application designed to visualize and navigate roadmaps. Whether you're planning a project, outlining a learning path, or visualizing any sequence of steps, this tool provides a clear and engaging way to present and follow your checkpoints. Built with React, TypeScript, and styled with Tailwind CSS and Shadcn UI, Checkpoint Navigator offers a responsive and customizable experience.

This project was generated using Lovable, a platform that simplifies web development and allows for both visual and code-based editing.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Cloning the Repository](#cloning-the-repository)
    - [Installation](#installation)
    - [Running the Development Server](#running-the-development-server)
- [Configuration](#configuration)
    - [Environment Variables](#environment-variables)
    - [Customization](#customization)
- [Examples and Usage](#examples-and-usage)
    - [Default Roadmap](#default-roadmap)
    - [Custom Roadmap Data](#custom-roadmap-data)
- [Project Structure](#project-structure)
    - [Root Directory](#root-directory)
    - [Public Directory](#public-directory)
    - [Src Directory](#src-directory)
        - [Components Directory](#components-directory)
        - [Contexts Directory](#contexts-directory)
        - [Hooks Directory](#hooks-directory)
        - [Lib Directory](#lib-directory)
        - [Pages Directory](#pages-directory)
        - [UI Components Directory](#ui-components-directory)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

- **Interactive Roadmap Visualization:** Displays roadmaps in a clear, step-by-step timeline format.
- **Responsive Design:** Works seamlessly on various devices, from desktops to mobile phones.
- **Theme Switcher:** Includes a light/dark theme toggle for user preference.
- **Customizable Components:** Built with reusable components for easy modification and extension.
- **Modern Tech Stack:** Leverages React, TypeScript, Tailwind CSS, and Shadcn UI for a robust and maintainable codebase.
- **Easy Setup:** Quick to clone, install, and run locally for development.

## Getting Started

Get started with Checkpoint Navigator by following these simple steps.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** (version 18 or higher recommended) - [Download Node.js](https://nodejs.org/)
- **npm** or **bun:** (npm comes with Node.js, bun is an alternative package manager) - [Download bun](https://bun.sh/)
- **Git:**  - [Download Git](https://git-scm.com/)

### Cloning the Repository

To clone the Checkpoint Navigator repository, use the following command in your terminal:

```bash
git clone https://github.com/SreejanPersonal/checkpoint-navigator.git
```

This command will download the entire project to your local machine. Navigate into the project directory to proceed with the setup.

```bash
cd checkpoint-navigator
```

### Installation

After cloning the repository, install the necessary dependencies. If you have `bun` installed, use:

```bash
bun install
```

If you prefer `npm`, use:

```bash
npm install
```

This command will install all the packages listed in `package.json`, which are required for the project to run.

### Running the Development Server

To start the development server and see Checkpoint Navigator in action, run:

```bash
bun run dev
```

or with npm:

```bash
npm run dev
```

This command will start a local development server. Open your browser and navigate to the address provided in the console (usually `http://localhost:5173/`) to view the application. The development server supports hot-reloading, so any changes you make to the code will be automatically reflected in the browser.

## Configuration

Checkpoint Navigator is designed to be easily configurable to suit your needs.

### Environment Variables

Currently, this project does not require any environment variables to be set up for basic usage. However, future enhancements might include features that utilize environment variables for API keys or configuration settings. Please refer to updated documentation for any future environment variable configurations.

### Customization

- **Roadmap Data:** The roadmap data is located in `src/lib/roadmap-data.ts`. You can modify this file to change the content and structure of the roadmap. See the [Examples and Usage](#examples-and-usage) section for more details.
- **Styling:** The project uses Tailwind CSS for styling. You can customize the look and feel of the application by modifying the `tailwind.config.ts` file and the CSS files in the `src` directory, particularly `src/App.css` and `src/index.css`.
- **Components:**  The components are located in the `src/components` directory. You can modify existing components or create new ones to extend the functionality of the application. Shadcn UI components are used in `src/components/ui` and can be customized as per Shadcn UI documentation.

## Examples and Usage

Checkpoint Navigator is designed to be flexible and can be used to visualize various types of roadmaps.

### Default Roadmap

By default, the application loads a sample roadmap defined in `src/lib/roadmap-data.ts`. This roadmap serves as an example and demonstrates the basic structure and features of the Checkpoint Navigator. To view the default roadmap, simply run the development server as described in the [Getting Started](#getting-started) section.

### Custom Roadmap Data

To create your own roadmap, you need to modify the data in `src/lib/roadmap-data.ts`. The `roadmapData` array contains objects representing different roadmaps. Each roadmap object has the following structure:

```typescript
interface Roadmap {
  id: string;
  title: string;
  description: string;
  checkpoints: Checkpoint[];
}

interface Checkpoint {
  id: string;
  title: string;
  description: string;
  date?: string;
  completed: boolean;
}
```

- **`Roadmap`**: Represents a single roadmap.
    - `id`: Unique identifier for the roadmap.
    - `title`: Title of the roadmap.
    - `description`: Description of the roadmap.
    - `checkpoints`: An array of `Checkpoint` objects.

- **`Checkpoint`**: Represents a single checkpoint within a roadmap.
    - `id`: Unique identifier for the checkpoint.
    - `title`: Title of the checkpoint.
    - `description`: Description of the checkpoint.
    - `date` (optional): Date associated with the checkpoint.
    - `completed`: Boolean indicating if the checkpoint is completed.

To customize the roadmap:

1. **Edit `roadmap-data.ts`:** Open `src/lib/roadmap-data.ts` in your editor.
2. **Modify or Add Roadmap Objects:**
    - To modify the existing roadmap, change the `title`, `description`, and `checkpoints` properties of the first object in the `roadmapData` array.
    - To add a new roadmap, create a new object with the structure described above and add it to the `roadmapData` array.
3. **Save Changes:** Save the `roadmap-data.ts` file. The development server will automatically reload, and you will see your changes in the browser.

## Project Structure

The project structure is organized to keep the codebase maintainable and scalable. Here's a brief overview of the main directories and files:

### Root Directory (`/`)

- **`.gitignore`**: Specifies intentionally untracked files that Git should ignore.
- **`bun.lockb` or `package-lock.json`**: Records the exact versions of dependencies used in the project.
- **`components.json`**: Configuration file for Shadcn UI components.
- **`eslint.config.js`**: Configuration file for ESLint, a JavaScript and TypeScript linter.
- **`index.html`**: The main HTML file that serves as the entry point for the application.
- **`package.json`**: Contains metadata about the project, including dependencies and scripts.
- **`postcss.config.js`**: Configuration file for PostCSS, a tool for transforming CSS.
- **`README.md`**: The current file, providing an overview of the project.
- **`tailwind.config.ts`**: Configuration file for Tailwind CSS.
- **`tsconfig.app.json`, `tsconfig.json`, `tsconfig.node.json`**: Configuration files for TypeScript.
- **`vite.config.ts`**: Configuration file for Vite, a build tool.

### `public` Directory (`/public`)

Contains static assets that are served directly without processing by Vite.
- **`favicon.ico`**: The favicon for the website.
- **`og-image.png`**: Default image for social media sharing.
- **`placeholder.svg`**: Placeholder SVG image.

### `src` Directory (`/src`)

Contains the main source code of the application.

- **`App.css`**: Global CSS styles for the application.
- **`App.tsx`**: The root component of the application.
- **`index.css`**: Entry point for CSS styles, imports Tailwind directives.
- **`main.tsx`**: Entry point for the React application, renders the `App` component.
- **`vite-env.d.ts`**: TypeScript declaration file for Vite environment variables.

#### `components` Directory (`/src/components`)

Contains reusable React components used throughout the application.

- **`CardDetail.tsx`**: Component for displaying detailed information about a roadmap card.
- **`NavButtons.tsx`**: Navigation buttons for moving between roadmaps.
- **`RoadmapCard.tsx`**: Component for displaying a summary card for a roadmap.
- **`ThemeSwitcher.tsx`**: Component for toggling between light and dark themes.
- **`TimelineNode.tsx`**: Component for rendering a node in the roadmap timeline.
- **`ui`**: Directory containing UI primitives built with Shadcn UI (see below).

#### `contexts` Directory (`/src/contexts`)

Contains React context providers for managing global state.

- **`ThemeContext.tsx`**: Context provider for managing the application's theme (light/dark mode).

#### `hooks` Directory (`/src/hooks`)

Contains custom React hooks.

- **`use-mobile.tsx`**: Hook for detecting if the application is running on a mobile device.
- **`use-toast.ts`**: Hook for using the `sonner` toast notification library.

#### `lib` Directory (`/src/lib`)

Contains utility functions and data.

- **`roadmap-data.ts`**: Defines the data structure and content for the roadmaps.
- **`utils.ts`**: Utility functions used throughout the application (e.g., `cn` for class name merging).

#### `pages` Directory (`/src/pages`)

Contains page components for different routes in the application.

- **`Index.tsx`**: The main page component, displaying the roadmap.
- **`NotFound.tsx`**: Component for displaying a 404 Not Found page.

#### `ui` Directory (`/src/components/ui`)

Contains UI primitives built using Shadcn UI. These are reusable and accessible UI components.
- Includes components like `accordion.tsx`, `button.tsx`, `card.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, and many more. Each file represents a different UI component from Shadcn UI.

## Contributing

Contributions are welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) (if created) for how to contribute to this project.

## License

This project is licensed under the [MIT License](LICENSE) - see the `LICENSE` file for details.

## Support

For support, please open an issue on GitHub or contact the maintainers through the channels listed in the `SUPPORT.md` file (if created).

---

**Checkpoint Navigator - Navigate Your Path to Success!**
