import { StepProps } from "./types";

export default function T({ data, sD, err }: StepProps) {
  const { interests } = data;

  const handleIn = (index: number) => {
    const newInterests = interests.map((interest, i) =>
      i === index ? { ...interest, checked: !interest.checked } : interest
    );
    sD({ ...data, interests: newInterests });
  };

  return (
    <div>
      {interests.map((interest, index) => (
        <label key={index}>
          <input
            type="checkbox"
            name={`c-${index}`}
            checked={interest.checked || false}
            onChange={() => handleIn(index)}
          />
          {interest.name}
        </label>
      ))}
      {err.interests && <span>{err.interests}</span>}
    </div>
  );
}
