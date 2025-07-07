import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class ProductImage extends Model {
		static associate(models) {
			ProductImage.belongsTo(models.Product, {
				foreignKey: "product_id",
				as: "product",
			});

			ProductImage.hasMany(models.ProductVariant, {
				foreignKey: "image_id",
				as: "variantsUsingThisImage",
			});
		}
	}
	ProductImage.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Products",
					key: "id",
				},
			},
			image_url: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			alt_text: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			is_thumbnail: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			display_order: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			modelName: "ProductImage",
			tableName: "product_images",
			timestamps: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return ProductImage;
};
