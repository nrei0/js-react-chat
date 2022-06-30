import { useState } from "react";
import styles from "./message-control-panel.module.css";

function MessageControlPanel(props) {
  const { onMessageAdd } = props;
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className={styles["control-panel"]}>
      <input
        type="text"
        className={styles["username-field"]}
        placeholder="Nickname"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      ></input>
      <input
        type="text"
        className={styles["message-field"]}
        placeholder="Message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></input>
      <button
        type="submit"
        onClick={() => {
          onMessageAdd(username, message);
        }}
      >
        Send
      </button>
    </div>
  );
}

export default MessageControlPanel;
