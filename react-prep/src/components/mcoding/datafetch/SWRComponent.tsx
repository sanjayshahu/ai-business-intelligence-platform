// components/SWRComponent.tsx
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

// Fetcher function
const fetcher = (url: string) => fetch(url).then(res => res.json());

const SWRComponent: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos with SWR
  const { data: todos, error, isLoading, isValidating } = useSWR<Todo[]>(
    'https://jsonplaceholder.typicode.com/todos?_limit=5',
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 30000, // Refresh every 30 seconds
    }
  );

  // Fetch single todo
  const { data: singleTodo } = useSWR<Todo>(
    todos && todos.length > 0 ? `https://jsonplaceholder.typicode.com/todos/${todos[0].id}` : null,
    fetcher
  );

  // Add new todo (optimistic update)
  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const optimisticTodo: Todo = {
      id: Date.now(), // Temporary ID
      title: newTodo,
      completed: false,
      userId: 1,
    };

    // Optimistically update the UI
    mutate(
      'https://jsonplaceholder.typicode.com/todos?_limit=5',
      (currentTodos: Todo[] = []) => [optimisticTodo, ...currentTodos],
      false
    );

    setNewTodo('');

    // Actually send the request
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTodo,
          completed: false,
          userId: 1,
        }),
      });

      const newTodoFromServer = await response.json();

      // Update the cache with the real data
      mutate(
        'https://jsonplaceholder.typicode.com/todos?_limit=5',
        (currentTodos: Todo[] = []) => 
          currentTodos.map(todo => 
            todo.id === optimisticTodo.id ? newTodoFromServer : todo
          ),
        false
      );
    } catch (err) {
      // Revert on error
      mutate('https://jsonplaceholder.typicode.com/todos?_limit=5');
    }
  };

  // Toggle todo completion
  const toggleTodo = async (todo: Todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };

    // Optimistic update
    mutate(
      'https://jsonplaceholder.typicode.com/todos?_limit=5',
      (currentTodos: Todo[] = []) =>
        currentTodos.map(t => (t.id === todo.id ? updatedTodo : t)),
      false
    );

    // Send update to server
    await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    });

    // Revalidate to ensure sync
    mutate('https://jsonplaceholder.typicode.com/todos?_limit=5');
  };

  // Refresh data
  const refreshData = () => {
    mutate('https://jsonplaceholder.typicode.com/todos?_limit=5');
  };

  if (error) return <div className="p-6 text-red-500">Failed to load: {error.message}</div>;
  
  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">SWR Data Fetching</h2>
      
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={refreshData}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isValidating}
        >
          {isValidating ? 'Refreshing...' : 'Refresh Data'}
        </button>
        {isValidating && <span className="text-blue-500">Refreshing...</span>}
      </div>

      {/* Add Todo Form */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Add New Todo</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter todo title"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={addTodo}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Todo
          </button>
        </div>
      </div>

      {/* Single Todo Preview */}
      {singleTodo && (
        <div className="mb-6 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold mb-2">First Todo Preview</h3>
          <div className="p-3 bg-white rounded border">
            <p className={singleTodo.completed ? 'line-through text-gray-500' : ''}>
              {singleTodo.title}
            </p>
            <span className="text-sm text-gray-600">
              {singleTodo.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        </div>
      )}

      {/* Todos List */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          Todos {isLoading && '(Loading...)'}
        </h3>
        <div className="space-y-2">
          {todos?.map(todo => (
            <div
              key={todo.id}
              className="p-3 border rounded flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo)}
                  className="w-4 h-4"
                />
                <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                  {todo.title}
                </span>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  todo.completed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {todo.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SWRComponent;