import { useEffect, useMemo, useReducer } from 'react';

const STORAGE_KEY = 'todo-app.todos';

export const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

const initialState = {
  todos: [],
  filter: FILTERS.ALL,
  searchQuery: '',
};

function createTodoId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readStoredTodos() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedTodos = window.localStorage.getItem(STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch {
    return [];
  }
}

function getInitialState() {
  return {
    ...initialState,
    todos: readStoredTodos(),
  };
}

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO': {
      const text = action.payload.trim();

      if (!text) {
        return state;
      }

      const nextTodo = {
        id: createTodoId(),
        text,
        completed: false,
      };

      return {
        ...state,
        todos: [nextTodo, ...state.todos],
      };
    }

    case 'TOGGLE_TODO': {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    }

    case 'REMOVE_TODO': {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    }

    case 'SET_FILTER': {
      return {
        ...state,
        filter: action.payload,
      };
    }

    case 'SET_SEARCH_QUERY': {
      return {
        ...state,
        searchQuery: action.payload,
      };
    }

    case 'CLEAR_COMPLETED': {
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    }

    default: {
      return state;
    }
  }
}

export function useTodos() {
  const [state, dispatch] = useReducer(todoReducer, initialState, getInitialState);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
    } catch {
      // If storage is unavailable, keep app functional without persistence.
    }
  }, [state.todos]);

  const filteredTodos = useMemo(() => {
    const query = state.searchQuery.trim().toLowerCase();

    let todosByStatus = state.todos;

    if (state.filter === FILTERS.ACTIVE) {
      todosByStatus = state.todos.filter((todo) => !todo.completed);
    }

    if (state.filter === FILTERS.COMPLETED) {
      todosByStatus = state.todos.filter((todo) => todo.completed);
    }

    if (!query) {
      return todosByStatus;
    }

    return todosByStatus.filter((todo) => todo.text.toLowerCase().includes(query));
  }, [state.filter, state.searchQuery, state.todos]);

  const itemsLeft = useMemo(
    () => state.todos.filter((todo) => !todo.completed).length,
    [state.todos]
  );

  const completedCount = state.todos.length - itemsLeft;

  const addTodo = (text) => dispatch({ type: 'ADD_TODO', payload: text });
  const toggleTodo = (id) => dispatch({ type: 'TOGGLE_TODO', payload: id });
  const removeTodo = (id) => dispatch({ type: 'REMOVE_TODO', payload: id });
  const setFilter = (filter) => dispatch({ type: 'SET_FILTER', payload: filter });
  const setSearchQuery = (query) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  const clearCompleted = () => dispatch({ type: 'CLEAR_COMPLETED' });

  return {
    filter: state.filter,
    searchQuery: state.searchQuery,
    filteredTodos,
    itemsLeft,
    completedCount,
    addTodo,
    toggleTodo,
    removeTodo,
    setFilter,
    setSearchQuery,
    clearCompleted,
  };
}
