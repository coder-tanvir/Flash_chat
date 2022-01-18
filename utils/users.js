const users = [];

//Join user to chat
function userjoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  console.log(typeof users);
  return user;
}

function getcurrentuser(id) {
  return users.find((user) => user.id === id);
}

module.exports = {
  userjoin,
  getcurrentuser,
};
