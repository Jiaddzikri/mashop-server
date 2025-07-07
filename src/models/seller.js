import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
	class Seller extends Model {
		static associate(models) {
			Seller.belongsTo(models.User, {
				foreignKey: 'user_id',
				allowNull: false,
				as: 'user',
			});
		}

		static associate(models) {
			Seller.hasMany(models.Product, {
				foreignKey: 'seller_id',
				allowNull: false,
				as: 'products',
			});
		}

		static associate(models) {
			Seller.hasMany(models.SellerAddress, {
				foreignKey: 'seller_id',
				as: 'addresses',
			});
		}

		static associate(models) {
			Seller.hasOne(models.SellerAddress, {
				foreignKey: 'seller_id',
				as: 'address',
			});
		}
	}

	Seller.init(
		{
			id: {
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				type: DataTypes.INTEGER,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'User',
					as: 'user',
				},
				onDelete: 'cascade',
				onUpdate: 'cascade',
			},
			store_name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			slug: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			store_description: {
				allowNull: true,
				type: DataTypes.TEXT,
			},
			status: {
				allowNull: true,
				type: DataTypes.ENUM('pending', 'rejected', 'approved', 'suspended'),
				defaultValue: 'pending',
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: 'Seller',
			tableName: 'sellers',
			timestamps: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		}
	);
	return Seller;
};
