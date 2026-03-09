import TodoItem from './TodoItem';

function TodoList({ todos, onToggleTodo, onRemoveTodo }) {
  if (todos.length === 0) {
    return (
      <p className="todo-empty" role="status">
        No tasks yet. Add one to get started.
      </p>
    );
  }

  return (
    <ul className="todo-list" aria-label="Todo items">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
