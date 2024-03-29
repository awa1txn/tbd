//server - express, app - next.js
const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV === "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
const server = express();

//page render
server.get("*", (req, res) => {
  return handle(req, res);
});

server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
});