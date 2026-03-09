import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { FILTERS, useTodos } from '../hooks/useTodos';

const FILTER_OPTIONS = [
  { value: FILTERS.ALL, label: 'All' },
  { value: FILTERS.ACTIVE, label: 'Active' },
  { value: FILTERS.COMPLETED, label: 'Completed' },
];

function TodoApp() {
  const {
    filter,
    searchQuery,
    filteredTodos,
    itemsLeft,
    completedCount,
    addTodo,
    toggleTodo,
    removeTodo,
    setFilter,
    setSearchQuery,
    clearCompleted,
  } = useTodos();

  const leftLabel = itemsLeft === 1 ? 'item' : 'items';

  return (
    <section className="todo-shell" aria-labelledby="todo-heading">
      <header className="todo-header">
        <h1 id="todo-heading">Todo List</h1>
        <p>Plan what matters and check it off.</p>
      </header>

      <TodoInput onAddTodo={addTodo} />

      <div className="todo-search-row">
        <label htmlFor="todo-search" className="sr-only">
          Search tasks
        </label>
        <input
          id="todo-search"
          type="search"
          className="todo-search"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="todo-toolbar" aria-label="Todo controls">
        <p className="todo-count">
          {itemsLeft} {leftLabel} left
        </p>

        <div className="todo-filters">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`todo-filter${filter === option.value ? ' is-active' : ''}`}
              onClick={() => setFilter(option.value)}
              aria-pressed={filter === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <TodoList
        todos={filteredTodos}
        onToggleTodo={toggleTodo}
        onRemoveTodo={removeTodo}
      />

      {completedCount > 0 && (
        <button type="button" className="todo-clear" onClick={clearCompleted}>
          Clear completed ({completedCount})
        </button>
      )}
    </section>
  );
}

export default TodoApp;
