import useAxios from "axios-hooks";
import { useState, useEffect, useRef } from "react";
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

const getLastServerTimestamp = (messages) => {
  return messages.length
    ? messages
        .filter((message) => message.id)
        .sort((a, b) => b.timestamp - a.timestamp)[0].timestamp
    : undefined;
};

function App() {
  const [messages, setMessages] = useState([]);
  const [sync, setSync] = useState(false);
  // const [sync, setSync] = useState(true);
  const messageToSendRef = useRef([]);
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: "/messages",
      method: "POST",
    },
    { manual: true, autoCancel: false }
  );
  // const isMessagesSynced = useRef(true);

  useEffect(() => {
    setInterval(() => {
      setSync(false);
    }, 1000);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!loading && !sync) {
      const queueMessages = messageToSendRef.current;
      messageToSendRef.current = [];
      refetch({
        data: {
          timestamp: getLastServerTimestamp(messages),
          messages: queueMessages,
        },
      });
      setSync(true);
    }
  });

  useEffect(() => {
    if (data && !loading) {
      if (messages.length === 0) {
        setMessages([
          ...data.messages.map((serverMessage) => ({
            ...serverMessage,
            status: "delivered",
          })),
        ]);

        return;
      }

      // console.log(messages);
      const newMessages = [];

      data.messages.forEach((serverMessage) => {
        const idx = messages.findIndex((clientMessage) => {
          // console.log(serverMessage.clientId, clientMessage.id);
          return serverMessage.clientId === clientMessage.clientId;
        });

        if (idx !== -1) {
          messages[idx] = {
            ...messages[idx],
            id: serverMessage.id,
            timestamp: serverMessage.timestamp,
            status: "delivered",
          };
        } else {
          newMessages.push({
            message: serverMessage.message,
            username: serverMessage.username,
            id: serverMessage.id,
            clientId: serverMessage.clientId,
            timestamp: serverMessage.timestamp,
            status: "delivered",
          });
        }
      });

      setMessages([...messages, ...newMessages]);
    }
  }, [data]);

  const onMessageAdd = (username, message) => {
    // isMessagesSynced.current = false;

    const id = Math.random();
    const newMessage = {
      username,
      message,
      timestamp: new Date().getTime(),
      clientId: id,
    };

    messageToSendRef.current.push(newMessage);

    setMessages([...messages, newMessage]);
  };

  return (
    <div className={styles.app}>
      <MessageWindow messages={messages} />
      <MessageControlPanel onMessageAdd={onMessageAdd} />
    </div>
  );
}

export default App;
