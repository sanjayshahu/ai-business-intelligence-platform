import { useState } from "react";
// import "./styles.css";
import data from "./data";
import { Node, CheckedMap, CheckProps } from "./types";

const Check = ({ node, checked, setChecked }: CheckProps) => {
  const handleChange = (isChecked: boolean, currentNode: Node) => {
    setChecked((prev) => {
      const nS: CheckedMap = { ...prev };

      // 1️⃣ Update current node and all its children
      const updateChildren = (node: Node) => {
        nS[node.id] = isChecked;
        node.children?.forEach(updateChildren);
      };
      updateChildren(currentNode);//1

      // 2️⃣ Update all parent nodes recursively
      const updateParents = (node: Node, parent?: Node) => {
        if (!parent) return;
        nS[parent.id] = parent.children?.every((child) => nS[child.id]) ?? false;//2

        // Find grandparent
        const grandParent = data.find((nd) => nd.children?.some((c) => c.id === parent.id));
        if (grandParent) updateParents(parent, grandParent);//3
      };

      // Find parent of the current node
      const parent = data.find((nd) => nd.children?.some((c) => c.id === currentNode.id));
      if (parent) updateParents(currentNode, parent);//2

      return nS;
    })
  };

  return (
    <>
      {node.map((d) => (
        <div key={d.id} style={{ paddingLeft: "25px" }}>
          <input
            type="checkbox"
            checked={!!checked[d.id]}
            onChange={(e) => handleChange(e.target.checked, d)}
          />
          <span>{d.name}</span>
          {d.children && (
            <Check node={d.children} checked={checked} setChecked={setChecked} />
          )}
        </div>
      ))}
    </>
  );
};

export default function App() {
  const [checked, setChecked] = useState<CheckedMap>({ 1: true, 6: true });

  return (
    <div className="App">
      <h1>Nested Checkboxes</h1>
      <Check node={data} checked={checked} setChecked={setChecked} />
    </div>
  );
}
