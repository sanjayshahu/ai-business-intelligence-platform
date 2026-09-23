import { Node } from "./types";
const data:Node[] = [
  {
    id: 1,
    name: "A",
    children: [
      {
        id: 2,
        name: "A1",
        children: [
          { id: 3, name: "A1a", children: [] },
          { id: 4, name: "A1b", children: [] },
        ],
      },
      {
        id: 5,
        name: "A2",
        children: [],
      },
    ],
  },
  {
    id: 6,
    name: "B",
    children: [
      {
        id: 7,
        name: "B1",
        children: [
          {
            id: 8,
            name: "B1a",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 9,
    name: "C",
    children: [],
  },
];
export default data;
