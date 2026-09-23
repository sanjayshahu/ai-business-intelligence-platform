import { useState, useEffect, useCallback } from "react";

interface Recipe {
  id: number;
  name: string;
}

interface RecipesResponse {
  recipes: Recipe[];
}

const DEBOUNCE_DELAY = 500;

const App = () => {
  const [query, setQuery] = useState("");

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [cache, setCache] = useState<Record<string, Recipe[]>>({});

  const fetchRecipes = useCallback(
    async (searchTerm: string) => {
      if (!searchTerm.trim()) {
        setRecipes([]);
        setError("");
        return;
      }

      if (cache[searchTerm]) {
        setRecipes(cache[searchTerm]);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://dummyjson.com/recipes/search?q=${searchTerm}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data: RecipesResponse = await response.json();

        setRecipes(data.recipes);

        setCache((prev) => ({
          ...prev,
          [searchTerm]: data.recipes,
        }));
      } catch (err) {
        setRecipes([]);

        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [cache]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRecipes(query);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [query, fetchRecipes]);

  return (
    <div
      style={{
        width: "350px",
        margin: "20px auto",
        position: "relative",
      }}
    >
      <label
        htmlFor="recipe-search"
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "bold",
        }}
      >
        Search Recipes
      </label>

      <input
        id="recipe-search"
        aria-label="recipe-search"
        type="text"
        value={query}
        placeholder="Search recipe..."
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          boxSizing: "border-box",
        }}
      />

      {loading && (
        <p
          role="status"
          style={{
            marginTop: "8px",
          }}
        >
          Loading recipes...
        </p>
      )}

      {error && (
        <p
          role="alert"
          style={{
            color: "red",
            marginTop: "8px",
          }}
        >
          {error}
        </p>
      )}

      {!loading && !error && query && recipes.length === 0 && (
        <p
          style={{
            marginTop: "8px",
          }}
        >
          No recipes found.
        </p>
      )}

      {recipes.length > 0 && (
        <div
          aria-label="recipe-results"
          style={{
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            maxHeight: "200px",
            overflowY: "auto",
            marginTop: "8px",
            position: "absolute",
            width: "100%",
            zIndex: 1000,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
            >
              {recipe.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
