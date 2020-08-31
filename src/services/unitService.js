import { generateId } from "../utils/generateIDs";
// should be made with Immutable.js data structure enviroment
export const unites = [
  { _id: 1, name: "bottle" },
  { _id: 2, name: "box" },
  { _id: 3, name: "dozen" },
];

export default function getUnites() {
  return unites;
}

export function getUnitById(id) {
  return unites.find((u) => u._id === id);
}
export function addUnit(unit) {
  // generate id
  return unites.push({
    _id: generateId(unites),
    name: unit,
  });
}
