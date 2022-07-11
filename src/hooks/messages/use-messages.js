import useAxios from "axios-hooks";
import { useState, useRef, useEffect } from "react";
import { useInterval } from "../util/use-interval";

const SYNC_MESSAGE_MS = 1000;

/**
 * Get last timestamp from the messages.
 *
 * @param {Array<Message>} messages List of current messages.
 * @returns Last message's timestamp.
 */
const getLastMessagesTimestamp = (messages) => {
  return messages.length
    ? (
        messages
          .filter((message) => message.id)
          .sort((a, b) => b.timestamp - a.timestamp)[0] || {}
      ).timestamp
    : undefined;
};

export const useMessages = () => {
  const [messages, setMessages] = useState([]);

  // The queue for keeping client-side messages are ready to send to server.
  const messageToSendRef = useRef([]);

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: "/messages",
      method: "POST",
    },
    { manual: true, autoCancel: false }
  );

  /**
   * QUEUE management.
   */
  const clearMessageQueue = () => {
    messageToSendRef.current = [];
  };

  const getMessageQueue = () => messageToSendRef.current;

  const addToMessageQueue = (message) => {
    messageToSendRef.current.push(message);
  };
  /**
   * // QUEUE management.
   */

  // Load new messages every 1000 ms.
  useInterval(() => {
    if (!loading) {
      refetch({
        data: {
          timestamp: getLastMessagesTimestamp(messages),
          messages: getMessageQueue(),
        },
      }).catch((e) => {});
      clearMessageQueue();
    }
  }, SYNC_MESSAGE_MS);

  // Handle sync response from server.
  useEffect(
    () => {
      if (data && !loading) {
        const newMessages = [];

        data.messages.forEach((serverMessage) => {
          const idx = messages.findIndex((clientMessage) => {
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, loading]
  );

  useEffect(
    () => {
      if (error && !loading) {
        // let hasFailedMessages = false;

        const newMessages = messages.map((message) => {
          return {
            ...message,
            status: message.status === "sent" ? "failed" : message.status,
          };
        });

        setMessages([...newMessages]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [error, loading]
  );

  const onMessageAdd = (username, message) => {
    const id = Math.random();
    const newMessage = {
      username,
      message,
      timestamp: new Date().getTime(),
      clientId: id,
      status: "sent",
    };

    addToMessageQueue(newMessage);

    setMessages([...messages, newMessage]);
  };

  return {
    messages,
    onMessageAdd,
  };
};
