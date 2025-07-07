import { StatusCodes } from "http-status-codes";
import BaseError from "../exception/BaseError.js";
import errorThrower from "../utils/errorThrower.js";
import db from "./../models/index.js";

const { Category } = db;

export const createCategory = async ({
	parent_category_id,
	name,
	description,
}) => {
	try {
		const form = {
			parent_category_id:
				typeof parent_category_id === "number" ? parent_category_id : null,
			name: name.toLowerCase(),
			description:
				typeof description === "string" ? description.toLowerCase() : null,
		};
		const findCategory = await Category.findOne({ where: { name: form.name } });

		if (findCategory) {
			throw new BaseError({
				status: StatusCodes.BAD_REQUEST,
				message: "category already available",
			});
		}

		return await db.sequelize.transaction(async () => {
			return await Category.create({
				parent_category_id: form.parent_category_id,
				name: form.name,
				description: form.description,
			});
		});
	} catch (err) {
		console.log(err);
		errorThrower(err);
	}
};

export const findCategory = async () => {
	try {
		const allCategories = await Category.findAll({
			order: [["name", "ASC"]], // Urutkan berdasarkan nama
		});

		if (!allCategories) {
			throw new BaseError({
				status: StatusCodes.NOT_FOUND,
				message: "categories not found",
			});
		}

		const categoryMap = {};
		const categoryTree = [];

		for (const category of allCategories) {
			const categoryJSON = category.toJSON();
			categoryJSON.subCategories = [];
			categoryMap[categoryJSON.id] = categoryJSON;
		}

		for (const categoryId in categoryMap) {
			const category = categoryMap[categoryId];
			const parentId = category.parent_category_id;

			if (parentId) {
				const parent = categoryMap[parentId];
				if (parent) {
					parent.subCategories.push(category);
				}
			} else {
				categoryTree.push(category);
			}
		}

		return categoryTree;
	} catch (error) {
		errorThrower(error);
	}
};
