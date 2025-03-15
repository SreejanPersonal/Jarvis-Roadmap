# Contexts Directory

The `contexts` directory contains React Context providers that manage global state and shared functionality across the Jarvis Roadmap application. These contexts enable efficient state management and provide a way to share data between components without prop drilling.

## Directory Structure

```
contexts/
├── ThemeContext.tsx
└── README.md
```

## Available Contexts

### `ThemeContext.tsx`

Manages the application's theme state, providing functionality to switch between light and dark modes.

#### Purpose
- Maintains global theme state
- Provides theme switching functionality
- Ensures consistent theming across the application
- Persists theme preference

#### Implementation

```typescript
// ThemeContext.tsx
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => null,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

#### Usage

```typescript
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

## Best Practices

### Creating New Contexts

1. **State Management**
   - Keep context state focused and minimal
   - Consider performance implications
   - Use appropriate TypeScript types

2. **Provider Implementation**
   - Implement proper error handling
   - Add appropriate default values
   - Consider memoization when needed

3. **Documentation**
   - Add comprehensive JSDoc comments
   - Include usage examples
   - Document provider props

### Using Contexts

1. **Component Integration**
   - Use the useContext hook appropriately
   - Handle potential undefined values
   - Consider performance optimizations

2. **Error Handling**
   - Implement error boundaries
   - Provide fallback values
   - Handle edge cases

3. **Testing**
   - Write unit tests for context logic
   - Test provider components
   - Mock context values in component tests

## Contributing

When adding new contexts:

1. Follow the established pattern
2. Add comprehensive documentation
3. Include usage examples
4. Write unit tests
5. Update this README

### Guidelines

1. **Naming Conventions**
   - Use PascalCase for context names
   - Add 'Context' suffix
   - Use descriptive names

2. **File Organization**
   - One context per file
   - Include types and interfaces
   - Export all necessary components

3. **Performance**
   - Use context splitting when appropriate
   - Implement memoization
   - Avoid unnecessary re-renders

## Related Documentation

- [Components README](../components/README.md)
- [Root README](../../README.md)
