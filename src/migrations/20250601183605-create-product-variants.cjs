"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.createTable("product_variants", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "products",
					key: "id",
				},
				onUpdate: "cascade",
				onDelete: "cascade",
			},
			sku: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			price_modifier: {
				type: Sequelize.DECIMAL,
				allowNull: false,
			},
			stock_quantity: {
				type: Sequelize.INTEGER,
				defaultValue: Sequelize.literal(0),
			},
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.dropTable("product_variants");
	},
};
