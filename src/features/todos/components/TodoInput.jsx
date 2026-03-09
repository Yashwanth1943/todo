import { useState } from 'react';

function TodoInput({ onAddTodo }) {
  const [text, setText] = useState('');

  const trimmedText = text.trim();
  const isDisabled = trimmedText.length === 0;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    onAddTodo(trimmedText);
    setText('');
  };

  return (
    <form className="todo-input-row" onSubmit={handleSubmit}>
      <label htmlFor="todo-input" className="sr-only">
        New task
      </label>
      <input
        id="todo-input"
        type="text"
        className="todo-input"
        placeholder="Add a task"
        value={text}
        onChange={(event) => setText(event.target.value)}
        autoComplete="off"
      />
      <button type="submit" className="todo-add" disabled={isDisabled}>
        Add task
      </button>
    </form>
  );
}

export default TodoInput;
