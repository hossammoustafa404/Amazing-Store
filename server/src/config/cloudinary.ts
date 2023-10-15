import * as Cloudinary from "cloudinary";
import config from "./config";

const cloudinary = Cloudinary.v2;

/**
 * Cloudinary Config
 */
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

export default cloudinary;
