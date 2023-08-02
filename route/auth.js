const router = require("express").Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
//body-parser

const loginApi = async (req, res) => {
  const expiresIn = 300;
  if (!req.body) return res.status(400).json({ error: "Bad Request" });
  const userInfo = req.body;
  const uid = userInfo.uid;

  // Find or create user in MongoDB
  try {
    const signUser = await User.findOneAndUpdate({ uid: uid }, userInfo, {
      upsert: true,
      new: true,
    });

    jwt.sign({ signUser }, SECRET_KEY, { expiresIn }, (err, token) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Login Error" });
      }
      res.cookie("token", token, {
        maxAge: expiresIn * 1000,
        // httpOnly: true,
        // secure: false,
      });
      res.send("Login Success");
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const logoutApi = (req, res) => {
  res.clearCookie("token");
  res.send("Logout Success");
};

router.get("/logout", logoutApi);
router.post("/login", loginApi);

module.exports = router;
