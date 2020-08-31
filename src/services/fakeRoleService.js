export const roles = [
  { _id: 1, name: "admin", type: "all" },
  { _id: 2, name: "casher", type: "withdraw" },
  { _id: 3, name: "supervisor", type: "add" },
];

export const adminRoles = [
  {
    _id: 1,
    role: "withdraw",
  },
  {
    _id: 2,
    role: "add",
  },
];
export const operationTypes = [
  {
    _id: 1,
    operation: "Withdrawal",
    isAdded: false,
  },
  {
    _id: 2,
    operation: "Insertion",
    isAdded: true,
  },
];
export function getOperationTypes() {
  return operationTypes;
}

export function getAdminRoles() {
  return adminRoles;
}

export function getAdminRoleById(id) {
  return adminRoles.find((r) => r._id === id);
}
export function getRoles() {
  return roles.filter((r) => r);
}
export function getRoleById(id) {
  return roles.find((r) => r._id === id);
}
