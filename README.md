# React Todo App

A modern and responsive Todo application built with React.

This project helps users quickly capture tasks, track progress, and stay organized with a clean UI and fast interactions.

## Live Repository

[https://github.com/Yashwanth1943/todo](https://github.com/Yashwanth1943/todo)

## Features

- Add, complete, and delete todos
- Real-time search filtering
- Status filters: `All`, `Active`, `Completed`
- Clear all completed tasks with one click
- Persistent storage using `localStorage`
- Responsive layout for desktop and mobile
- Accessibility-focused controls (labels, focus states, semantic elements)

## Tech Stack

- React 19
- JavaScript (ES6+)
- CSS3
- React Testing Library + Jest
- Create React App

## Project Structure

```text
src/
  features/
    todos/
      components/
        TodoApp.jsx
        TodoInput.jsx
        TodoList.jsx
        TodoItem.jsx
      hooks/
        useTodos.js
  App.js
  App.css
  App.test.js
  index.css
```

## Getting Started

### Prerequisites

- Node.js (v18 or above recommended)
- npm

### Installation

```bash
git clone https://github.com/Yashwanth1943/todo.git
cd todo
npm install
```

### Run Locally

```bash
npm start
```

Open `http://localhost:3000` in your browser.

### Run Tests

```bash
npm test
```

### Production Build

```bash
npm run build
```

## Available Scripts

- `npm start` - Starts the development server
- `npm test` - Runs test suite
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects CRA config (irreversible)

## Quality and Testing

The project includes behavior-driven tests for key flows:

- Renders initial UI state
- Adds a todo
- Toggles completion state
- Removes a todo
- Filters todos via real-time search

## Roadmap

Potential future enhancements:

- Edit existing todo items
- Drag-and-drop reordering
- Due dates and priority levels
- Dark mode toggle
- Backend sync and user authentication

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Built with React and attention to clean frontend architecture.
