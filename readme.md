# Todo App with React Query and Zod

A modern React TypeScript application demonstrating best practices for data fetching, type safety, and testing. This project showcases the integration of React Query (TanStack Query) for efficient data management and Zod for runtime type validation.

> [!NOTE]
> This project aims to be educational for beginner students in the React ecosystem.

## 🚀 Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Data Fetching**: TanStack React Query v5
- **HTTP Client**: Axios
- **Runtime Type Validation**: Zod
- **Testing**: Vitest with React Testing Library
- **API Mocking**: MSW (Mock Service Worker)
- **Linting**: ESLint with TypeScript support
- **Package Manager**: pnpm

## ✨ Features

- **Type-Safe API Calls**: Zod schemas ensure runtime type safety
- **Efficient Data Fetching**: React Query handles caching, background updates, and error states
- **Suspense Integration**: Modern React Suspense for loading states
- **Comprehensive Testing**: Integration tests with MSW for API mocking
- **Modern Development Experience**: Fast hot reload with Vite

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-query-zod
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests in watch mode
- `pnpm test:ui` - Run tests with UI
- `pnpm test:run` - Run tests once
- `pnpm lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── App.tsx                 # Main application component
├── services/
│   ├── todo.ts            # API service with Zod validation
│   └── __tests__/
│       └── todo.integration.test.ts  # Integration tests
└── test/
    └── setup.ts           # Test configuration
```

## 🔧 Key Implementation Details

### Data Fetching with React Query

The app uses React Query's `useSuspenseQuery` for efficient data fetching:

```typescript
const { data: todos } = useSuspenseQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  staleTime: NUM_OF_DAYS_TO_STALE * 24 * 60 * 60 * 1000,
})
```

### Type Safety with Zod

API responses are validated using Zod schemas:

```typescript
const TodoSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  completed: z.boolean(),
})
```

### Testing Strategy

- **Integration Tests**: Test API calls with MSW mocking
- **Error Handling**: Comprehensive error scenarios covered
- **Type Validation**: Tests ensure Zod validation works correctly

## 🧪 Testing

The project includes comprehensive integration tests that cover:

- Successful API calls
- Server errors (500 status)
- Network errors
- Invalid JSON responses
- Empty responses
- Malformed data validation

Run tests with:
```bash
pnpm test
```

## 🚀 Deployment

Build the project for production:

```bash
pnpm build
```

The built files will be in the `dist/` directory.

## 📚 Learning Resources

- [React Query Documentation](https://tanstack.com/query/latest)
- [Zod Documentation](https://zod.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](./licence.md).
