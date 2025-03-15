# Src Directory - Source Code

The `src` directory is the heart of the Checkpoint Navigator project, containing all the source code that drives the application. Organized into several subdirectories, it houses the React components, styles, assets, and logic that define the functionality and user interface of the roadmap tool. This README provides an overview of the structure and purpose of the `src` directory and its subdirectories.

## Structure

The `src` directory is structured as follows:

```
src/
├── components/
│   ├── ui/
│   ├── CardDetail.tsx
│   ├── NavButtons.tsx
│   ├── RoadmapCard.tsx
│   ├── ThemeSwitcher.tsx
│   └── TimelineNode.tsx
├── contexts/
│   └── ThemeContext.tsx
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   ├── roadmap-data.ts
│   └── utils.ts
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
├── App.css
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```

## Contents and Subdirectories

### `components` Directory

The `components` directory contains all the reusable React components that are used to build the user interface of the Checkpoint Navigator. These components are designed to be modular and reusable across different parts of the application.

- **`ui` Subdirectory:**
    - This directory houses the UI primitive components built using Shadcn UI. These components are fundamental building blocks for the user interface, providing consistent styling and accessibility.
    - Includes a wide range of components like `accordion.tsx`, `alert-dialog.tsx`, `button.tsx`, `card.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, and many more. Each file in this directory defines a specific UI component.
    - **Purpose:** To provide a set of pre-styled, accessible, and reusable UI elements that ensure a consistent look and feel throughout the application.
    - **Usage:** Import and use these components in other React components within the application to build the UI. Customize them using Tailwind CSS utility classes and props as needed.

- **Core Components (Files in `components/` root):**
    - **`CardDetail.tsx`:**
        - **Purpose:** Displays detailed information for a selected roadmap card. This component is likely used to show expanded details when a user interacts with a roadmap summary.
        - **Usage:** Used within the main page (`Index.tsx`) to render detailed views of roadmap items.
    - **`NavButtons.tsx`:**
        - **Purpose:** Provides navigation buttons, likely used to move between different roadmaps or sections within a roadmap.
        - **Usage:** Integrated into the application layout to enable users to navigate through different roadmaps or views.
    - **`RoadmapCard.tsx`:**
        - **Purpose:** Renders a summary card for a roadmap. This component is used to display a concise overview of a roadmap, likely in a list or grid format.
        - **Usage:** Used in the main page (`Index.tsx`) to display a list of available roadmaps.
    - **`ThemeSwitcher.tsx`:**
        - **Purpose:** Implements a button or switch that allows users to toggle between light and dark themes for the application.
        - **Usage:** Placed in a prominent location in the UI (e.g., navigation bar) to allow easy theme switching.
    - **`TimelineNode.tsx`:**
        - **Purpose:** Represents a single node or checkpoint in the roadmap timeline. This component is responsible for rendering each step in the roadmap visually.
        - **Usage:** Used within the roadmap display to visualize individual checkpoints and their status.

### `contexts` Directory

The `contexts` directory contains React context providers that manage global state for the application.

- **`ThemeContext.tsx`:**
    - **Purpose:** Provides a context for managing the application's theme (light mode and dark mode). This allows components throughout the application to access and update the current theme.
    - **Usage:** Wraps parts of the application that need to be theme-aware. Components can then consume this context to adjust their styling based on the current theme.

### `hooks` Directory

The `hooks` directory contains custom React hooks that encapsulate reusable logic.

- **`use-mobile.tsx`:**
    - **Purpose:** A custom hook that detects whether the application is being viewed on a mobile device. This is useful for implementing responsive design and adapting the UI for different screen sizes.
    - **Usage:** Used in components to conditionally render or adjust UI elements based on the device type.
- **`use-toast.ts`:**
    - **Purpose:** A custom hook for using the `sonner` toast notification library. This likely provides a simplified interface for displaying toast notifications in the application.
    - **Usage:** Used in components to easily trigger and display toast notifications for user feedback or alerts.

### `lib` Directory

The `lib` directory contains utility functions and data that support the application's functionality.

- **`roadmap-data.ts`:**
    - **Purpose:** Defines the data structure and content for the roadmaps displayed in the application. This file likely contains the sample roadmap data and TypeScript interfaces for roadmap and checkpoint objects.
    - **Usage:** Modified to customize or extend the roadmap content. The `Index.tsx` page fetches roadmap data from this file.
- **`utils.ts`:**
    - **Purpose:** Contains utility functions used across the application. Currently, it includes the `cn` function, which is likely a utility for merging class names, especially useful when working with Tailwind CSS to apply conditional styles.
    - **Usage:** Import and use utility functions like `cn` in components to simplify common tasks.

### `pages` Directory

The `pages` directory contains React components that serve as pages or routes in the application.

- **`Index.tsx`:**
    - **Purpose:** The main page component of the application. It is the entry point for displaying the roadmap and likely includes the main layout and roadmap visualization logic.
    - **Usage:** Serves as the primary view for users to interact with the Checkpoint Navigator.
- **`NotFound.tsx`:**
    - **Purpose:** Component for displaying a 404 Not Found page. This page is shown when the user navigates to a route that does not exist in the application.
    - **Usage:** Rendered when the application's router cannot find a matching route for the current URL.

### Root Files in `src/`

- **`App.css`:**
    - **Purpose:** Global CSS styles for the entire application. While Tailwind CSS is used for utility-first styling, `App.css` might contain global styles or CSS resets.
    - **Usage:** Add global CSS rules that apply to the entire application here.
- **`App.tsx`:**
    - **Purpose:** The root component of the React application. It typically sets up the application layout, routing, and context providers.
    - **Usage:** Entry point for the React component tree. It renders the main structure of the application and includes components like `Toaster` for notifications.
- **`index.css`:**
    - **Purpose:** Entry point for CSS styles. It imports Tailwind CSS directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`) to include Tailwind's base styles, component styles, and utility classes in the project.
    - **Usage:** Should not be modified directly unless you need to customize Tailwind's directives. Custom styles should typically be added in `App.css` or component-specific CSS files.
- **`main.tsx`:**
    - **Purpose:** Entry point for the React application. It sets up the root element in the HTML (`index.html`) and renders the `App` component, effectively starting the React application.
    - **Usage:** Generally, no modifications are needed in this file unless you are changing the root rendering logic.
- **`vite-env.d.ts`:**
    - **Purpose:** TypeScript declaration file for Vite environment variables. It provides type definitions for environment variables that are made available by Vite, ensuring type safety when accessing environment variables in TypeScript code.
    - **Usage:** Not typically modified. It is used by TypeScript to understand the environment variables provided by Vite.

## Dependencies

The `src` directory leverages several key dependencies:

- **React:** For building the UI components and managing the component lifecycle.
- **TypeScript:** For adding static typing to JavaScript, improving code maintainability and reducing errors.
- **Tailwind CSS:** For utility-first CSS styling, enabling rapid UI development and customization.
- **Shadcn UI:** For providing accessible and reusable UI components, built on top of React and Tailwind CSS.
- **Sonner:** For toast notifications, providing a clean and user-friendly way to display alerts and feedback.

## Contributing

When contributing to the `src` directory, ensure that you follow the project's coding standards and best practices. Component logic should be placed in the `components` directory, global styles in `App.css`, and utility functions in `lib`. New React hooks should be added to the `hooks` directory, and context providers in `contexts`. Pages or route components go in the `pages` directory. UI components from Shadcn UI are located in `components/ui`.

By understanding the structure and contents of the `src` directory, developers can effectively navigate, modify, and extend the Checkpoint Navigator application.
