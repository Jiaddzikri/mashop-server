import { StatusCodes } from "http-status-codes";
import BaseError from "../exception/BaseError.js";

export default function validateRequest(schema, options) {
	return async (req, res, next) => {
		try {
			if (!req.body) {
				throw new BaseError({
					status: StatusCodes.BAD_REQUEST,
					message: "fields are required",
				});
			}
			await schema.validateAsync(req.body, {
				abortEarly: false,
				strict: false,
				...options,
			});
			next();
		} catch (error) {
			const errors = {};
			if (error.isJoi) {
				error.details.forEach((err) => {
					const field = err.path.join(".");
					errors[field] = err.message;
				});
			}

			return res.status(StatusCodes.BAD_REQUEST).json({
				message: Object.keys(errors).length == 0 ? error.message : errors,
			});
		}
	};
}
