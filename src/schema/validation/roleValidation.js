import Joi from "joi";

export const createRoleValidation = () => {
	return Joi.object({
		name: Joi.string().required(),
	});
};
