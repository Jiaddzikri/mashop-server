import { StatusCodes } from "http-status-codes";

class BaseError extends Error {
	status;
	constructor(params) {
		super(params?.message);
		this.status = params?.status || StatusCodes.INTERNAL_SERVER_ERROR;
	}
}
export default BaseError;
