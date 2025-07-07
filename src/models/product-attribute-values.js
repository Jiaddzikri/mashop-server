import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class ProductAttributeValue extends Model {
		static associate(models) {
			ProductAttributeValue.belongsTo(models.ProductAttribute, {
				foreignKey: "attribute_id",
				as: "attribute",
			});

			ProductAttributeValue.belongsToMany(models.ProductVariant, {
				through: models.ProductVariantValue,
				foreignKey: "value_id",
				otherKey: "variant_id",
				as: "variants",
			});
		}
	}

	ProductAttributeValue.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			attribute_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "ProductAttribute",
					key: "id",
				},
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "ProductAttributeValue",
			tableName: "product_attribute_values",
			timestamps: false,
			indexes: [
				{
					unique: true,
					fields: ["attribute_id", "value"],
					name: "unique_attribute_value_combination",
				},
			],
		}
	);

	return ProductAttributeValue;
};
