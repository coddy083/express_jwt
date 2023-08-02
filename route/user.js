const router = require("express").Router();
const verifyToken = require("./verify_token");
const User = require("../models/user");

router.use(verifyToken);

// User 조회
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User 추가
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
