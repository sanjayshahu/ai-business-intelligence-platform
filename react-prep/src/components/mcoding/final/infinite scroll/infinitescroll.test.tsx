import React from "react";
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import App from "./Infinitescroll";

// Helper to mock fetch response
const mockPosts = (start: number, count: number = 10) =>
  Array.from({ length: count }).map((_, i) => ({
    userId: 1,
    id: start + i + 1,
    title: `Title ${start + i + 1}`,
    body: `Body ${start + i + 1}`,
  }));

// Mock scroll and dimension utilities
const mockScrollDimensions = (innerHeight: number, scrollY: number, offsetHeight: number) => {
  Object.defineProperty(window, 'innerHeight', { value: innerHeight, configurable: true });
  Object.defineProperty(window, 'scrollY', { value: scrollY, configurable: true });
  Object.defineProperty(document.body, 'offsetHeight', { value: offsetHeight, configurable: true });
};

const triggerScroll = () => {
  window.dispatchEvent(new Event('scroll'));
};

describe("App Infinite Scroll Component", () => {
  let fetchMock: jest.SpyInstance;
  let originalInnerHeight: number;
  let originalScrollY: number;
  let originalOffsetHeight: number;

  beforeEach(() => {
    // Store original values
    originalInnerHeight = window.innerHeight;
    originalScrollY = window.scrollY;
    originalOffsetHeight = document.body.offsetHeight;

    fetchMock = jest.spyOn(global, "fetch").mockImplementation((url: any) => {
      const urlObj = new URL(url);
      const start = Number(urlObj.searchParams.get("_start")) || 0;
      const limit = Number(urlObj.searchParams.get("_limit")) || 10;

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPosts(start, limit)),
      } as Response);
    });
  });

  afterEach(() => {
    fetchMock.mockRestore();
    // Restore original values
    mockScrollDimensions(originalInnerHeight, originalScrollY, originalOffsetHeight);
  });

  // Test 1: Initial render and data fetching
  test("initial fetch runs on mount and displays first 10 posts", async () => {
    render(<App />);

    // Check loading state appears
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for data to load and verify posts
    await waitFor(() => {
      expect(screen.getByText("Title 1")).toBeInTheDocument();
    });
    
    expect(screen.getByText("Body 10")).toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();

    // Verify API call
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10"
    );
  });

  // Test 2: Successful infinite scroll
  test("loads next posts on scroll to bottom when not loading", async () => {
    render(<App />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText("Title 1")).toBeInTheDocument();
    });

    // Mock scroll to bottom
    mockScrollDimensions(1000, 5000, 6000); // 1000 + 5000 = 6000 >= 5998 (6000-2)

    // Trigger scroll
    act(() => {
      triggerScroll();
    });

    // Should trigger second fetch
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    expect(fetchMock).toHaveBeenLastCalledWith(
      "https://jsonplaceholder.typicode.com/posts?_start=10&_limit=10"
    );

    // Verify new posts are rendered
    await waitFor(() => {
      expect(screen.getByText("Title 11")).toBeInTheDocument();
    });
    expect(screen.getByText("Body 20")).toBeInTheDocument();
  });

  // Test 3: Scroll to bottom while loading - should NOT trigger fetch
  test("does not fetch when scrolling to bottom while loading", async () => {
    // Mock fetch to delay resolution
    let resolveFetch: (value: any) => void;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    
    fetchMock.mockImplementationOnce(() => fetchPromise);

    render(<App />);

    // Verify loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Mock scroll to bottom while still loading
    mockScrollDimensions(1000, 5000, 6000);
    
    act(() => {
      triggerScroll();
    });

    // Should still be only 1 fetch call
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // Resolve the initial fetch
    await act(async () => {
      resolveFetch!({
        json: () => Promise.resolve(mockPosts(0)),
      });
    });

    // Verify no additional fetch happened
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  // Test 4: Scroll but NOT at bottom - should NOT trigger fetch
  test("does not fetch when scrolling but not at bottom", async () => {
    render(<App />);

    // Wait for initial load to complete
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Mock scroll position NOT at bottom
    // 500 + 1000 = 1500 < 2000-2 = 1998
    mockScrollDimensions(500, 1000, 2000);

    // Trigger scroll
    act(() => {
      triggerScroll();
    });

    // Should still be only 1 fetch call
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  // Test 5: Exactly at bottom threshold
  test("triggers fetch when exactly at bottom threshold", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Mock scroll position exactly at threshold: 1000 + 998 = 1998 >= 2000-2 = 1998
    mockScrollDimensions(1000, 998, 2000);

    act(() => {
      triggerScroll();
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    expect(fetchMock).toHaveBeenLastCalledWith(
      "https://jsonplaceholder.typicode.com/posts?_start=10&_limit=10"
    );
  });

  // Test 6: Just above bottom threshold - should NOT trigger
  test("does not fetch when just above bottom threshold", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Mock scroll position just above threshold: 1000 + 997 = 1997 < 2000-2 = 1998
    mockScrollDimensions(1000, 997, 2000);

    act(() => {
      triggerScroll();
    });

    // Wait a bit to ensure no fetch happens
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  // Test 7: Fetch error handling
  test("handles fetch error gracefully without crashing", async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    fetchMock.mockImplementationOnce(() => 
      Promise.reject(new Error("API error"))
    );

    render(<App />);

    // Should show loading initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Loading should disappear after error
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // No posts should be rendered
    expect(screen.queryByText("Title 1")).not.toBeInTheDocument();

    // Error should be logged
    expect(consoleErrorMock).toHaveBeenCalledWith("Fetch error:", expect.any(Error));

    consoleErrorMock.mockRestore();
  });

  // Test 8: Multiple rapid scrolls - should only trigger once
  test("handles multiple rapid scrolls without duplicate fetches", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Mock scroll to bottom
    mockScrollDimensions(1000, 5000, 6000);

    // Trigger multiple rapid scroll events
    act(() => {
      triggerScroll();
      triggerScroll();
      triggerScroll();
    });

    // Should only trigger one additional fetch
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });
  });

  // Test 9: Scroll listener lifecycle
  test("scroll listener is properly set up and cleaned up", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = render(<App />);

    // Verify scroll listener was added
    expect(addEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));

    unmount();

    // Verify scroll listener was removed
    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  // Test 10: Page increment logic


  // Test 11: Data accumulation
  test("accumulates data correctly from multiple fetches", async () => {
    render(<App />);

    // Wait for first batch
    await waitFor(() => {
      expect(screen.getByText("Title 1")).toBeInTheDocument();
    });

    // First scroll
    mockScrollDimensions(1000, 5000, 6000);
    act(() => {
      triggerScroll();
    });

    // Wait for second batch
    await waitFor(() => {
      expect(screen.getByText("Title 11")).toBeInTheDocument();
    });

    // Verify both batches are present
    expect(screen.getByText("Title 1")).toBeInTheDocument();
    expect(screen.getByText("Title 11")).toBeInTheDocument();
    expect(screen.getByText("Body 10")).toBeInTheDocument();
    expect(screen.getByText("Body 20")).toBeInTheDocument();
  });
});