import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class ProductReview extends Model {
		static associate(models) {
			ProductReview.belongsTo(models.Product, {
				foreignKey: "product_id",
				as: "product",
			});

			ProductReview.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user",
			});
		}
	}
	ProductReview.init(
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
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
				},
			},
			rating: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 1,
					max: 5,
				},
			},
			comment: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "ProductReview",
			tableName: "product_reviews",
			timestamps: true,
			indexes: [
				{
					unique: true,
					fields: ["product_id", "user_id"],
					name: "unique_product_user_review",
				},
			],
		}
	);
	return ProductReview;
};
