import { useState } from "react";
import json from "./data.json"; // JSON has no export/const, just plain JSON

interface Node {
  id: number;
  name: string;
  isFolder: boolean;
  children?: Node[];
}

interface ListProps {
  data: Node[];
}

// Named export for List
export const List: React.FC<ListProps> = ({ data }) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      {data.map((d) => (
        <div key={d.id}>
          {d.isFolder && (
            <span
              onClick={() => toggleExpand(d.id)}
              style={{ cursor: "pointer", marginRight: "5px" }}
            >
              {expanded[d.id] ? "📂" : "📁"}
            </span>
          )}
          <span>{d.name}</span>
          {expanded[d.id] &&
            d.isFolder &&
            d.children &&
            d.children.length > 0 && <List data={d.children} />}
        </div>
      ))}
    </div>
  );
};

// Named export for App
export const FE: React.FC = () => {
  const [data] = useState<Node[]>(json as Node[]);

  return <List data={data} />;
};
