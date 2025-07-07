import errorThrower from "../utils/errorThrower.js";
import db from "../models/index.js";
import BaseError from "../exception/BaseError.js";
import { StatusCodes } from "http-status-codes";

const { ProductAttribute, ProductAttributeValue } = db;

export const createProductAttribute = async ({ name }) => {
	try {
		const form = {
			name: name.toLowerCase(),
		};
		const findProductAttribute = await ProductAttribute.findOne({
			where: {
				name: form.name,
			},
		});

		if (findProductAttribute) {
			throw new BaseError({
				status: StatusCodes.BAD_REQUEST,
				message: "attribute already available",
			});
		}

		return await db.sequelize.transaction(async () => {
			const createProductAttribute = await ProductAttribute.create(form);

			return createProductAttribute;
		});
	} catch (err) {
		errorThrower(err);
	}
};

export const findProductAttribute = async () => {
	try {
		const allProductAttributes = await ProductAttribute.findAll({
			order: [["name", "ASC"]],

			include: [
				{
					model: ProductAttributeValue,
					as: "values",
				},
			],
		});

		return allProductAttributes;
	} catch (err) {
		console.log(err);
		errorThrower(err);
	}
};
