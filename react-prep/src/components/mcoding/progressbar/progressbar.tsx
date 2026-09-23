import { ChangeEvent, useEffect, useState } from "react";

type pbProps ={
    val:number
}

const Pb:React.FC<pbProps>= ({ val }) => {
  const [fv, sfv] = useState<number>(0);
  useEffect(() => {
    const timer = setTimeout(() => sfv(val), 500);
return () => clearTimeout(timer);

  }, [val]);
  return (
    <div
      className="o"
      style={{
        border: "1px solid red",
        width: "100%",
        height: "30px",
        overflow: "hidden",
      }}
    >
      <div
        className="i"
        style={{
          transform: `translateX(${fv - 100}%)`, // slide in from left
          backgroundColor: "red",
          height: "100%",
          textAlign: "right",
          color: val > 5 ? "white" : "black",
          transition: "transform 0.5s ease-in", // ✅ correct
        }}
      >
        {val}%
      </div>
    </div>
  );
};

export default function App() {
  const [pbq, setPbq] = useState<number>(60);

  return (
    <div className="App">
      <h1>Progress Bar</h1>
      <input
        type="number"
        max="100"
        min="0"
        value={pbq}
        onChange={(e:ChangeEvent<HTMLInputElement>) => setPbq(Number(e.target.value))}
      />
      <Pb val={pbq} />
    </div>
  );
}
