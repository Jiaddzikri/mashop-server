"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("seller_addresses", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			seller_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "sellers",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			location_name: {
				type: Sequelize.STRING(100),
				allowNull: false,
				comment: "Nama lokasi, misal: Gudang Utama, Toko Cabang Bandung",
			},
			phone_number: {
				type: Sequelize.STRING(20),
				allowNull: false,
			},
			address_line: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			city: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			province: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			postal_code: {
				type: Sequelize.STRING(10),
				allowNull: false,
			},
			operating_hours: {
				type: Sequelize.STRING,
				allowNull: true,
				comment: "Contoh: Senin-Jumat 09:00-17:00",
			},
			is_pickup_point: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("seller_addresses");
	},
};
