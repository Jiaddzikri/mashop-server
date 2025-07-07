import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class Payment extends Model {
		static associate(models) {
			Payment.belongsTo(models.Order, {
				foreignKey: "order_id",
				as: "order",
			});

			Payment.belongsTo(models.PaymentMethod, {
				foreignKey: "payment_method_id",
				as: "paymentMethod",
			});
		}
	}
	Payment.init(
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
			payment_method_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Payment_Methods",
					key: "id",
				},
			},
			payment_date: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
			amount: {
				type: DataTypes.DECIMAL,
				allowNull: false,
			},
			transaction_id: {
				type: DataTypes.STRING,
				allowNull: true,
				unique: true,
			},
			payment_status: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "pending",
			},
			payment_details: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "Payment",
			tableName: "payments",
			timestamps: true,
		}
	);
	return Payment;
};
