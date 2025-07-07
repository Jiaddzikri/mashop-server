import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class ProductAttribute extends Model {
		static associate(models) {
			ProductAttribute.hasMany(models.ProductAttributeValue, {
				foreignKey: "attribute_id",
				as: "values",
			});
		}
	}

	ProductAttribute.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					name: "unique_attribute_name",
					msg: "Nama atribut sudah ada.",
				},
			},
		},
		{
			sequelize,
			modelName: "ProductAttribute",
			tableName: "product_attributes",
			timestamps: false,
		}
	);

	return ProductAttribute;
};
