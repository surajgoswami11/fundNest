const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file from memory buffer to Cloudinary
const uploadOnCloudinary = async (filebuffer, folderName = "profiles") => {
  try {
    if (!filebuffer) return null;

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: folderName,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(filebuffer).pipe(stream);
    });

    return result;
  } catch (error) {
    console.log("Cloudinary upload error:", error);
    return null;
  }
};

// mutliple upload
const uploadMultipleImage = async (files, folderName = "fund") => {
  try {
    const uploadedUrls = [];
    for (const file of files) {
      const result = await uploadOnCloudinary(file.buffer, folderName);
      if (result?.secure_url) {
        uploadedUrls.push(result.secure_url);
      }
    }

    return uploadedUrls;
  } catch (error) {
    console.error("Multiple upload error:", error);
    return [];
  }
};
module.exports = { uploadOnCloudinary, uploadMultipleImage };
