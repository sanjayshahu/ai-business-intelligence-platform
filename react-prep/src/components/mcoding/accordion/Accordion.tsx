
import "./style.css";
import defaultData, { accordionItem } from "./data";
import { useState } from "react";
import useNP from "../../../context/NotificationContext";

interface AccordionProps {
  data?: accordionItem[];
}

export default function Accordion({
  data = defaultData,
}: AccordionProps) {
  const { notify } = useNP();

  const [oi, setOi] = useState<number | null>(null);

  const hoi = (i: number) => {
    i === oi ? setOi(null) : setOi(i);
  };

  // Testability fix
  const params = new URLSearchParams(window.location.search);
  const isEmpty = params.get("empty") === "true";

  // Override data when testing empty state
  const finalData = isEmpty ? [] : data;

  return (
    <div className="App">
      <header>
        <h1>Accordion</h1>
      </header>

      <main>
        {finalData.length === 0 && <h1>no items found</h1>}

        {finalData.length > 0 &&
          finalData.map((d: accordionItem, index: number) => (
            <div className="a-c" key={index}>
              <button
                className="a-t"
                onClick={() => {
                  hoi(index);
                  notify.s(`Clicked: ${d.title}`);
                }}
              >
                {d.title}

                <span className="a-a">
                  {index === oi ? "u" : "d"}
                </span>
              </button>

              {index === oi && (
                <div className="a-d">
                  {d.desc}
                </div>
              )}
            </div>
          ))}
      </main>
    </div>
  );
}

