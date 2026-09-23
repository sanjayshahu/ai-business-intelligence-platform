// import { ChangeEvent, useState } from "react";
// // import "./styles.css";

import { ChangeEvent, useState } from "react";

interface Todo {
    id:number;
    name:string;
    status:boolean
}

export default function App() {
  const [input, setInput] = useState<string>("");
  const [tlist, setTlist] = useState<Todo[]>([
    { id: 1, name: "Exercise", status: false },
    { id: 2, name: "Read a book", status: true },
    { id: 3, name: "Meditation", status: false },
    { id: 4, name: "Cook dinner", status: true },
    { id: 5, name: "Study JavaScript", status: false },
  ]);
  const addTd = () => {
    if(!input.trim()) return;
    let todo = {
      id: tlist.length + 1,
      name: input,
      status: false,
    };
    setTlist((prev) => [...prev, todo]);
    setInput('')
  };
  const hd = (id:number) => {
    setTlist(tlist.filter((t) => t.id !== id));
  };
  const toggleCb = (id:number) => {
    setTlist(
      tlist.map((t:Todo) => {
        if (id === t.id) {
          return { ...t, status: !t.status }; // return a new updated object
        }
        return t; // unchanged object
      })
    );
  };
   const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      addTd();
    }
  };

  return (
    <div className="App">
      <h1>todo list</h1>
      <input value={input} onChange={(e:ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} onKeyDown={handleKeyPress}/>
      <button onClick={addTd}>add</button>
      <ul>
        {tlist.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              onChange={() => toggleCb(t.id)}
              
              key={t?.id}
              checked={t?.status}
            />
            <span>{t?.name}</span>
            <button onClick={() => hd(t?.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
