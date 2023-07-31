const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//mongodb
const User = require("../models/user");

const SECRET_KEY = "qwer1234!@#$";

const verifyToken = (req, res, next) => {
  const token = req.headers.cookie ? req.headers.cookie.split("=")[1] : null;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

router.use(verifyToken);

router.get("/", (req, res) => {
  res.send("인증 성공");
});

//Create new user
router.post("/register", async (req, res) => {
  console.log(req?.body);
  res.send("register");
  // const hashedPassword = await bcrypt.hash(req.body.password, 10);
  // const newUser = new User({
  //   username: req.body.username,
  //   password: hashedPassword,
  //   email: req.body.email,
  // });

  // try {
  //   const savedUser = await newUser.save();
  //   res.json(savedUser);
  // } catch (err) {
  //   res.json({ message: err });
  // }
});

//All Users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
