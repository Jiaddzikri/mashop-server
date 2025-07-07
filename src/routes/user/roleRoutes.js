import express from "express";
import validateRequest from "../../utils/validateRequest.js";
import { createRoleValidation } from "../../schema/validation/roleValidation.js";
import { createRoleController } from "../../controllers/RoleController.js";

const roleRoutes = express.Router();

roleRoutes.post(
	"/",
	validateRequest(createRoleValidation(), { presence: "required" }),
	createRoleController
);

export default roleRoutes;
