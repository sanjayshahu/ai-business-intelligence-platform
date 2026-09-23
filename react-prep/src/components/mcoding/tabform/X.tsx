import { StepProps } from "./types";

export default function X({ data, sD, err }: StepProps) {
  const handleIn = (theme: "dark" | "white") => {
    sD((prev) => ({
      ...prev,
      theme,
    }));
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          name="theme"
          checked={data.theme === "dark"}
          onChange={() => handleIn("dark")}
        />
        dark
      </label>

      <label>
        <input
          type="radio"
          name="theme"
          checked={data.theme === "white"}
          onChange={() => handleIn("white")}
        />
        white
      </label>
      {err.theme && <span>{err.theme}</span>}
    </div>
  );
}
