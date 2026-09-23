import { KeyboardEvent, useRef, useState } from "react";


export default function App() {
  const OTP_SIZE = 5;
  const refArray = useRef<(HTMLInputElement|null)[]>([]);
  const [iA, siA] = useState<string[]>(new Array(OTP_SIZE).fill(""));

  // Handle input change
const hc = (val: string, i: number) => {
  if (isNaN(Number(val))) return; // convert to number for validation
  let nv = val.trim().slice(-1);
  const na = [...iA];
  na[i] = nv;
  siA(na);

  if (nv) {
    refArray.current[i + 1]?.focus();
  }
};


  // Handle key press (for backspace mainly)
  const hp = (e: KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace") {
      const na = [...iA];

      if (na[i]) {
        // Clear current input if it has a value
        na[i] = "";
        siA(na);
      } else {
        // If already empty, go to previous input
        refArray.current[i - 1]?.focus();
      }
    }
  };

  return (
    <div className="App">
      <h1>otp</h1>
      {iA.map((val, index) => (
        <input
          key={index}
          type="text"
          value={iA[index]}
          onChange={(e) => hc(e.target.value, index)}
          onKeyDown={(e) => hp(e, index)}
         ref={(input) => {
  refArray.current[index] = input;
}}

          style={{
            width: "50px",
            height: "50px",
            margin: "10px",
            fontSize: "40px",
            textAlign: "center",
          }}
        />
      ))}
    </div>
  );
}
