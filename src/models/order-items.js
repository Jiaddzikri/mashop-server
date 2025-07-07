import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class OrderItem extends Model {
		static associate(models) {
			OrderItem.belongsTo(models.Order, {
				foreignKey: "order_id",
				as: "order",
			});
			OrderItem.belongsTo(models.Product, {
				foreignKey: "product_id",
				as: "product",
			});

			OrderItem.belongsTo(models.ProductVariant, {
				foreignKey: "variant_id",
				as: "variant",
				allowNull: true,
			});
		}
	}
	OrderItem.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			order_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Orders",
					key: "id",
				},
			},
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Products",
					key: "id",
				},
			},
			variant_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: "Product_Variants",
					key: "id",
				},
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
				validate: {
					min: 1,
				},
			},
			price_per_unit: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			total_price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "OrderItem",
			tableName: "order_items",
			timestamps: false,
		}
	);
	return OrderItem;
};
