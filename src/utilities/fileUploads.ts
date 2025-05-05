import { v2 as cloudinary } from 'cloudinary';
import multer, { Multer } from 'multer';
import fs from 'fs';
import path from 'path';
import { Request } from 'express';

// Type for file with Multer
export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer storage config - now with two destinations
const storage = multer.diskStorage({
  destination: (req: Request, file: MulterFile, cb: (error: Error | null, destination: string) => void) => {
    // Create both temp upload dir and profileImage dir
    const uploadDir = 'tmp/uploads';
    const profileImageDir = 'src/profileImages';

    fs.mkdirSync(uploadDir, { recursive: true });
    fs.mkdirSync(profileImageDir, { recursive: true });

    cb(null, uploadDir);
  },
  filename: (req: Request, file: MulterFile, cb: (error: Error | null, filename: string) => void) => {
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, filename);
  }
});

// Configure multer
export const upload: Multer = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
    fieldSize: 50 * 1024 * 1024
  },
  fileFilter: (req: Request, file: MulterFile, cb: multer.FileFilterCallback) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (validTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, or GIF images are allowed'));
    }
  }
});

// Upload to Cloudinary and local folder, return both URLs
export const uploadImage = async (filePath: string, userId: string) => {
  try {
    // 1. Upload to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(filePath, {
      folder: `user-profiles/${userId}`,
      public_id: `profile-${Date.now()}`,
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
      resource_type: 'auto'
    });

    const cloudinaryUrl = cloudinaryResult.secure_url;

    // 2. Save to local profileImages folder
    const ext = path.extname(filePath);
    const localFilename = `profile-${userId}-${Date.now()}${ext}`;
    const localDestination = path.join('src', 'profileImages', localFilename);

    // Copy the file to the profileImages folder
    fs.copyFileSync(filePath, localDestination);

    // Create the URL for the local file (adjust based on your server config)
    const localUrl = `/profileImages/${localFilename}`;

    return { cloudinaryUrl, localUrl };

  } finally {
    // Always clean up the temp file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

export default upload;