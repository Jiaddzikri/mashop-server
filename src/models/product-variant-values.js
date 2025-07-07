import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class ProductVariantValue extends Model {
		static associate(models) {
			ProductVariantValue.belongsTo(models.ProductVariant, {
				foreignKey: "variant_id",
				as: "variant",
			});
			ProductVariantValue.belongsTo(models.ProductAttributeValue, {
				foreignKey: "value_id",
				as: "attributeValue",
			});
		}
	}

	ProductVariantValue.init(
		{
			variant_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				references: {
					model: "Product_Variants",
					key: "id",
				},
			},
			value_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				references: {
					model: "Product_Attribute_Values",
					key: "id",
				},
			},
		},
		{
			sequelize,
			modelName: "ProductVariantValue",
			tableName: "product_variant_values",
			timestamps: false,
		}
	);

	return ProductVariantValue;
};
