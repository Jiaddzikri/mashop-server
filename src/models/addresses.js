import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class Address extends Model {
		static associate(models) {
			Address.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user",
				allowNull: false,
			});

			Address.hasMany(models.Order, {
				foreignKey: "shipping_address_id",
				as: "shippingOrders",
			});

			Address.hasMany(models.Order, {
				foreignKey: "billing_address_id",
				as: "billingOrders",
			});
		}
	}

	Address.init(
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
				references: {
					model: "Users",
					key: "id",
				},
			},
			address_line: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			city: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			province: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			postal_code: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			country: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			is_shipping_address: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{
			sequelize,
			modelName: "Address",
			tableName: "addresses",
			timestamps: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);

	return Address;
};
