import errorThrower from "../utils/errorThrower.js";
import db from "../models/index.js";
import BaseError from "../exception/BaseError.js";
import { StatusCodes } from "http-status-codes";

const { ProductAttribute, ProductAttributeValue } = db;

export const createProductAttributeValues = async ({ attribute_id, name }) => {
	try {
		const form = {
			attribute_id,
			name: name.toLowerCase(),
		};

		const [findAttribute, findAttributeValues] = await Promise.all([
			await ProductAttribute.findOne({
				where: {
					id: form.attribute_id,
				},
			}),
			await ProductAttributeValue.findOne({ where: { name: form.name } }),
		]);

		if (!findAttribute) {
			throw new BaseError({
				status: StatusCodes.BAD_REQUEST,
				message: "product attribute not found",
			});
		}

		if (findAttributeValues) {
			throw new BaseError({
				status: StatusCodes.BAD_REQUEST,
				message: "product attribute values already available",
			});
		}

		return await db.sequelize.transaction(async () => {
			return await ProductAttributeValue.create(form);
		});
	} catch (err) {
		errorThrower(err);
	}
};
