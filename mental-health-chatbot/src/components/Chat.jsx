import React, { useState } from "react";
import axios from "axios";
import { Space } from "lucide-react";

const Chat = () => {
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async (message) => {
    if (!input.trim()) return;

    // Add user message to the chat
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      // Send user message to the backend AI API
      const response = await axios.post("http://localhost:8080/chat", 
        { message: input }, 
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      
      // Add AI response to the chat
      setMessages([...newMessages, { text: response.data.reply, sender: "ai" }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...newMessages, { text: "Error: AI is unavailable", sender: "ai" }]);
    }
  };

  return (
    <div style={styles.chatContainer}>
      <h1>HealBOT</h1>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#1a1c23" : "#0f1116",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything."
          style={styles.input}
        />
        <button onClick={() => sendMessage(input)} style={styles.sendButton}>
          Send
        </button>

      </div>
    </div>
  );
};

// Basic Styles
const styles = {
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    width: "800px",
    margin: "auto",
    padding: "50px",
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    height: "500px",
    overflowY: "auto",
    padding: "10px",
    marginBottom: "10px",
  },
  message: {
    padding: "10px",
    borderRadius: "10px",
    margin: "5px",
    maxWidth: "75%",
  },
  inputContainer: {
    display: "flex",
  },
  input: {
    flex: 1,
    color:"white",
    padding: "10px",
    border: "1px solid #1a1c23",
    borderRadius: "30px",
    marginRight: "5px",
    backgroundColor: "#1a1c23",
  },
  sendButton: {
    padding: "10px",
    backgroundColor: "#a4a8b7",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
  },
};

export default Chat;
