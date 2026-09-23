import { useState, useEffect, ChangeEvent } from "react";


interface Recipe {
  id: number;
  name: string;
}

interface RecipeResponse {
  recipes: Recipe[];
}

export default function App() {
  const [input, setInput] = useState<string>("");
  const [res, setRes] = useState<Recipe[]>([]);
  const [sr, setSr] = useState<boolean>(false);
  const [cache, setCache] = useState<Record<string, Recipe[]>>({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    if (cache[input]) {
      console.log("returned");
      setRes(cache[input]);
      return;
    }

    const url = `https://dummyjson.com/recipes/search?q=${input}`;
    const resp = await fetch(url);
    const resj: RecipeResponse = await resp.json();

    setRes(resj.recipes || []);
    setCache((prev) => ({
      ...prev,
      [input]: resj.recipes || [],
    }));
  };

  useEffect(() => {
    if (!input.trim()) {
      setRes([]);
      return;
    }

    const timer = setTimeout(fetchData, 300); // debounce
    return () => clearTimeout(timer);
  }, [fetchData, input]);

  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        onFocus={() => setSr(true)}
        onBlur={() => setSr(false)}
      />
      {sr && res.length > 0 && (
        <div className="container" data-testid="results-container">
          <ul>
            {res.map((r) => (
              <li key={r.id} className="si">
                {r.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

