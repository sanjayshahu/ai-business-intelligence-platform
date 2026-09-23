// src/HtmlElementsDemo.tsx
import React, { useState, useEffect } from "react";
import HtmlChild from "./RoleChild";

const HtmlElements: React.FC = () => {
  // Synchronous list
  const syncItems = ["Apple", "Banana", "Cherry"];
  const [pd,setpd]=useState({'n':'san','c':'ff','u':'fff','url':'https://dummyjson.com/products'})

  // Asynchronous list
  const [asyncItems, setAsyncItems] = useState<string[]>([]);
  const [data,setData]=useState([]);
  const fetchData=async ()=>{
    const res= await fetch('https://dummyjson.com/products');
    const resj=await res.json();
    console.log("rj",resj)
    
  }
  useEffect(() => {
    // Simulate API call with 1 second delay
    const timer = setTimeout(() => {
      setAsyncItems(["Dog", "Cat", "Rabbit"]);
    }, 1000);
    
    fetchData();

    return () => clearTimeout(timer);
    
  }, []);

  return (
    
    <div>
      <button>back</button>
      <form action="" aria-label="formt">
        <button>save</button>
         <button>cancel</button>
      </form>
      <HtmlChild  val={pd}/>
      <h2>Synchronous List</h2>
      <ul>
        {syncItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Asynchronous List</h2>
      {asyncItems.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {asyncItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HtmlElements;
