import * as productsAPI from "./productService";
import * as unitsAPI from "./unitService";
import { generateId } from "../utils/generateIDs";
export const inventory = [
  {
    _id: 1,
    product: {
      _id: 1,
      name: "Face Mask",
      category: { _id: "1", name: "Skin Care" },
      enabled: "true",
    },
    unit: { _id: 3, name: "dozen" },
    numberInstock: 6,
  },
  {
    _id: 2,

    product: {
      _id: 2,
      name: "Facial Cleanser",
      category: { _id: 1, name: "Skin Care" },
      enabled: false,
    },
    unit: { _id: 1, name: "bottle" },

    numberInstock: 10,
  },
  {
    _id: 3,
    product: {
      _id: 4,
      name: "Shampoo",
      category: { _id: 2, name: "Hair Care" },
      enabled: false,
    },
    unit: { _id: 3, name: "dozen" },
    numberInstock: 6,
  },
];
export function getInventory() {
  return inventory;
}
function getProductById(productId) {
  return productsAPI.products.find((p) => p._id === productId);
}
function getUnitById(unitId) {
  return unitsAPI.unites.find((u) => u._id === unitId);
}

// fetching the record from inventory
export function getInvetoryRecord(productId, unitId) {
  return inventory.find(
    (i) => i.product._id === productId && i.unit._id === unitId
  );
}
export function addInventoryItem(trnasactionFormObj) {
  //numberInStock should be calculated as output of transaction
  //const user = getCurrentUSer();

  return inventory.push({
    _id: generateId(inventory),
    product: getProductById(trnasactionFormObj.productId),
    unit: getUnitById(trnasactionFormObj.unitId),
    numberInstock: trnasactionFormObj.quantity,
  });
}
