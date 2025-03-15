# Hooks Directory

The `hooks` directory, located within `src/hooks`, is dedicated to housing custom React hooks within the Checkpoint Navigator project. Custom hooks are a powerful feature in React that allow you to extract component logic into reusable functions. This directory helps organize and manage these custom hooks, promoting cleaner, more maintainable, and reusable code. This README provides an overview of the purpose and contents of the `hooks` directory.

## Purpose

Custom React hooks are JavaScript functions that use built-in React hooks like `useState`, `useEffect`, `useContext`, etc., to encapsulate stateful logic or side effects that can be reused across multiple components. The `hooks` directory serves as a central location for these custom hooks, making it easier to:

- **Reuse Logic:** Share stateful logic between components without duplication.
- **Improve Readability:** Extract complex logic out of components, making them easier to read and understand.
- **Enhance Maintainability:** Centralize logic in hooks, making updates and maintenance more straightforward.
- **Testability:** Custom hooks can be tested in isolation, improving the overall testability of the application.

## Contents

Currently, the `hooks` directory contains the following custom hooks:

### `use-mobile.tsx`

- **Purpose:** The `use-mobile.tsx` file defines a custom hook named `useMobile`. This hook is designed to detect whether the application is currently being viewed on a mobile device.
- **Functionality:**
    - **Device Detection:** Uses browser APIs (like `window.innerWidth` and potentially `navigator.userAgent`) to determine if the user's device is likely a mobile device based on screen width or user agent string.
    - **State Management:** Likely uses `useState` and `useEffect` to track the window size and update a boolean state (`isMobile`) that indicates whether the device is mobile.
    - **Responsiveness:** Provides a reactive way to determine mobile status, updating whenever the window size changes (e.g., on device rotation or resizing).
- **Usage:**
    1. **Import the Hook:** Import the `useMobile` hook from `src/hooks/use-mobile.tsx` into any component where you need to conditionally render or adjust UI based on the device type.
    2. **Use the Hook:** Call the `useMobile` hook within your functional component. It returns a boolean value (`isMobile`) indicating whether the device is mobile.
    3. **Conditional Rendering:** Use the `isMobile` value to conditionally render different UI elements or apply different behaviors for mobile and non-mobile devices.

    **Example Usage:**

    ```typescript jsx
    import React from 'react';
    import useMobile from '@/hooks/use-mobile';

    function ResponsiveComponent() {
      const { isMobile } = useMobile();

      return (
        <div>
          {isMobile ? (
            <p>Viewing on a mobile device</p>
          ) : (
            <p>Viewing on a desktop device</p>
          )}
        </div>
      );
    }
    ```

### `use-toast.ts`

- **Purpose:** The `use-toast.ts` file defines a custom hook named `useToast`. This hook is specifically designed to simplify the usage of the `sonner` toast notification library within the application.
- **Functionality:**
    - **Toast Management:** Provides a higher-level API for triggering toast notifications using `sonner`.
    - **Abstraction:** Wraps the `sonner` library's API, offering a more convenient and project-specific way to show toast messages (e.g., success, error, warning toasts).
    - **Customization:** May include predefined configurations or variations for different types of toast notifications used in the application.
- **Usage:**
    1. **Import the Hook:** Import the `useToast` hook from `src/hooks/use-toast.ts` into components where you need to display toast notifications.
    2. **Use the Hook:** Call the `useToast` hook to get access to toast functions (e.g., `toast.success`, `toast.error`, `toast.message`).
    3. **Trigger Toasts:** Use the returned toast functions to display notifications with appropriate messages and types.

    **Example Usage:**

    ```typescript jsx
    import React from 'react';
    import { useToast } from '@/hooks/use-toast';
    import { Button } from '@/components/ui/button';

    function ActionButton() {
      const { toast } = useToast();

      const handleClick = () => {
        // Perform action here
        toast.success("Action successfully completed!");
      };

      return <Button onClick={handleClick}>Perform Action</Button>;
    }
    ```

## Benefits of Using Custom Hooks

- **Code Reusability:** Logic for mobile detection and toast notifications is reusable across components.
- **Separation of Concerns:** Component logic remains focused on UI rendering, while hooks handle stateful or side-effect logic.
- **Improved Organization:** Custom hooks are organized in a dedicated directory, making it easy to locate and manage them.
- **Simplified Components:** Components using custom hooks are cleaner and easier to understand, as they delegate complex logic to the hooks.

## Best Practices

- **Single Responsibility:** Each hook should ideally handle a single, focused piece of logic.
- **Descriptive Names:** Use clear and descriptive names for hooks (e.g., `useMobile`, `useToast`) that indicate their purpose.
- **Documentation:** Document each custom hook with comments or a README in the `hooks` directory to explain its purpose, functionality, and usage.
- **Testing:** Write unit tests for custom hooks to ensure they function correctly in isolation.
- **Avoid Over-Abstraction:** Don't create hooks for very simple logic that is only used in one component. Hooks are most beneficial for reusable, complex logic.

By effectively utilizing custom React hooks in the `hooks` directory, the Checkpoint Navigator project promotes code reuse, improves component readability, and enhances the overall maintainability of the codebase.
