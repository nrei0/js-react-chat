const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");

const port = 8001;
const app = express();

const generateHash = () => {
  return crypto.randomBytes(20).toString("hex");
};

const messagesState = [
  {
    username: "Andrei",
    message: "hello world",
    timestamp: new Date().getTime(),
    id: generateHash(),
    clientId: Math.random(),
  },
  {
    username: "George",
    message: "hello world",
    timestamp: new Date().getTime(),
    id: generateHash(),
    clientId: Math.random(),
  },
  {
    username: "Mark",
    message: "hello world",
    timestamp: new Date().getTime(),
    id: generateHash(),
    clientId: Math.random(),
  },
  {
    username: "Yuri",
    message: "hello world",
    timestamp: new Date().getTime(),
    id: generateHash(),
    clientId: Math.random(),
  },
  {
    username: "Marc",
    message: "hello world",
    timestamp: new Date().getTime(),
    id: generateHash(),
    clientId: Math.random(),
  },
];

app.use(bodyParser.json());

app.post("/messages", (req, res) => {
  const { messages = [], timestamp } = req.body;

  messagesState.push(
    ...messages.map((clientMessage) => ({
      username: clientMessage.username,
      message: clientMessage.message,
      id: generateHash(),
      clientId: clientMessage.clientId,
      timestamp: new Date().getTime(),
    }))
  );

  res.send({
    messages: timestamp
      ? messagesState.filter((message) => message.timestamp >= timestamp)
      : messagesState,
  });
});

app.listen(port, () => {
  console.log("server started at :" + port);
});
