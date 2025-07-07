"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("order_items", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			order_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "orders",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "products",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "RESTRICT",
			},
			variant_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: "product_variants",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "RESTRICT",
			},
			quantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
			price_per_unit: {
				type: Sequelize.DECIMAL,
				allowNull: false,
			},
			total_price: {
				type: Sequelize.DECIMAL,
				allowNull: false,
			},
		});

		await queryInterface.addIndex("order_items", ["order_id"]);
		await queryInterface.addIndex("order_items", ["product_id"]);
		await queryInterface.addIndex("order_items", ["variant_id"]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("order_items");
	},
};
