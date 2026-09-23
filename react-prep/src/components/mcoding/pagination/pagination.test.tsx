import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

type Product = {
  id: number;
  title: string;
  images: string[];
};
const productWithoutImages: Product = {
  id: 999,
  title: "No Image Product",
  images: undefined as unknown as string[], // explicitly undefined
};


// ---------------- MOCK DATA ----------------
const mockProducts: Product[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  images: [`https://via.placeholder.com/150?text=Product+${i + 1}`],
}));

// ---------------- CONTROLLED FETCH ----------------
let fetchResolve: Function;

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(
    () =>
      new Promise((resolve) => {
        fetchResolve = resolve;
      }) as Promise<Response>
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

// ---------------- TEST SUITE ----------------
describe("Pagination App Component", () => {
  test("renders loading state initially", async () => {
    render(<App />);
    expect(screen.getByText(/Hello Pagination/i)).toBeInTheDocument();

    // Loading skeleton should exist
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    // Resolve fetch
    fetchResolve({
      ok: true,
      json: () =>
        Promise.resolve({
          products: mockProducts.slice(0, 10),
          total: mockProducts.length,
        }),
    } as Response);

    await waitFor(() =>
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
    );
  });

  test("renders products after fetch", async () => {
    render(<App />);
    fetchResolve({
      ok: true,
      json: () =>
        Promise.resolve({
          products: mockProducts.slice(0, 10),
          total: mockProducts.length,
        }),
    } as Response);

    await screen.findByText("Product 1");

    // Ensure correct number of products rendered
    const productCards = screen.getAllByText(/Product/i);
    expect(productCards.length).toBe(10);
  });

test("renders skeleton loader until image loads", async () => {
  render(<App />);

  // Resolve fetch for 1 product
  fetchResolve({
    ok: true,
    json: () =>
      Promise.resolve({
        products: mockProducts.slice(0, 1),
        total: mockProducts.length,
      }),
  } as Response);

  // Skeleton should exist initially
  const skeleton = await screen.findByTestId("image-skeleton");
  expect(skeleton).toBeInTheDocument();

  // Fire image load
  const img = screen.getByAltText("Product 1") as HTMLImageElement;
  fireEvent.load(img);

  // Skeleton should be removed after image loads
  await waitFor(() =>
    expect(screen.queryByTestId("image-skeleton")).not.toBeInTheDocument()
  );
});


  test("next button loads next page", async () => {
    render(<App />);
    fetchResolve({
      ok: true,
      json: () =>
        Promise.resolve({ products: mockProducts.slice(0, 10), total: 25 }),
    } as Response);

    await screen.findByText("Product 1");

    const nextBtn = screen.getByText("Next");
    fireEvent.click(nextBtn);

    fetchResolve({
      ok: true,
      json: () =>
        Promise.resolve({ products: mockProducts.slice(10, 20), total: 25 }),
    } as Response);

    await screen.findByText("Product 11");
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
  });

  test("prev button loads previous page", async () => {
    render(<App />);
    fetchResolve({
      ok: true,
      json: () =>
        Promise.resolve({ products: mockProducts.slice(0, 10), total: 25 }),
    } as Response);
    await screen.findByText("Product 1");

    // Go next
    const nextBtn = screen.getByText("Next");
    fireEvent.click(nextBtn);
    fetchResolve({
      ok: true,
      json: () =>
        Promise.resolve({ products: mockProducts.slice(10, 20), total: 25 }),
    } as Response);
    await screen.findByText("Product 11");

    // Go previous
    const prevBtn = screen.getByText("Prev");
    fireEvent.click(prevBtn);
    fetchResolve({
      ok: true,
      json: () =>
        Promise.resolve({ products: mockProducts.slice(0, 10), total: 25 }),
    } as Response);

    await screen.findByText("Product 1");
  });

  test("clicking page number navigates correctly", async () => {
    render(<App />);
    fetchResolve({
      ok: true,
      json: () =>
        Promise.resolve({ products: mockProducts.slice(0, 10), total: 25 }),
    } as Response);

    await screen.findByText("Product 1");

    const page2 = screen.getByText("2");
    fireEvent.click(page2);

    fetchResolve({
      ok: true,
      json: () =>
        Promise.resolve({ products: mockProducts.slice(10, 20), total: 25 }),
    } as Response);

    await screen.findByText("Product 11");
  });

  test("handles empty product list", async () => {
    render(<App />);
    fetchResolve({
      ok: true,
      json: () => Promise.resolve({ products: [], total: 0 }),
    } as Response);

    await waitFor(() =>
      expect(screen.queryByText("Product 1")).not.toBeInTheDocument()
    );
  });

  test("handles fetch error gracefully", async () => {
    render(<App />);
    fetchResolve({
      ok: false,
    } as Response);

    await screen.findByText(/Hello Pagination/i);
  });
test("renders placeholder image when product has no images", async () => {
  render(<App />);

  fetchResolve({
    ok: true,
    json: () =>
      Promise.resolve({
        products: [productWithoutImages],
        total: 1,
      }),
  } as Response);

  await screen.findByText("No Image Product");

  const img = screen.getByAltText("No Image Product") as HTMLImageElement;
  expect(img.src).toBe("https://via.placeholder.com/150"); // fixed
});


test("handles missing products field and uses empty array", async () => {
  render(<App />);

  fetchResolve({
    ok: true,
    json: () => Promise.resolve({ products: undefined, total: 0 }),
  } as Response);

  // Wait for loading to disappear
  await waitFor(() =>
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
  );

  // No products should render
  expect(screen.queryAllByRole("img").length).toBe(0);
});


});
