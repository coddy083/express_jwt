const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();
const port = 4000;
const SECRET_KEY = "qwer1234!@#$";
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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", auth);

const user = {
  id: 1,
  username: "test",
  password: "test",
  email: "test@test.com",
};

const helloApi = (req, res) => {
  res.send("Hello World!");
};

const loginApi = (req, res) => {
  const expiresIn = 30;
  jwt.sign({ user }, SECRET_KEY, { expiresIn }, (err, token) => {
    if (err) {
      res.status(500).json({ error: "Failed to generate token" });
    } else {
      res.cookie("token", token, {
        httpOnly: false,
        secure: false,
        expires: new Date(Date.now() + expiresIn * 1000),
      });
      res.send("login");
    }
  });
};

app.get("/", helloApi);
app.get("/login", loginApi);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
