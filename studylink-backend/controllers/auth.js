import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER

export const register = async (req, res) => {
  try {
    const {
      firsName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      department,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firsName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      department,
      viewedProfile: Math.floor(Math.random() * 1000),
      impression: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credintials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.statur(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
