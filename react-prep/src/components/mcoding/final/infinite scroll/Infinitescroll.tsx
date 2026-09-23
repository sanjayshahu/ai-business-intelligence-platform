import { useEffect, useState } from "react";
// import "./styles.scss";

// JSONPlaceholder post type
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App = () => {
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (startIndex: number) => {
    try {
      setLoading(true);
      const url = `https://jsonplaceholder.typicode.com/posts?_start=${startIndex}&_limit=10`;
      const res = await fetch(url);
      const resp: Post[] = await res.json();
      setData((prev) => [...prev, ...resp]);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data whenever page changes
  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Scroll listener (RUNS ONLY ONCE)
  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 2;

      if (scrolledToBottom && !loading) {
        setPage((prev) => prev + 10);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]); // using loading is fine here

  return (
    <div className="App">
      <h1>Infinite Scrolling</h1>

      {data.map((post) => (
        <div className="post-card" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default App;
