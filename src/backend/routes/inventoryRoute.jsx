const express = require("express");
const Inventory = require("../models/Inventory.jsx");
const router = express.Router();

//POST /api/inventory
router.post("/inventory", async (req, res) => {
  try {
    const newInventory = new Inventory(req.body);
    await newInventory.save();
    res.status(201).json({ success: true, message: "Inventory added successfully" });
  } catch (err) {
    console.error("Error adding inventory:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//GET /api/inventory
router.get("/inventory", async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (err) {
    console.error("Error fetching inventory:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
