import mongoose, { Document, Schema, Model } from "mongoose";

interface IInventory extends Document {
  brand: string;
  color: string;
  category: string;
  materialType: string;
  weight?: string;
  weightUnit?: string;
  price?: string;
  currencyUnit?: string;
  onHand?: number;
  costPer?: string;
  maxTemp?: number;
  minTemp?: number;
  maxBedTemp?: number;
  minBedTemp?: number;
}

const InventorySchema: Schema<IInventory> = new Schema({
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

const Inventory: Model<IInventory> = mongoose.model<IInventory>("Inventory", InventorySchema);

export default Inventory;
