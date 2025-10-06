import User from "../models/userModel.js";
import Contact from "../models/contactModel.js";
import { imageUpload } from "../utils/helperFile.js";
import jwtTokenSign from "../utils/jwtToken.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Signup
export const signUp = async (req, res) => {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    if (req.files && req.files.image) {
      req.body.image = imageUpload(req.files.image, "userImage");
    }

    const hashed = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashed,
      image: req.body.image || ""
    });

    const { token, decoded } = await jwtTokenSign(user._id);

    const userObj = user.toObject();
    delete userObj.password;
    userObj.token = token;
    userObj.loginTime = decoded.iat;
    userObj.prevImg = userObj.image ? `${process.env.BASE_URL || `http://localhost:${process.env.PORT}`}/images/userImage/${userObj.image}` : "";

    return res.status(201).json({ success: true, message: "User created successfully", body: userObj });
  } catch (error) {
    console.error("signUp error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const { token, decoded } = await jwtTokenSign(user._id);

    const userObj = user.toObject();
    delete userObj.password;
    userObj.token = token;
    userObj.loginTime = decoded.iat;
    userObj.prevImg = userObj.image ? `${process.env.BASE_URL || `http://localhost:${process.env.PORT}`}/images/userImage/${userObj.image}` : "";

    return res.status(200).json({ success: true, message: "Login successful", body: userObj });
  } catch (error) {
    console.error("login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Contact form submission
export const contactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({ name, email, subject, message });

    return res.status(201).json({ success: true, message: "Contact form submitted", body: contact });
  } catch (error) {
    console.error("contactForm error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default { signUp, login, contactForm };
