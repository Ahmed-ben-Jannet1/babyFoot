import ws from "./websocket.js";

export const addChatMessage = (message) => {
  const messagesDiv = document.getElementById("messages");
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<strong>${message.name}</strong>: ${message.text}`;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

export const sendMessage = () => {
  const name = document.getElementById("chatName").value;
  const text = document.getElementById("chatMessage").value;

  if (name.trim() && text.trim()) {
    const message = { type: "chatMessage", name, text };
    ws.send(JSON.stringify(message));
    document.getElementById("chatMessage").value = "";
  }
};
