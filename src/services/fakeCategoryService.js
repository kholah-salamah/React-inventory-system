import { generateId } from "../utils/generateIDs";
export const categories = [
  { _id: 1, name: "SkinCare" },
  { _id: 2, name: "HairCare" },
  { _id: 3, name: "MakeUp" },
  { _id: 4, name: "MedicalSupplies" },
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
