const router = require("express").Router();
const verifyToken = require("./verify_token");
const Provider = require("../models/provider");

router.use(verifyToken);

router.get("/", async (req, res) => {
  try {
    const providers = await Provider.find({});
    res.json(providers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const provider = new Provider(req.body);
    await provider.save();
    res.json(provider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    await provider.remove();
    res.json({ message: "Deleted provider" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
