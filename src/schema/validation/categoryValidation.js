import Joi from "joi";

export const createCategoriesValidation = () => {
	return Joi.object({
		parent_category_id: Joi.any().optional(),
		name: Joi.string().required(),
		description: Joi.string().allow(),
	});
};
