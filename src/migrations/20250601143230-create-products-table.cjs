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
		await queryInterface.createTable("products", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			seller_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "users",
					key: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			},
			category_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "categories",
					key: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			slug: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			price: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			sku: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			stock_quantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: Sequelize.literal(0),
			},
			weight: {
				type: Sequelize.DECIMAL,
				allowNull: true,
			},
			dimensions: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
			},
			is_deleted: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');z
		 */
		await queryInterface.dropTable("products");
	},
};
