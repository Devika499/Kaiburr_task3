# Task Manager Frontend

A modern React 19 frontend application for managing tasks with command execution capabilities. Built with TypeScript, Ant Design, and a focus on usability and accessibility.

## Features

- ✅ **Task Management**: Create, read, update, and delete tasks
- 🔍 **Search & Filter**: Search tasks by name with real-time filtering
- ⚡ **Command Execution**: Execute tasks and view command outputs
- 📊 **Execution History**: View detailed execution history with timestamps and outputs
- 🎨 **Modern UI**: Clean, responsive design with Ant Design components
- ♿ **Accessibility**: Keyboard navigation, ARIA labels, and screen reader support
- 📱 **Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## Technology Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Ant Design** - Enterprise-class UI design language
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing (ready for future expansion)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on http://localhost:8080

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## API Integration

The frontend integrates with the following backend endpoints:

- `GET /tasks` - Get all tasks or task by ID
- `PUT /tasks` - Create or update a task
- `DELETE /tasks/{id}` - Delete a task
- `GET /tasks/find?name={name}` - Find tasks by name
- `PUT /tasks/{id}/execute` - Execute a task

## Component Structure

```
src/
├── components/
│   ├── Layout.tsx              # Main application layout
│   ├── TaskList.tsx            # Task listing with search and actions
│   ├── TaskForm.tsx            # Task creation/editing form
│   └── TaskExecutionModal.tsx  # Task execution history viewer
├── services/
│   └── api.ts                  # API service functions
├── types/
│   └── index.ts                # TypeScript type definitions
└── App.tsx                     # Main application component
```

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: High contrast ratios for better readability
- **Responsive Design**: Adapts to different screen sizes and orientations

## UI/UX Features

- **Modern Design**: Clean, professional interface with consistent spacing
- **Loading States**: Visual feedback during API operations
- **Error Handling**: User-friendly error messages and validation
- **Search & Filter**: Real-time search with instant results
- **Pagination**: Efficient handling of large task lists
- **Modal Dialogs**: Non-intrusive forms and detailed views
- **Tooltips**: Helpful hints for better user experience

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

### Code Style

The project follows TypeScript best practices and React patterns:

- Functional components with hooks
- TypeScript interfaces for type safety
- Consistent naming conventions
- Proper error handling
- Accessibility-first development

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of the Kaiburr task management system.