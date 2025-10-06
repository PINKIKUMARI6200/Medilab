import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  mobile: { type: String, default: "" }, // string better for phone numbers
  image: { type: String, default: "" },
  isAdmin: { type: Boolean, default: false }, // false = user, true = admin
  password: { type: String, default: "" },
  token: { type: String, default: "" },
  loginTime: { type: Number, default: 0 },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
