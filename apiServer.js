// const path = require("path");
const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");

const port = 8001;
const app = express();

const generateHash = () => {
  return crypto.randomBytes(20).toString("hex");
};

const MOCKED_MESSAGES = [
  {
    username: "Andrei",
    message: "hello world",
    timestamp: new Date().getTime(),
    id: generateHash(),
  },
  {
    username: "George",
    message: "hello world",
    timestamp: new Date().getTime(),
    id: generateHash(),
  },
  {
    username: "Mark",
    message: "hello world",
    timestamp: new Date().getTime(),
    id: generateHash(),
  },
  {
    username: "Yuri",
    message: "hello world",
    timestamp: new Date().getTime(),
    id: generateHash(),
  },
  {
    username: "Marc",
    message: "hello world",
    timestamp: new Date().getTime(),
    id: generateHash(),
  },
];

app.use(bodyParser.json());

app.get("/messages", (req, res) => {
  res.send({
    messages: MOCKED_MESSAGES,
  });
});

app.listen(port, () => {
  console.log("server started at :" + port);
});
