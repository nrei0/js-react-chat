import moment from "moment";
import styles from "./message-window.module.css";

function MessageWindow(props) {
  const { messages } = props;
let msgScroll = 
<div className={styles.messages}>
{messages
  .sort((a, b) => a.timestamp - b.timestamp)
  .map(({ username, message, timestamp, clientId, status = "sent" }) => {
    const formattedDate = moment(timestamp).format("HH:mm:ss"); // 24h
    const messageStatus = `${styles["message-status"]} ${
      styles[`message-status-${status}`]
    }`;
    return (
      <div key={clientId} className={styles.message}>
      <div className={styles["message-details"]}>
        <div className={messageStatus} />
        <span className={styles["message-time"]}>{formattedDate} </span>
      </div>
      <span className={styles["message-username"]}>{username}: </span>
      <span>{message}</span>
    </div>
    );
  })}
</div>
// console.log(msgScroll.scrollTop)
  return (
    msgScroll
  );
}

export default MessageWindow;
