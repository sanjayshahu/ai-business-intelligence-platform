// Shared types for the form

export interface Interest {
  name: string;
  checked: boolean;
}

export interface FormData {
  name: string;
  age: number;
  sex: string;
  interests: Interest[];
  theme: "dark" | "white";
}

export type FormErrors = Partial<Record<keyof FormData, string>>;

export interface StepProps {
  data: FormData;
  sD: React.Dispatch<React.SetStateAction<FormData>>;
  err: FormErrors;
}

export interface StepConfig {
  name: string;
  c: React.ComponentType<StepProps>;
  validate: (data: FormData) => boolean;
}
