import Joi from "joi";

export const createProductAttributeValidation = () => {
	return Joi.object({
		name: Joi.string().required(),
	});
};

export const createProductAttributeValueValidation = () => {
	return Joi.object({
		attribute_id: Joi.number().required(),
		name: Joi.string().required(),
	});
};

export const createProductValidaton = () => {
	return Joi.object({
		seller_id: Joi.number().required(),
		category_id: Joi.number().required(),
		name: Joi.string().required(),
		price: Joi.number().required(),
		description: Joi.string().required(),
		sku: Joi.allow(),
		stock_quantity: Joi.number().required(),
		weight: Joi.number().required(),
		dimensions: Joi.string().required(),
		variants: Joi.array().allow(),
		images: Joi.array().items(
			Joi.object({
				url: Joi.string().required(),
				is_thumbnail: Joi.boolean().default(false),
			})
		),
	});
};
