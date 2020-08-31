import categories, { addCategory } from "./fakeCategoryService";
import { getCategoryById } from "./fakeCategoryService";
import { generateId } from "../utils/generateIDs";

export const products = [
  {
    _id: 1,
    name: "Face Mask",
    category: { _id: 1, name: "Skin Care" },
    enabled: true,
  },

  {
    _id: 2,
    name: "Facial Cleanser",
    category: { _id: 1, name: "Skin Care" },
    enabled: true,
  },
  {
    _id: 3,
    name: "Sun screen Cream",
    category: { _id: 1, name: "Skin Care" },
    enabled: true,
  },
  {
    _id: 4,
    name: "Shampoo",
    category: { _id: 2, name: "Hair Care" },
    enabled: true,
  },
  {
    _id: 5,
    name: "Conditioner",
    category: { _id: 2, name: "Hair Care" },
    enabled: true,
  },
  {
    _id: 6,
    name: "Oil Treatment",
    category: { _id: 2, name: "Hair Care" },
    enabled: true,
  },
  {
    _id: 7,
    name: "Lip Tint",
    category: { _id: 3, name: "Make Up" },
    enabled: true,
  },
  {
    _id: 8,
    name: "Eye Shadow Palette",
    category: { _id: 3, name: "Make Up" },
    enabled: true,
  },
  {
    _id: 9,
    name: "Fondation",
    category: { _id: 3, name: "Make Up" },
    enabled: true,
  },
  {
    _id: 10,
    name: "Blood Pressure Monitor",
    category: { _id: 4, name: "Medical Supplies" },
    enabled: true,
  },
  {
    _id: 11,
    name: "Blood Glucose Monitor",
    category: { _id: 4, name: "Medical Supplies" },
    enabled: false,
  },
  {
    _id: 12,
    name: "Stethoscope",
    category: { _id: 4, name: "Medical Supplies" },
    enabled: true,
  },
];

export default function getProduct() {
  //const user = getCurrentUSer();
  //if (!user.role.name === "admin") {

  return products.filter((p) => p.enabled);
}
export function getProductById(id) {
  return products.find((p) => p._id === id);
}
export function addProduct(product) {
  let productInDb = products.find((p) => p._id === product._id) || {};
  productInDb.name = product.name;
  productInDb.category = getCategoryById(product.categoryId);
  productInDb.enabled = true;
  if (!productInDb._id) {
    productInDb._id = generateId(products);
    products.push(productInDb);
  }
  return productInDb;

  // return products.push({
  //   _id: generateId(products),
  //   name: product.name,
  //   category: getCategoryById(product.categoryId),
  // });
}

function findCategory(categoryId) {
  let categoryInDB = categories.find((c) => c._id === categoryId);
  // if (!categoryInDB) {
  //   const addedCategory = addCategory(categoryId);
  //   return addedCategory;
  // }
  return categoryInDB;
}
