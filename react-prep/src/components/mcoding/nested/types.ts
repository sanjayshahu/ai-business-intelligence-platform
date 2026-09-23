export interface Node {
  id: number;
  name: string;
  children?: Node[];
}

export type CheckedMap = Record<number, boolean>;

export interface CheckProps {
  node: Node[];
  checked: CheckedMap;
  setChecked: React.Dispatch<React.SetStateAction<CheckedMap>>;
}