function TodoItem({ todo, onToggleTodo, onRemoveTodo }) {
  return (
    <li className={`todo-item${todo.completed ? ' is-complete' : ''}`}>
      <label className="todo-main">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleTodo(todo.id)}
          aria-label={todo.text}
        />
        <span className="todo-item-text">{todo.text}</span>
      </label>

      <button
        type="button"
        className="todo-remove"
        onClick={() => onRemoveTodo(todo.id)}
        aria-label={`Delete ${todo.text}`}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
