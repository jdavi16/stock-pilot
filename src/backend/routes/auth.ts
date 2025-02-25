import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";

const router = express.Router();

interface RegisterRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
  };
}

interface LoginRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

//POST /api/register
router.post("/register", async (req: RegisterRequest, res: Response) => {
  const { firstName, lastName, email, username, password } = req.body;

  //console.log("Received username: ", username);
  //console.log("Received password: ", password);

  try {
    //Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create newUser
    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req: LoginRequest, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Please enter both username and password" });
    return;
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: "Invalid username or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid username or password" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.VITE_JWT_SECRET as string, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", username: user.username, token, email: user.email, firstName: user.firstName, lastName: user.lastName });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
