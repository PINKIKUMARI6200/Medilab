import express from "express";
import { signUp, login } from "../controllers/userController.js";
import { saveContact } from "../controllers/contactController.js";

const router = express.Router();

// Auth routes
router.post("/signUp", signUp);
router.post("/login", login);

// Contact route
router.post("/contact", saveContact);

export default router;
