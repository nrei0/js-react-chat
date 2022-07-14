import { useMessages } from "../../hooks/messages/use-messages";
import PropTypes from 'prop-types';
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
    <div className={styles.container}>
      <div className={styles.app}>
        {/* <img className={styles.myimage}/> */}
        <MessageWindow messages={messages} />
        <MessageControlPanel onMessageAdd={onMessageAdd} />
      </div>
    </div>
   
  );
}

export default App;
