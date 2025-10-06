import fs from "fs";
import path from "path";

export const imageUpload = (file, folder = "users") => {
  const fileExt = file.name.split(".").pop().toLowerCase();
  const allowed = ["jpg", "jpeg", "png", "gif"];
  if (!allowed.includes(fileExt)) throw new Error("Invalid image type");

  const randomString = Math.random().toString(36).substring(2, 30);
  const fileName = `${randomString}.${fileExt}`;

  const dir = path.join(process.cwd(), "public", "images", folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // Save file (express-fileupload provides mv)
  file.mv(path.join(dir, fileName));
  return fileName;
};
