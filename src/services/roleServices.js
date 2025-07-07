import errorThrower from "../utils/errorThrower.js";
import db from "../models/index.js";
import BaseError from "../exception/BaseError.js";
import { StatusCodes } from "http-status-codes";

const { Role } = db;

export const createRole = async ({ name }) => {
	try {
		const form = {
			name: name.toLowerCase(),
		};

		if (
			await Role.findOne({
				where: {
					name: form.name,
				},
			})
		) {
			throw new BaseError({
				status: StatusCodes.BAD_REQUEST,
				message: "role already available",
			});
		}
		return await db.sequelize.transaction(async () => {
			const role = await Role.create({
				name: form.name,
			});
			return role;
		});
	} catch (err) {
		console.log(err.message);
		errorThrower(err);
	}
};
