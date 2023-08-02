const router = require("express").Router();
const verifyToken = require("./verify_token");
const Service = require("../models/service");

router.use(verifyToken);

// Service 조회
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json({ services });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Service 추가
router.post("/", async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.json({ service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Service by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // findByPk stands for "find by primary key"
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    await service.update(updatedData);

    res
      .status(200)
      .json({ message: "Service updated successfully", data: service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
