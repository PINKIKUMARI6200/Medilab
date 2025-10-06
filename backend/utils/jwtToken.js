import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const jwtTokenSign = async (id) => {
  try {
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ id }, secretKey, { expiresIn: "1d" });
    const decoded = jwt.verify(token, secretKey);

    await User.findByIdAndUpdate(id, {
      token,
      loginTime: decoded.iat
    }, { new: true });

    return { token, decoded };
  } catch (error) {
    console.error("jwtTokenSign error:", error);
    throw error;
  }
};

export default jwtTokenSign;
