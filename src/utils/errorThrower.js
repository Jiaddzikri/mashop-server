import { StatusCodes } from "http-status-codes";
import BaseError from "../exception/BaseError.js";

const errorThrower = (error) => {
	if (error instanceof BaseError) {
		throw error;
	}
	throw new BaseError({
		status: StatusCodes.INTERNAL_SERVER_ERROR,
		message: `an internal server error`,
	});
};
export default errorThrower;
