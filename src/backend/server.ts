import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth";
import inventoryRoutes from "./routes/inventoryRoute";

dotenv.config(); // Load environment variables

const MONGODB_URI = process.env.VITE_MONGODB_URI as string;
const PORT = process.env.PORT || 5000;

const app: Express = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.options("*", cors());
// MongoDB connection
mongoose
  .connect(MONGODB_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Auth Routes
app.use("/api", authRoutes);
app.use("/api", inventoryRoutes);

// Fallback route
app.all("*", (req: Request, res: Response) => {
  res.status(404).send(`Cannot ${req.method} ${req.path}`);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
