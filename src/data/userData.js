const USER_KEY = "user";
const ACCOUNTS_KEY = "accounts";

// reference activity03 week5
// This class is used to store all functionaltiy dealing with user data storage.
// You can set, add, update, delete users. It also provides extra functionality
// to ensure current passwords match when logging in or updating a profile of a user.
// It also allows avatars to be retrieved for display on posts/replies.

// Checks local storage for accounts object, if it exists return, otherwise initialise it.
function initializeUsers() {
  if (localStorage.getItem(ACCOUNTS_KEY) !== null) {
    return;
  }

  setUsers({});
}

// sets the users object in the local storage
function setUsers(users) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(users));
}

function addUser(name, email, password, avatar) {
  const retrievedUsers = getAllUsers();
  const joinDate = Date(Date.UTC());
  retrievedUsers[email] = { email, name, password, joinDate, avatar };
  setUsers(retrievedUsers);
}

function updateUser(name, email, password, avatar) {
  const retrievedUsers = getAllUsers();
  retrievedUsers[email].name = name;
  retrievedUsers[email].password = password;
  retrievedUsers[email].avatar = avatar;
  setUsers(retrievedUsers);
  setUser(JSON.stringify(retrievedUsers[email]));
}

function deleteUser(email) {
  const users = getAllUsers();
  delete users[email];
  setUsers(users);
}

function getAllUsers() {
  return JSON.parse(localStorage.getItem(ACCOUNTS_KEY));
}

// validates user login details and sets user in local storage if succesful.
function userValidation(email, password) {
  const users = getAllUsers();
  if (Object.keys(users).includes(email)) {
    if (users[email].password === password) {
      const name = users[email].name;
      const joinDate = users[email].joinDate;
      const avatar = users[email].avatar;
      setUser(JSON.stringify({ email, name, joinDate, avatar }));
      return true;
    }
  }
  return false;
}

function userCurrentPasswordValidate(email, currentPassword) {
  const users = getAllUsers();
  if (users[email].password === currentPassword) {
    return true;
  }
  return false;
}
// returns true if user email already exists in localStorage
function userExistValidation(email) {
  const users = getAllUsers();
  return Object.keys(users).includes(email);
}

function setUser(user) {
  localStorage.setItem(USER_KEY, user);
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

function getAvatarByUser(user) {
  const users = getAllUsers();
  if (Object.keys(users).includes(user)) {
    return users[user].avatar;
  }
}

export {
  initializeUsers,
  addUser,
  updateUser,
  userValidation,
  getUser,
  removeUser,
  deleteUser,
  userExistValidation,
  userCurrentPasswordValidate,
  getAvatarByUser,
};
