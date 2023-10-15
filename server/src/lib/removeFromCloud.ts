import cloudinary from "../config/cloudinary";

const removeFromCloud = async (files: string[]) => {
  for await (const file of files) {
    cloudinary.uploader.destroy(file);
  }
};

export default removeFromCloud;
