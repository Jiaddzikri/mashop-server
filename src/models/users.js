import { Model, DataTypes } from "sequelize"; // DataTypes diimpor di sini untuk kejelasan
import bcrypt from "bcryptjs";

export default (sequelize) => {
	class User extends Model {
		async validPassword(password) {
			return bcrypt.compare(password, this.password_hash);
		}

		static associate(models) {
			User.hasMany(models.Address, {
				foreignKey: "user_id",
				as: "addresses",
			});

			User.belongsTo(models.Address, {
				foreignKey: "default_shipping_address_id",
				as: "defaultShippingAddress",
				constraints: false,
			});

			User.belongsTo(models.Address, {
				foreignKey: "default_billing_address_id",
				as: "defaultBillingAddress",
				constraints: false,
			});
			User.hasMany(models.Order, {
				foreignKey: "user_id",
				as: "orders",
			});

			User.hasMany(models.ProductReview, {
				foreignKey: "user_id",
				as: "reviews",
			});

			// User.hasOne(models.Wishlist, {
			// 	foreignKey: "user_id",
			// 	as: "wishlist",
			// });

			// // User memiliki banyak Notifikasi
			// User.hasMany(models.Notification, {
			// 	foreignKey: "user_id",
			// 	as: "notifications",
			// });
			User.belongsToMany(models.Role, {
				through: models.UserRole,
				foreignKey: "user_id",
				otherKey: "role_id",
				as: "roles",
			});

			User.hasOne(models.Seller, {
				foreignKey: "user_id",
				as: "seller",
			});
		}
	}

	User.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					name: "unique_username",
					msg: "Username sudah digunakan.",
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: true,
				unique: {
					name: "unique_email",
					msg: "Email sudah terdaftar.",
				},
				validate: {
					isEmail: {
						msg: "Format email tidak valid.",
					},
				},
			},
			password_hash: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			full_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phone_number: {
				type: DataTypes.STRING,
				allowNull: true,
				unique: {
					name: "unique_phone_number",
					msg: "Nomor telepon sudah digunakan.",
				},
			},
			profile_picture_url: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			default_shipping_address_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: "Addresses", // Nama tabel
					key: "address_id",
				},
			},
			default_billing_address_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: "Addresses",
					key: "address_id",
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			tableName: "users",
			timestamps: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
			hooks: {
				beforeCreate: async (user) => {
					if (user.password_hash) {
						const salt = await bcrypt.genSalt(10);
						user.password_hash = await bcrypt.hash(user.password_hash, salt);
					}
				},
				beforeUpdate: async (user) => {
					if (user.changed("password_hash") && user.password_hash) {
						const salt = await bcrypt.genSalt(10);
						user.password_hash = await bcrypt.hash(user.password_hash, salt);
					}
				},
			},
		}
	);

	return User;
};
