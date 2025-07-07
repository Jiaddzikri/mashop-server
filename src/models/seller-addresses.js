import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
	class SellerAddress extends Model {
		static associate(models) {
			this.belongsTo(models.Seller, {
				foreignKey: 'seller_id',
				as: 'seller',
			});
		}
	}
	SellerAddress.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			seller_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Seller ID tidak boleh kosong',
					},
				},
			},
			location_name: {
				type: DataTypes.STRING(100),
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'Nama lokasi tidak boleh kosong',
					},
				},
			},

			phone_number: {
				type: DataTypes.STRING(20),
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'Nomor telepon tidak boleh kosong',
					},
				},
			},
			address_line: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'Baris alamat tidak boleh kosong',
					},
				},
			},
			city: {
				type: DataTypes.STRING(100),
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'Kota tidak boleh kosong',
					},
				},
			},
			province: {
				type: DataTypes.STRING(100),
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'Provinsi tidak boleh kosong',
					},
				},
			},
			postal_code: {
				type: DataTypes.STRING(10),
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'Kode pos tidak boleh kosong',
					},
				},
			},
			operating_hours: DataTypes.STRING,
			is_pickup_point: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: 'SellerAddress',
			tableName: 'seller_addresses',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		}
	);
	return SellerAddress;
};
