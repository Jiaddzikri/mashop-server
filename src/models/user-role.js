import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class UserRole extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 *
		 * Asosiasi utama (belongsToMany) sudah didefinisikan di model User dan Role.
		 * Namun, Anda bisa menambahkan belongsTo ke User dan Role di sini
		 * jika Anda perlu melakukan query langsung ke tabel UserRole dan ingin
		 * menyertakan data User atau Role terkait dengan mudah.
		 */
		static associate(models) {
			UserRole.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user",
			});
			UserRole.belongsTo(models.Role, {
				foreignKey: "role_id",
				as: "role",
			});
		}
	}

	UserRole.init(
		{
			user_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
				},
			},
			role_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				references: {
					model: "Roles",
					key: "id",
				},
			},
		},
		{
			sequelize,
			modelName: "UserRole",
			tableName: "user_roles",
			timestamps: false,
		}
	);

	return UserRole;
};
