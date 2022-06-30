import styles from "./message-window.module.css";

function MessageWindow(props) {
  const { messages } = props;

  return (
    <div className={styles.messages}>
      {messages.map(({ username, message, timestamp, id }) => {
        const date = new Date(timestamp);
        const formattedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return (
          <div key={id} className={styles.message}>
            <span className={styles["message-time"]}>{formattedDate}: </span>
            <span className={styles["message-username"]}>{username}: </span>
            <span>{message}</span>
          </div>
        );
      })}
    </div>
  );
}

export default MessageWindow;
