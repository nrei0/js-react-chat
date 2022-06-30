import axios from "axios";
import { useState, useEffect } from "react";
import MessageControlPanel from "../message-control-panel/message-control-panel";
import MessageWindow from "../message-window/message-window";

import styles from "./app.module.css";
/**
 * Inside styles:
 * {
 *   app: 'app-HASH',
 *   messages: 'message-HASH',
 *   ...
 * }
 */

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages").then((response) => {
      const { data } = response;

      if (data) {
        setMessages(data.messages);
      }
    });
  }, []);

  const onMessageAdd = (username, message) => {
    setMessages([
      ...messages,
      { username, message, timestamp: new Date().getTime() },
    ]);
  };

  return (
    <div className={styles.app}>
      <MessageWindow messages={messages} />
      <MessageControlPanel onMessageAdd={onMessageAdd} />
    </div>
  );
}

export default App;
