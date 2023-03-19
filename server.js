const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV === "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/projects/:page", (req, res) => {
    const page = req.params.page;
    let file = "";
    switch (page) {
      case "example1":
        file = "/projects/example1";
        break;
      case "example2":
        file = "/projects/example2";
        break;
    }
    return app.render(req, res, file, { page });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});