import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import connectionDb from "./connection/db.connect.js";
import router from "./routes/userRouter.js";
import fileUpload from "express-fileupload";
import cors from "cors";

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

// --------------------
// Middleware setup
// --------------------
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// --------------------
// Database Connection
// --------------------
connectionDb();

// --------------------
// Serve static files
// --------------------
app.use("/images", express.static(path.join(__dirname, "public/images")));

// --------------------
// Routes
// --------------------
app.use("/", router);

// --------------------
// Error handling middleware
// --------------------
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({ status: 500, message: "Internal Server Error" });
});

// --------------------
// Start Server
// --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${process.env.BASE_URL || `http://localhost:${PORT}`}`);
});
