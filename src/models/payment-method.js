import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class PaymentMethod extends Model {
		static associate(models) {
			PaymentMethod.hasMany(models.Payment, {
				foreignKey: "payment_method_id",
				as: "payments",
			});
		}
	}
	PaymentMethod.init(
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

			// code: { // Kode unik untuk integrasi, misal "bank_transfer_bca", "gopay_qr"
			//   type: DataTypes.STRING,
			//   allowNull: false,
			//   unique: true
			// },
			// logo_url: { // URL logo metode pembayaran
			//   type: DataTypes.STRING,
			//   allowNull: true
			// },
			// instructions: {
			//  type: DataTypes.TEXT,
			//  allowNull: true
			// },
			is_active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			// createdAt dan updatedAt otomatis ditangani oleh Sequelize jika timestamps: true
		},
		{
			sequelize,
			modelName: "PaymentMethod",
			tableName: "payment_methods",
			timestamps: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return PaymentMethod;
};
