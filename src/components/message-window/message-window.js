import moment from "moment";
import styles from "./message-window.module.css";

function MessageWindow(props) {
  const { messages } = props;

  return (
    <div className={styles.messages}>
      {messages
        .sort((a, b) => a.timestamp - b.timestamp)
        .map(({ username, message, timestamp, clientId, status = "sent" }) => {
          const formattedDate = moment(timestamp).format("HH:mm"); // 24h
          const messageStatus = `${styles["message-status"]} ${
            styles[`message-status-${status}`]
          }`;
          return (
            <div key={clientId} className={styles.message}>
              <div className={styles["message-main"]}>
                <div className={styles["message-username"]}>{username}: </div>
                <div className={styles["message-text"]}>{message}</div>
              </div>
              <div className={styles["message-details"]}>
                <span className={styles["message-time"]}>{formattedDate} </span>
                <div className={messageStatus} />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default MessageWindow;
