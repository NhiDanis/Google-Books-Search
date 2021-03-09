const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 2901;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  };

app.use(routes);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
    