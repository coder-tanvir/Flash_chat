const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const socket = io();

//Queries
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
console.log(username, room);

///Emits username
socket.emit("chatroom", { username, room });

socket.on("message", (message) => {
  console.log(message);
  outputmessage(message);

  //Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//output message
function outputmessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
  <p class="text">${message.text}</p>`;
  document.querySelector(".chat-messages").appendChild(div);
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  console.log(msg);

  socket.emit("chatmessage", msg);

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});
