import Contact from "../models/contactModel.js";

export const saveContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newMessage = await Contact.create({ name, email, subject, message });

    return res.status(201).json({
      success: true,
      message: "Message stored successfully",
      data: newMessage
    });
  } catch (error) {
    console.error("saveContact error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
