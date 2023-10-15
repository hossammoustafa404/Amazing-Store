import cloudinary from "../config/cloudinary";
import * as fs from "fs";

const removeFileFromUploads = (file: string) => {
  fs.unlinkSync(file);
};

const uploadToCloud = async (files: any) => {
  let filesUrls = [];

  for await (const file of files) {
    const result = await cloudinary.uploader.upload(file.path, {
      upload_preset: "amazing_store",
    });
    filesUrls.push(result.secure_url);

    removeFileFromUploads(file.path);
  }

  return filesUrls;
};

export default uploadToCloud;
