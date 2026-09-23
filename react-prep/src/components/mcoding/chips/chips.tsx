import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";


export default function Chip() {
  const [t, setT] = useState<string>("");      // input value
  const [c, setC] = useState<string[]>([]);    // array of chips

  useEffect(() => {
    console.log(t);
  }, [t]);

  const ac = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && t.trim() !== "") {
      setC((prev) => [...prev, t.trim()]);
      setT("");
    }
  };

  const dc = (index: number) => {
    const nc = [...c];
    nc.splice(index, 1); // remove 1 item
    setC(nc);
  };

  return (
    <div className="App">
      <h1>Chip Inputs</h1>
      <input
        type="text"
        value={t}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setT(e.target.value)}
        onKeyDown={ac}
      />
      {c.map((cl, index) => (
        <div key={index} style={{ textAlign: "right" }}>
          {cl}
          <span
            onClick={() => dc(index)}
            style={{ cursor: "pointer", marginLeft: "10px", color: "red" }}
          >
            X
          </span>
        </div>
      ))}
    </div>
  );
}
