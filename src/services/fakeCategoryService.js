import { generateId } from "../utils/generateIDs";
export const categories = [
  { _id: 1, name: "Skin Care" },
  { _id: 2, name: "Hair Care" },
  { _id: 3, name: "Make Up" },
  { _id: 4, name: "Medical Supplies" },
];

export default function getCategories() {
  return categories;
}
export function getCategoryById(id) {
  return categories.find((c) => c._id === id);
}
export function addCategory(categoryName) {
  // generate id
  return categories.push({
    _id: generateId(categories),
    name: categoryName,
  });
}
