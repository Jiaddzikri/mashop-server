import { StatusCodes } from "http-status-codes";
import { createProductAttributeValues as createProductAttributeValueService } from "../services/productAttributeValueService.js";

export const createProductAttributeValueController = async (req, res) => {
	try {
		const { attribute_id, name } = req.body;

		const response = await createProductAttributeValueService({
			attribute_id,
			name,
		});

		return res.status(StatusCodes.CREATED).json({
			message: `attribute values succesfully created`,
			data: response,
		});
	} catch (error) {
		return res.status(error.status).json({
			message: error.message,
		});
	}
};
