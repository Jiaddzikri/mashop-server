import { StatusCodes } from "http-status-codes";
import { createRole as createRoleService } from "../services/roleServices.js";

export const createRoleController = async (req, res) => {
	try {
		const { name } = req.body;
		const response = await createRoleService({ name });
		return res.status(StatusCodes.CREATED).json({
			data: response,
			message: "role created",
		});
	} catch (error) {
		return res.status(error.status).json({
			message: error.message,
		});
	}
};
