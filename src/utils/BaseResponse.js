import { StatusCodes } from "http-status-codes";
import BaseError from "../exception/BaseError.js";
import util from "node:util";

export const BaseErrorResponse = ({ res, error }) => {
	console.log(JSON.stringify(error));
	if (error instanceof BaseError) {
		return res.status(res.status).json({
			message: res.message,
		});
	}
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		message: `an internal server error`,
	});
};
