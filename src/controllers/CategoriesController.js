import { StatusCodes } from "http-status-codes";
import {
	createCategory as createCategoryService,
	findCategory as findCategoryService,
} from "../services/categoryService.js";

export const createCategoryController = async (req, res) => {
	try {
		const { parent_category_id, name, description } = req.body;

		const response = await createCategoryService({
			parent_category_id,
			name,
			description,
		});

		return res.status(StatusCodes.CREATED).json({
			message: "category successfuly created",
			data: response,
		});
	} catch (err) {
		return res.status(err.status).json({
			message: err.message,
		});
	}
};

export const findCategoryController = async (req, res) => {
	try {
		const response = await findCategoryService();

		return res.status(StatusCodes.OK).json({
			message: "categories found",
			data: response,
		});
	} catch (err) {
		return res.status(err.status).json({
			message: err.message,
		});
	}
};
