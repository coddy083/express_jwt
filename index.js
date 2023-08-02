const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 4000;
const provider = require("./route/provider");
const service = require("./route/service");
const product = require("./route/product");
const user = require("./route/user");
const auth = require("./route/auth");

const username = "root";
const password = "example";
const host = "db";
const db_port = 27017;
const dbName = "database";

const uri = `mongodb://${username}:${password}@${host}:${db_port}/${dbName}?authSource=admin`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

const origins = [
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5500",
];

app.use(
  cors({
    origin: origins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/auth", auth);
app.use("/provider", provider);
app.use("/service", service);
app.use("/product", product);
app.use("/users", user);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
