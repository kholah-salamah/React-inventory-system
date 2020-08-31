export const users = [
  {
    _id: 1,
    name: "Hafsah",
    role: { _id: 1, name: "Admin", type: "all" },
  },
  {
    _id: 2,
    name: "Omar",
    role: { _id: 2, name: "Cashier", type: "withdraw" },
  },
  {
    _id: 3,
    name: "Khawlah",
    role: { _id: 3, name: "Supervisor", type: "add" },
  },
];
export function getUserById(id) {
  return users.find((u) => u._id === id);
}
export default function getUsers() {
  return users;
}
let currentUser = users[0];

export function setCurrentUser(userId) {
  let tragetUser = getUserById(userId);
  currentUser = tragetUser;
  return tragetUser;
}

export function getCurrentUSer() {
  let user = currentUser;
  return user;
}
