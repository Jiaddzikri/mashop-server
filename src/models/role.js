import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class Role extends Model {
		static associate(models) {
			Role.belongsToMany(models.User, {
				through: models.UserRole,
				foreignKey: "role_id",
				otherKey: "user_id",
				as: "users",
			});
		}
	}

	Role.init(
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
					name: "unique_role_name",
					msg: "Nama peran sudah ada.",
				},
			},
		},
		{
			sequelize,
			modelName: "Role",
			tableName: "roles",
			timestamps: false,
		}
	);

	return Role;
};
