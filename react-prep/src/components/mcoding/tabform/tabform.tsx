
import X from "./X";
import S from "./S";
import T from "./T";
import { useEffect, useState } from "react";
import { FormData, FormErrors, StepConfig } from "./types";

export default function App() {
  const [aT, setAt] = useState<number>(0);
  const [err, setError] = useState<FormErrors>({});
  const [data, setData] = useState<FormData>({
    name: "sanjay",
    age: 23,
    sex: "M",
    interests: [
      { name: "sona", checked: false },
      { name: "dona", checked: false },
      { name: "gona", checked: false },
    ],
    theme: "dark",
  });

  const UiConfig: StepConfig[] = [
    {
      name: "S",
      c: S,
      validate: (data) => {
        const { name, age, sex } = data;
        const errors: FormErrors = {};
        if (name.length < 2) {
          errors.name = "Name too short";
        }
        if (age < 25) {
          errors.age = "Age not allowed (<25)";
        }
        if (sex === "") {
          errors.sex = "Sex required";
        }
        setError(errors);
        return Object.keys(errors).length === 0;
      },
    },
    {
      name: "T",
      c: T,
      validate: (data) => {
        const errors: FormErrors = {};
        if (!data.interests.some((i) => i.checked)) {
          errors.interests = "At least one interest required";
        }
        setError(errors);
        return Object.keys(errors).length === 0;
      },
    },
    {
      name: "X",
      c: X,
      validate: (data) => {
        const errors: FormErrors = {};
        if (!["dark", "white"].includes(data.theme)) {
          errors.theme = "Theme must be dark or white";
        }
        setError(errors);
        return Object.keys(errors).length === 0;
      },
    },
  ];

  const ATC = UiConfig[aT].c;

  useEffect(() => {
    console.log("d", data);
  }, [data]);

  const hC = () => {
    console.log("✅ Final Submit:", data);
  };

  const hN = (n: "n" | "p") => {
    const valid = UiConfig[aT]?.validate(data)
      ? UiConfig[aT].validate(data)
      : true;

    if (!valid) {
      console.warn(`Validation failed at step ${UiConfig[aT].name}`);
      return;
    }
    if (n === "n") {
      setAt((prev) => prev + 1);
    }
    if (n === "p") {
      setAt((prev) => prev - 1);
    }
  };

  return (
    <div className="App">
      <div className="t-c">
        {UiConfig.map((u, i) => (
          <div key={i}>
            <div className="title" onClick={() => setAt(i)}>
              {u.name}
            </div>
          </div>
        ))}

        {aT > 0 && <button onClick={() => hN("p")}>Prev</button>}
        {aT < UiConfig.length - 1 && (
          <button onClick={() => hN("n")}>Next</button>
        )}
        {aT === UiConfig.length - 1 && <button onClick={hC}>Submit</button>}
      </div>

      {/* Display errors */}
      {Object.keys(err).length > 0 && (
        <div className="errors">
          {Object.entries(err).map(([field, message]) => (
            <div key={field} style={{ color: "red" }}>
              {message}
            </div>
          ))}
        </div>
      )}

      {data && (
        <div className="tab-body">
          <ATC data={data} sD={setData} err={err} />
        </div>
      )}
    </div>
  );
}
