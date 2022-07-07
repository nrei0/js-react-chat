import moment from "moment";
import styles from "./message-window.module.css";

function MessageWindow(props) {
  const { messages } = props;

  return (
    <div className={styles.messages}>
      {messages.map(
        ({ username, message, timestamp, clientId, status = "sent" }) => {
          const formattedDate = moment(timestamp).format("HH:mm"); // 24h
          const messageStatus = `${styles["message-status"]} ${
            styles[`message-status-${status}`]
          }`;
          return (
            <div key={clientId} className={styles.message}>
              <span className={styles["message-username"]}>{username}: </span>
              <span>{message}</span>
              <div className={styles["message-details"]}>
                <span className={styles["message-time"]}>{formattedDate} </span>
                <div className={messageStatus} />
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

export default MessageWindow;
