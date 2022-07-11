import { useMessages } from "../../hooks/messages/use-messages";
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
  const { messages, onMessageAdd } = useMessages();

  return (
    <div className={styles.app}>
      <MessageWindow messages={messages} />
      <MessageControlPanel onMessageAdd={onMessageAdd} />
    </div>
  );
}

export default App;
