import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const NContext = createContext(null);

export function NPro({ children }) {
  const [no, sNo] = useState([]);
  const timeRefs = useRef(new Map());

  const rNo = useCallback((id) => {
    sNo((prev) => prev.filter((n) => n.id !== id));

    const timer = timeRefs.current.get(id);

    if (timer) {
      clearTimeout(timer);
      timeRefs.current.delete(id);
    }
  }, []);

  const aNo = useCallback(
    ({ message, type = "info", duration = 3000 }) => {
      const id = crypto.randomUUID();

      sNo((prev) => [
        ...prev,
        {
          id,
          message,
          type,
        },
      ]);

      if (duration > 0) {
        const timer = setTimeout(() => {
          rNo(id);
        }, duration);

        timeRefs.current.set(id, timer);
      }
    },
    [rNo]
  );

  const notify = {
    e: (msg) => aNo({ message: msg, type: "error" }),
    s: (msg) => aNo({ message: msg, type: "success" }),
    i: (msg) => aNo({ message: msg, type: "info" }),
  };

  useEffect(() => {
    return () => {
      timeRefs.current.forEach((timer) => {
        clearTimeout(timer);
      });

      timeRefs.current.clear();
    };
  }, []);

  return (
    <NContext.Provider value={{ notify }}>
      {children}

      <div className="tc">
        {no.map((n) => (
          <div key={n.id}>
            <span>{n.message}</span>

            <button onClick={() => rNo(n.id)}>x</button>
          </div>
        ))}
      </div>
    </NContext.Provider>
  );
}

export default function useNP() {
  const c = useContext(NContext);
  return c;
}
