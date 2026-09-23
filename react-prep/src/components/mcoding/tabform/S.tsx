import { ChangeEvent } from "react";
import { StepProps } from "./types";

export default function S({ data, sD, err }: StepProps) {
  const { name, age, sex } = data;

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          sD({ ...data, name: e.target.value })
        }
      />
      {err.name && <span>{err.name}</span>}

      <label htmlFor="age">Age:</label>
      <input
        type="number"
        id="age"
        name="age"
        value={age}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          sD({ ...data, age: Number(e.target.value) })
        }
      />
      {err.age && <span>{err.age}</span>}

      <label htmlFor="sex">Sex:</label>
      <input
        type="text"
        id="sex"
        name="sex"
        value={sex}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          sD({ ...data, sex: e.target.value })
        }
      />
      {err.sex && <span>{err.sex}</span>}
    </div>
  );
}
