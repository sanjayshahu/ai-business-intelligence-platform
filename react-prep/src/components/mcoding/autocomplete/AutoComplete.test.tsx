import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './AutoComplete';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock console.log to test cache hit logging
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  // Test 1: Initial render
  test('renders input field initially', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  // Test 2: Input value updates
  test('updates input value when user types', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<App />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'pizza');
    expect(input).toHaveValue('pizza');
  });

  // Test 3: Results container appears on focus with results
  test('shows results container when input is focused and has results', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        recipes: [
          { id: 1, name: 'Pizza Margherita' },
          { id: 2, name: 'Pizza Pepperoni' }
        ]
      })
    });

    render(<App />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'pizza');
    
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByTestId('results-container')).toBeInTheDocument();
    });

    await user.click(input); // Focus
    expect(screen.getByTestId('results-container')).toBeInTheDocument();
  });

  // Test 4: Results container hidden on blur
  test('hides results container when input loses focus', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        recipes: [{ id: 1, name: 'Pizza Margherita' }]
      })
    });

    render(<App />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'pizza');
    
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByTestId('results-container')).toBeInTheDocument();
    });

    fireEvent.blur(input);
    expect(screen.queryByTestId('results-container')).not.toBeInTheDocument();
  });

  // Test 5: API call with debounce
  test('makes API call after debounce delay', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        recipes: [{ id: 1, name: 'Pizza Margherita' }]
      })
    });

    render(<App />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'pizza');
    
    // Should not call fetch immediately
    expect(mockFetch).not.toHaveBeenCalled();
    
    // Advance timers by debounce delay
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/recipes/search?q=pizza');
    });
  });

  // Test 6: Multiple rapid inputs (debounce cancellation)
  test('cancels previous debounced calls when input changes rapidly', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ recipes: [] })
    });

    render(<App />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'p');
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    await user.type(input, 'i');
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    await user.type(input, 'z');
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    await user.type(input, 'za');
    
    // Advance full debounce time
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/recipes/search?q=pizza');
    });
  });

  // Test 7: Empty input clears results
  test('clears results when input becomes empty', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        recipes: [{ id: 1, name: 'Pizza Margherita' }]
      })
    });

    render(<App />);
    const input = screen.getByRole('textbox');
    
    // First, add some text and get results
    await user.type(input, 'pizza');
    
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByTestId('results-container')).toBeInTheDocument();
    });

    // Clear the input
    await user.clear(input);
    
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.queryByTestId('results-container')).not.toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1); // Should not make another API call
  });

  // Test 8: Whitespace-only input clears results
  test('clears results when input contains only whitespace', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    render(<App />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, '   ');
    
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.queryByTestId('results-container')).not.toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  // Test 9: Displays recipe results correctly
  test('displays recipe results correctly', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    const mockRecipes = [
      { id: 1, name: 'Pizza Margherita' },
      { id: 2, name: 'Pizza Pepperoni' },
      { id: 3, name: 'Pizza Hawaiian' }
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ recipes: mockRecipes })
    });

    render(<App />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'pizza');
    
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByTestId('results-container')).toBeInTheDocument();
    });

    // Check all recipes are displayed
    expect(screen.getByText('Pizza Margherita')).toBeInTheDocument();
    expect(screen.getByText('Pizza Pepperoni')).toBeInTheDocument();
    expect(screen.getByText('Pizza Hawaiian')).toBeInTheDocument();

    // Check list structure
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  // Test 10: Cache functionality - cache hit
  test('uses cached results for repeated searches', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    const mockRecipes = [{ id: 1, name: 'Pizza Margherita' }];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ recipes: mockRecipes })
    });

    render(<App />);
    const input = screen.getByRole('textbox');
    
    // First search
    await user.type(input, 'pizza');
    
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    // Clear and search again with same term
    await user.clear(input);
    await user.type(input, 'pizza');
    
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith('returned');
    });

    // Should not make another API call
    expect(mockFetch).toHaveBeenCalledTimes(1);
    
    await waitFor(() => {
      expect(screen.getByTestId('results-container')).toBeInTheDocument();
    });
  });

  // Test 11: Handles empty recipes response
  test('handles empty recipes in API response', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ recipes: [] })
    });

    render(<App />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'nonexistent');
    
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });

    // Should not show results container when results are empty
    expect(screen.queryByTestId('results-container')).not.toBeInTheDocument();
  });

  // Test 12: Handles undefined recipes in API response
  test('handles undefined recipes in API response', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}) // No recipes property
    });

    render(<App />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'test');
    
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });

    // Should not show results container
    expect(screen.queryByTestId('results-container')).not.toBeInTheDocument();
  });

  // Test 13: API error handling
  test('handles API fetch errors gracefully', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'pizza');
    
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });

    // Component should still be functional after error
    expect(input).toBeInTheDocument();
    expect(screen.queryByTestId('results-container')).not.toBeInTheDocument();
  });

  // Test 14: Focus and blur event handlers
  test('focus and blur event handlers work correctly', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        recipes: [{ id: 1, name: 'Pizza Margherita' }]
      })
    });

    render(<App />);
    const input = screen.getByRole('textbox');
    
    // Add some results first
    await user.type(input, 'pizza');
    
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByTestId('results-container')).toBeInTheDocument();
    });

    // Test blur
    fireEvent.blur(input);
    expect(screen.queryByTestId('results-container')).not.toBeInTheDocument();

    // Test focus
    fireEvent.focus(input);
    expect(screen.getByTestId('results-container')).toBeInTheDocument();
  });

  // Test 15: Multiple cache entries
  test('maintains separate cache entries for different search terms', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ recipes: [{ id: 1, name: 'Pizza Margherita' }] })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ recipes: [{ id: 2, name: 'Burger Classic' }] })
      });

    render(<App />);
    const input = screen.getByRole('textbox');
    
    // First search
    await user.type(input, 'pizza');
    
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    // Second search
    await user.clear(input);
    await user.type(input, 'burger');
    
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    // Return to first search - should use cache
    await user.clear(input);
    await user.type(input, 'pizza');
    
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith('returned');
    });

    expect(mockFetch).toHaveBeenCalledTimes(2); // No additional API call
  });
});