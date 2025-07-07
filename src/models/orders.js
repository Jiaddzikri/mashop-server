import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class Order extends Model {
		static associate(models) {
			Order.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user",
			});
			Order.belongsTo(models.Address, {
				foreignKey: "shipping_address_id",
				as: "shippingAddress",
			});
			Order.belongsTo(models.Address, {
				foreignKey: "billing_address_id",
				as: "billingAddress",
			});
			Order.belongsTo(models.ShippingMethod, {
				foreignKey: "shipping_method_id",
				as: "shippingMethod",
			});
			Order.hasMany(models.OrderItem, {
				foreignKey: "order_id",
				as: "orderItems",
			});
			Order.hasMany(models.Payment, {
				foreignKey: "order_id",
				as: "payments",
			});
		}
	}
	Order.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			shipping_address_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			billing_address_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			order_date: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
			total_amount: {
				type: DataTypes.DECIMAL,
				allowNull: false,
			},
			shipping_cost: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0.0,
			},
			discount_amount: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0.0,
			},
			final_amount: {
				type: DataTypes.DECIMAL,
				allowNull: false,
			},
			order_status: {
				type: DataTypes.ENUM,

				allowNull: false,
				defaultValue: "pending",
				values: ["pending", "processing", "shipped", "delivered", "cancelled"],
			},
			payment_status: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "unpaid",
			},
			shipping_method_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			tracking_number: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			notes: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "Order",
			tableName: "orders",
			timestamps: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return Order;
};
