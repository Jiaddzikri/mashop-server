import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class ShippingMethod extends Model {
		static associate(models) {
			ShippingMethod.hasMany(models.Order, {
				foreignKey: "shipping_method_id",
				as: "orders",
			});
		}
	}
	ShippingMethod.init(
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
				unique: true,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			cost: {
				type: DataTypes.DECIMAL,
				allowNull: true,
			},
			is_active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{
			sequelize,
			modelName: "ShippingMethod",
			tableName: "shipping_methods",
			timestamps: true,
			updatedAt: "updated_at",
			createdAt: "created_at",
		}
	);
	return ShippingMethod;
};
