import * as productsAPI from "./productService";
import * as unitsAPI from "./unitService";
import { getInvetoryRecord, addInventoryItem } from "./fakeInventoryService";
import { getAdminRoleById } from "./fakeRoleService";
import { generateId } from "../utils/generateIDs";
import { getCurrentUSer } from "./fakeUserService";
//import Moment from "react-moment";

export const inventoryTransactions = [
  {
    _id: 1,

    product: {
      _id: 1,
      name: "Face Mask",
      category: { _id: "1", name: "SkinCare" },
      enabled: "true",
    },

    unit: { _id: 3, name: "dozen" },

    date: new Date(2018, 0, 29, 7, 8, 50), //new Date().toLocaleString(),

    isAdded: true,

    quantity: 6,
  },

  {
    _id: 2,

    product: {
      _id: 2,
      name: "Facial Cleanser",
      category: { _id: "1", name: "SkinCare" },
      enabled: "true",
    },

    unit: { _id: 1, name: "bottle" },

    date: new Date(2015, 3, 20, 1, 7, 8), //new Date().toLocaleString(),

    isAdded: true,

    quantity: 10,
  },

  {
    _id: 3,

    product: {
      _id: 4,
      name: "Shampoo",
      category: { _id: 2, name: "HairCare" },
      enabled: false,
    },

    unit: { _id: 3, name: "dozen" },

    date: new Date(2014, 1, 2, 9, 1, 22), //new Date().toLocaleString(),

    isAdded: false,

    quantity: 20,
  },
];

export default function getInventoryTransactions() {
  return inventoryTransactions;
}
function getProductById(productId) {
  return productsAPI.products.find((p) => p._id === productId);
}

function getUnitById(unitId) {
  return unitsAPI.unites.find((u) => u._id === unitId);
}

export function addInventoyTransaction(trnasactionFormObj) {
  const user = getCurrentUSer();
  let isAdded = user.role.type === "add" ? true : false;

  // taking admin chioice from the invisable Form to state the operation type
  if (user.role.type === "all") {
    let getAdminRole = getAdminRoleById(trnasactionFormObj.operation);
    isAdded = getAdminRole.role === "add" ? true : false;
    //console.log("isAdded", isAdded, "Admin role has been stated");
    // isAdded = trnasactionFormObj.operation === "add" ? true : false;
  }

  // checking inventory
  // prettier-ignore
  let inventory =getInvetoryRecord(trnasactionFormObj.productId,trnasactionFormObj.unitId);
  //console.log(inventory);

  // oldNumberInStock ==> stated depending on the existance of inventory Record
  const oldNumberInStock = inventory ? inventory.numberInstock : 0;

  // prettier-ignore
  const newNmberInStock = isAdded ? oldNumberInStock + trnasactionFormObj.quantity
    : oldNumberInStock - trnasactionFormObj.quantity;

  // prettier-ignore
  if (isAdded && !inventory) {
   
    addInventoryItem(trnasactionFormObj);
   
  }

  // prettier-ignore
  try {
    if (!isAdded && (!inventory || trnasactionFormObj.quantity > oldNumberInStock))
      throw Error("There is no stock or insufficient number in stock please refill your inventory ");
  }
  catch (ex) {
    alert(ex);
    return;
    }
  console.log("atch an error");
  if (inventory) inventory.numberInstock = newNmberInStock;

  // generate id
  inventoryTransactions.push({
    _id: generateId(inventoryTransactions),

    product: getProductById(trnasactionFormObj.productId),

    unit: getUnitById(trnasactionFormObj.unitId),

    date: new Date(),

    isAdded: isAdded,
    quantity: trnasactionFormObj.quantity, //setNumberInStock(trnasactionFormObj.quantity),
  });
  alert("transaction has been added");
}

// export default function setNumberInStock(quantity, productId, unitId) {
//   let inventory = getInvetoryRecord(productId, unitId);

//   if (!inventory)
//     inventory = {
//       productId: productId,
//       unitId,
//     };

//   if (user.role.type === "add") {
//     let numberInstock = +quantity;
//     return numberInstock;
//   }
//   //first we need to get numberInStock value from invetory

//   if (user.role.type === "withdarw") {
//     numberInstock =
//       quantity <= oldNumberInstock
//         ? oldNumberInstock - quantity
//         : "transaction if forbiden";
//     return numberInstock;
//   }
// }

// if (!inventory) {
//   if (!isAdded) {
//     throw Error("insufficient number in stock");
//   } else {
//     addInventoryItem(trnasactionFormObj);
//   }
//   // in case ther is an inventory record
// } else {
//   if (!isAdded) {
//     if (trnasactionFormObj.quantity <= inventory.numberInstock) {
//       inventory.numberInstock =
//         inventory.numberInstock - trnasactionFormObj.quantity;
//     } else {
//       throw Error("insufficient number in stock");
//     }
//   } else {
//     inventory.numberInstock += trnasactionFormObj.quantity;
//   }
// }
