import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useTransition,
  useDeferredValue,
} from "react";

interface Product {
  id: string;
  title: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
}

const PRODUCTS_PER_PAGE = 10;

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  // -----------------------------
  // Derived state
  // -----------------------------

  const skip = useMemo(() => currentPage * PRODUCTS_PER_PAGE, [currentPage]);

  const totalPages = useMemo(
    () => Math.ceil(total / PRODUCTS_PER_PAGE),
    [total]
  );

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index),
    [totalPages]
  );

  const deferredProducts = useDeferredValue(products);

  // -----------------------------
  // API
  // -----------------------------

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      const response = await fetch(
        `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data: ProductsResponse = await response.json();

      setProducts(data.products);

      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [skip]);

  // -----------------------------
  // Effects
  // -----------------------------

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // -----------------------------
  // Handlers
  // -----------------------------

  const handlePreviousPage = () => {
    if (currentPage === 0) return;

    startTransition(() => {
      setCurrentPage((prev) => prev - 1);
    });
  };

  const handleNextPage = () => {
    if (currentPage >= totalPages - 1) return;

    startTransition(() => {
      setCurrentPage((prev) => prev + 1);
    });
  };

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber === currentPage) return;

    startTransition(() => {
      setCurrentPage(pageNumber);
    });
  };

  // -----------------------------
  // Render states
  // -----------------------------

  const showLoading = loading || isPending;

  const showEmptyState =
    !showLoading && !error && deferredProducts.length === 0;

  return (
    <main>
      <h1>Products</h1>

      {/* Loading State */}
      {showLoading && <p role="status">Loading products...</p>}

      {/* Error State */}
      {error && <p role="alert">{error}</p>}

      {/* Empty State */}
      {showEmptyState && <p>No products found.</p>}

      {/* Products List */}
      {!showLoading && !error && deferredProducts.length > 0 && (
        <section aria-label="products-list">
          {deferredProducts.map((product) => (
            <article key={product.id}>
              <h2>{product.title}</h2>
            </article>
          ))}
        </section>
      )}

      {/* Pagination */}
      {!error && totalPages > 0 && (
        <nav aria-label="pagination">
          <button
            type="button"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            Previous
          </button>

          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => handlePageClick(pageNumber)}
              aria-current={currentPage === pageNumber ? "page" : undefined}
            >
              {pageNumber + 1}
            </button>
          ))}

          <button
            type="button"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages - 1}
          >
            Next
          </button>
        </nav>
      )}
    </main>
  );
};

export default App;
