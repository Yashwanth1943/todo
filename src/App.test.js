import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  window.localStorage.clear();
});

test('renders the todo heading and empty state', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /todo list/i })).toBeInTheDocument();
  expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
});

test('adds a todo item', () => {
  render(<App />);

  userEvent.type(screen.getByLabelText(/new task/i), 'Buy milk');
  userEvent.click(screen.getByRole('button', { name: /add task/i }));

  expect(screen.getByText('Buy milk')).toBeInTheDocument();
});

test('toggles a todo item as completed', () => {
  render(<App />);

  userEvent.type(screen.getByLabelText(/new task/i), 'Practice React');
  userEvent.click(screen.getByRole('button', { name: /add task/i }));

  const checkbox = screen.getByRole('checkbox', { name: /practice react/i });
  expect(checkbox).not.toBeChecked();

  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test('removes a todo item', () => {
  render(<App />);

  userEvent.type(screen.getByLabelText(/new task/i), 'Read docs');
  userEvent.click(screen.getByRole('button', { name: /add task/i }));
  userEvent.click(screen.getByRole('button', { name: /delete read docs/i }));

  expect(screen.queryByText('Read docs')).not.toBeInTheDocument();
});

test('filters todos in real time using search input', () => {
  render(<App />);

  userEvent.type(screen.getByLabelText(/new task/i), 'Buy milk');
  userEvent.click(screen.getByRole('button', { name: /add task/i }));
  userEvent.type(screen.getByLabelText(/new task/i), 'Read docs');
  userEvent.click(screen.getByRole('button', { name: /add task/i }));

  userEvent.type(screen.getByLabelText(/search tasks/i), 'buy');

  expect(screen.getByText('Buy milk')).toBeInTheDocument();
  expect(screen.queryByText('Read docs')).not.toBeInTheDocument();
});
