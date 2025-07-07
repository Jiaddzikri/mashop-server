import { StatusCodes } from "http-status-codes";
import {
	createProductAttribute as createProductAttributeService,
	findProductAttribute as findProductAttributeService,
} from "../services/productAttributeService.js";

export const createProductAttributeController = async (req, res) => {
	try {
		const { name } = req.body;
		const response = await createProductAttributeService({ name });

		return res.status(StatusCodes.CREATED).json({
			message: response,
		});
	} catch (err) {
		return res.status(err.status).json({
			message: err.message,
		});
	}
};

export const findProductAttributeController = async (req, res) => {
	try {
		const response = await findProductAttributeService();

		return res.status(StatusCodes.OK).json({
			message: "product attribute found",
			data: response,
		});
	} catch (error) {
		return res.status(error.status).json({
			message: error.message,
		});
	}
};
