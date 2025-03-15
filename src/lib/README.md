# Lib Directory

The `lib` directory contains core utilities, data structures, and helper functions that power the Jarvis Roadmap application. This directory serves as a central location for shared code that can be used across different components and features.

## Directory Structure

```
lib/
├── roadmap-data.ts
├── utils.ts
└── README.md
```

## Core Files

### `roadmap-data.ts`

This file defines the data structure and content for the roadmap items displayed in the application.

#### RoadmapItem Interface

```typescript
interface RoadmapItem {
  id: number;
  title: string;
  description: string;
  datePublished: string;
  content: string;
  duration: string;
  tags: string[];
  thumbnailUrl: string;
  videoUrl?: string;
  sourceCodeUrl?: string;
  completed: boolean;
  isLatest: boolean;
  technicalDetails?: string;
  requirements?: string[];
  keyConcepts?: string[];
}
```

#### Properties

- `id`: Unique identifier for the roadmap item
- `title`: Main heading of the roadmap item
- `description`: Brief summary of the content
- `datePublished`: Release date of the content
- `content`: Detailed description or main content
- `duration`: Expected time to complete
- `tags`: Array of relevant topics or categories
- `thumbnailUrl`: Path to the preview image
- `videoUrl`: Optional link to video content
- `sourceCodeUrl`: Optional link to source code
- `completed`: Completion status
- `isLatest`: Flag for newest content
- `technicalDetails`: Optional technical specifications
- `requirements`: Optional array of prerequisites
- `keyConcepts`: Optional array of main learning points

#### Usage Example

```typescript
import { roadmapData, RoadmapItem } from '@/lib/roadmap-data';

function RoadmapList() {
  return (
    <div>
      {roadmapData.map((item: RoadmapItem) => (
        <RoadmapCard key={item.id} item={item} />
      ))}
    </div>
  );
}
```

### `utils.ts`

This file contains utility functions used throughout the application.

#### Functions

##### `cn(...inputs: ClassValue[])`

A utility function that combines Tailwind CSS classes using `clsx` and `tailwind-merge`.

- **Purpose**: Merges class names while handling Tailwind CSS conflicts
- **Parameters**: Multiple class values or conditional class expressions
- **Returns**: Merged and optimized class string

#### Usage Example

```typescript
import { cn } from '@/lib/utils';

function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded bg-primary text-white',
        className
      )}
      {...props}
    />
  );
}
```

## Best Practices

### Working with Roadmap Data

1. **Adding New Items**
   - Follow the RoadmapItem interface structure
   - Ensure unique IDs for new items
   - Provide all required fields
   - Use appropriate image paths

2. **Updating Existing Items**
   - Maintain data consistency
   - Update related components if needed
   - Test changes thoroughly

3. **Data Organization**
   - Keep items in chronological order
   - Group related items together
   - Use consistent formatting

### Using Utility Functions

1. **Class Name Handling**
   - Use the `cn` function for class merging
   - Keep conditional classes clean
   - Follow Tailwind CSS best practices

2. **Adding New Utilities**
   - Document new functions thoroughly
   - Write unit tests
   - Consider reusability

## Contributing

When adding to the lib directory:

1. Follow TypeScript best practices
2. Add comprehensive documentation
3. Include usage examples
4. Write unit tests
5. Update this README

## Related Documentation

- [Components README](../components/README.md)
- [Root README](../../README.md)
