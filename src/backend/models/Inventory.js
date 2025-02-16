const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    unique: false,
  },
  color: {
    type: String,
    required: true,
    unique: false,
  },
  category: {
    type: String,
    required: true,
    unique: false,
  },
  materialType: {
    type: String,
    required: true,
    unique: false,
  },
  weight: {
    type: String,
    required: false,
    unique: false,
  },
  weightUnit: {
    type: String,
    required: false,
    unique: false,
  },
  price: {
    type: String,
    required: false,
    unique: false,
  },
  currencyUnit: {
    type: String,
    required: false,
    unique: false,
  },
  onHand: {
    type: Number,
    required: false,
    unique: false,
  },
  costPer: {
    type: String,
    required: false,
    unique: false,
  },
  maxTemp: {
    type: Number,
    required: false,
    unique: false,
  },
  minTemp: {
    type: Number,
    required: false,
    unique: false,
  },
  maxBedTemp: {
    type: Number,
    required: false,
    unique: false,
  },
  minBedTemp: {
    type: Number,
    required: false,
    unique: false,
  },
});

module.exports = mongoose.model("Inventory", InventorySchema);
