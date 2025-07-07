import { Sequelize } from "sequelize";
import * as fs from "fs";

import defineUserModel from "./users.js";
import defineAddressModel from "./addresses.js";
import defineRoleModel from "./role.js";
import defineUserRole from "./user-role.js";
import defineCategoriesModel from "./categories.js";
import defineProductModel from "./products.js";
import defineProductAttributesModel from "./product-attributes.js";
import defineProductAttributeValuesModel from "./product-attribute-values.js";
import defineProductVariantModel from "./product-variants.js";
import defineProductVariantValuesModel from "./product-variant-values.js";
import defineShippingMethodModel from "./shipping-method.js";
import defineOrderModel from "./orders.js";
import defineOrderItemModel from "./order-items.js";
import definePaymentMethodModel from "./payment-method.js";
import definePaymentModel from "./payment.js";
import defineProductImageModel from "./product-images.js";
import defineProductReviewModel from "./product-review.js";
import defineSellerModel from "./seller.js";
import defineSellerAddressModel from "./seller-addresses.js";

const configJson = fs.readFileSync("src/config/config.json");
const env = process.env.NODE_ENV || "development";
const config = JSON.parse(configJson)[env];

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

const db = {};

const modelsToDefine = [
	defineUserModel,
	defineAddressModel,
	defineRoleModel,
	defineUserRole,
	defineCategoriesModel,
	defineProductModel,
	defineProductAttributesModel,
	defineProductAttributeValuesModel,
	defineProductVariantModel,
	defineProductVariantValuesModel,
	defineShippingMethodModel,
	defineOrderModel,
	defineOrderItemModel,
	definePaymentMethodModel,
	definePaymentModel,
	defineProductImageModel,
	defineProductReviewModel,
	defineSellerModel,
	defineSellerAddressModel,
];

modelsToDefine.forEach((defineModel) => {
	const model = defineModel(sequelize, Sequelize.DataTypes);
	db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
