const router = require("express").Router();
const jwt = require("jsonwebtoken");

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

module.exports = router;
