const router = require("express").Router();
const verifyToken = require("./verify_token");
const Product = require("../models/product");

router.use(verifyToken);

// Product 조회
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Product 추가
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
