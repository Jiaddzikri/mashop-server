import { StatusCodes } from "http-status-codes";
import { uploadImage as uploadImageService } from "../services/imageService.js";

export const postImageController = async (req, res) => {
	try {
		const { files } = req;

		const response = await uploadImageService({ files });

		return res.status(StatusCodes.OK).json({
			message: "Image uploaded successfully",
			data: response,
		});
	} catch (error) {
		return res.status(error.status).json({ message: error.message });
	}
};
