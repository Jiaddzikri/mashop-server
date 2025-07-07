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
		await queryInterface.createTable("product_variant_values", {
			variant_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "product_variants",
					key: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			},
			value_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "product_attribute_values",
					key: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
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
		await queryInterface.dropTable("product_variant_values");
	},
};
