const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

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

module.exports = verifyToken;
