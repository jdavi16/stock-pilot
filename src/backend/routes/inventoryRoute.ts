import express, { Request, Response } from "express";
import Inventory from "../models/Inventory";

const router = express.Router();

//POST /api/inventory
router.post("/inventory", async (req: Request, res: Response) => {
  try {
    const newInventory = new Inventory(req.body);
    await newInventory.save();
    res.status(201).json({ success: true, message: "Inventory added successfully" });
    return;
  } catch (err) {
    console.error("Error adding inventory:", (err as Error).message);
    res.status(500).json({ message: "Server error", error: (err as Error).message });
    return;
  }
});

//GET /api/inventory
router.get("/inventory", async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (err) {
    console.error("Error fetching inventory:", (err as Error).message);
    res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
});

//DELETE /api/inventory/:id
router.delete("/inventory/:id", async (req: Request, res: Response) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      res.status(404).json({ message: "Inventory not found" });
      return;
    }
    await inventory.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, message: "Inventory deleted successfully" });
    return;
  } catch (err) {
    console.error("Error deleting inventory:", (err as Error).message);
    res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
});

export default router;
