# Pages Directory

The `pages` directory, located within `src/pages`, contains the main page components for the Jarvis Roadmap application. Each file in this directory represents a distinct route or view in the application.

## Directory Structure

```
pages/
├── Index.tsx
├── NotFound.tsx
└── README.md
```

## Available Pages

### `Index.tsx`

The main landing page of the application that displays the roadmap overview.

#### Purpose
- Serves as the application's entry point
- Displays the roadmap timeline
- Shows available learning paths
- Manages roadmap item selection

#### Features
- Interactive timeline visualization
- Roadmap card grid layout
- Theme-aware styling
- Responsive design

#### Usage

```typescript
import { RoadmapCard } from '@/components/RoadmapCard';
import { roadmapData } from '@/lib/roadmap-data';

export default function Index() {
  return (
    <main>
      <div className="grid">
        {roadmapData.map((item) => (
          <RoadmapCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
```

### `NotFound.tsx`

The 404 error page displayed when a route doesn't exist.

#### Purpose
- Handles invalid routes
- Provides navigation back to valid pages
- Maintains consistent user experience

#### Features
- Clear error messaging
- Navigation assistance
- Consistent styling

## Best Practices

### Creating New Pages

1. **File Organization**
   - Use PascalCase for page components
   - Keep pages focused and minimal
   - Split complex pages into components

2. **Routing**
   - Follow consistent routing patterns
   - Implement proper navigation
   - Handle route parameters

3. **Performance**
   - Implement code splitting
   - Optimize component loading
   - Manage state efficiently

4. **Error Handling**
   - Implement error boundaries
   - Provide fallback UI
   - Handle loading states

### Page Structure

1. **Component Architecture**
   - Use functional components
   - Implement proper TypeScript types
   - Follow React best practices

2. **State Management**
   - Use appropriate hooks
   - Manage local vs. global state
   - Handle side effects properly

3. **Styling**
   - Follow design system guidelines
   - Maintain responsive layouts
   - Use theme variables

## Contributing

When adding new pages:

1. Follow the established patterns
2. Add proper routing configuration
3. Include error handling
4. Write unit tests
5. Update this README

### Guidelines

1. **Code Organization**
   - Keep files focused and minimal
   - Use appropriate abstractions
   - Follow DRY principles

2. **Documentation**
   - Add JSDoc comments
   - Document props and types
   - Include usage examples

3. **Testing**
   - Write component tests
   - Test routing behavior
   - Verify error handling

## Related Documentation

- [Components README](../components/README.md)
- [Root README](../../README.md)
