import express from "express";
import validateRequest from "../../utils/validateRequest.js";
import {
	createProductAttributeValidation,
	createProductAttributeValueValidation,
	createProductValidaton,
} from "../../schema/validation/productValidation.js";
import {
	createProductAttributeController,
	findProductAttributeController,
} from "../../controllers/ProductAttributeController.js";
import { createProductAttributeValueController } from "../../controllers/ProductAttributeValueController.js";
import {
	createProductController,
	findProductController,
	getProductDetailController,
} from "../../controllers/ProductController.js";

const productRoutes = express.Router();

productRoutes.post(
	"/attribute",
	validateRequest(createProductAttributeValidation()),
	createProductAttributeController
);

productRoutes.get("/attribute", findProductAttributeController);

productRoutes.post(
	"/attribute-value",
	validateRequest(createProductAttributeValueValidation()),
	createProductAttributeValueController
);

productRoutes.post(
	"/",
	validateRequest(createProductValidaton()),
	createProductController
);

productRoutes.get("/:productId/details", getProductDetailController);

productRoutes.get("/", findProductController);

export default productRoutes;
