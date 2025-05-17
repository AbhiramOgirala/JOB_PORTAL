import app from "./app.js";
import cloudinary from "cloudinary";
import { config } from "dotenv";

// Configure dotenv
config({ path: "./config/config.env" });

// Configure cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Log environment variables (without sensitive data) to verify they're loaded
console.log("Environment Configuration:");
console.log("PORT:", process.env.PORT);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("JWT_EXPIRE:", process.env.JWT_EXPIRE);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
