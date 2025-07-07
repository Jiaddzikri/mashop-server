import express from "express";
import validateRequest from "./../../utils/validateRequest.js";
import { createCategoriesValidation } from "../../schema/validation/categoryValidation.js";
import {
	createCategoryController,
	findCategoryController,
} from "../../controllers/CategoriesController.js";

const categoryRoutes = express.Router();

categoryRoutes.post(
	"/",
	validateRequest(createCategoriesValidation()),
	createCategoryController
);

categoryRoutes.get("/", findCategoryController);

export default categoryRoutes;
