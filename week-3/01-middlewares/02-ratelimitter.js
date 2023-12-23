const request = require("supertest");
const assert = require("assert");
const express = require("express");
const { number } = require("zod");
const app = express();
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second
// let requestCount = 0;
//app.use((req, res, next) => {
//  const userId = req.headers.id;
//  const present = numberOfRequestsForUser
//    .values(myObj)
//    .find((id) => myObj[id] === userId);
//  if (!present) {
//    numberOfRequestsForUser.id = userId;
//    numberOfRequestsForUser.requests += 1;
//  } else {
//    if (numberOfRequestsForUser.requests > 5) {
//      res.status(404).send("Dont spam");
//    } else {
//      res.status(200).send();
//    }
//    next();
//  }
//});
app.use((req, res, next) => {
  const userId = req.headers.id;

  if (!numberOfRequestsForUser[userId]) {
    numberOfRequestsForUser[userId] = { requests: 0 };
  }

  numberOfRequestsForUser[userId].requests++;

  if (numberOfRequestsForUser[userId].requests > 5) {
    res.status(404).send("Don't spam");
  } else {
    res.status(200).send(); // Send a response before calling next()
    next();
  }
});
let numberOfRequestsForUser = {};
setInterval(() => {
  numberOfRequestsForUser = {};
}, 1000);

app.get("/user", function (req, res) {
  res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

module.exports = app;
