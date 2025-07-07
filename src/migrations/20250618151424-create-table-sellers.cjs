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

		await queryInterface.createTable("sellers", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "users",
					key: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			},
			store_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			slug: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			store_description: {
				type: Sequelize.STRING,
				allowNull: true,
				defaultValue: null,
			},
			store_address: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			status: {
				type: Sequelize.ENUM("pending", "approved", "rejected", "suspended"),
				allowNull: true,
				defaultValue: "pending",
			},
			is_deleted: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
				AllowNull: false,
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
		await queryInterface.dropTable("sellers");
	},
};
