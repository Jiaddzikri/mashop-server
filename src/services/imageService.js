import { StatusCodes } from "http-status-codes";
import BaseError from "../exception/BaseError.js";
import errorThrower from "../utils/errorThrower.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadImage = async ({ files }) => {
	try {
		if (!files || files.length === 0) {
			throw new BaseError({
				status: StatusCodes.BAD_REQUEST,
				message: "No files uploaded",
			});
		}

		const uploadPromises = files.map(async (file) => {
			const filePath = file.path.replace(/\\/g, "/");
			const mimeType = file.mimetype.split("/")[1];

			try {
				const result = await cloudinary.uploader.upload(filePath, {
					format: mimeType,
					resource_type: "auto",
					folder: "product_images",
				});
				return result.secure_url;
			} catch (error) {
				throw new BaseError({
					status: StatusCodes.INTERNAL_SERVER_ERROR,
					message: `Gagal mengunggah file ${
						file.originalname || file.filename
					}: ${error.message}`,
				});
			} finally {
				fs.unlinkSync(filePath);
			}
		});
		const imageUrls = await Promise.all(uploadPromises);

		return imageUrls;
	} catch (err) {
		errorThrower(err);
	}
};
