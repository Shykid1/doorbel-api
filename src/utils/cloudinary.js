import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Base Folder for Cloudinary uploads
const baseFolder = "doorbel-assets";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: baseFolder,
    allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
    use_filename: true,
    resource_type: "auto",
  },
});

// Create multer upload instance
const upload = multer({ storage: storage });

// Promisify multer upload
const uploadPromise = (req, res) => {
  return new Promise((resolve, reject) => {
    upload.single("image")(req, res, (err) => {
      if (err) reject(err);
      else resolve(req.file);
    });
  });
};

// Async function to handle image upload
const uploadImage = async (req, res) => {
  try {
    const file = await uploadPromise(req, res);

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // File uploaded successfully
    return res.status(200).json({
      message: "File uploaded successfully",
      imageUrl: file.path,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export default uploadImage;
