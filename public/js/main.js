const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const socket = io();

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
  div.innerHTML = `<p class="meta">Brad<span>9:12pm</span></p>
  <p class="text">${message}</p>`;
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
