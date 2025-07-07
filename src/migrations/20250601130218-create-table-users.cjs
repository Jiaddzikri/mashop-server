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
		await queryInterface.createTable("users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			username: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			password_hash: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			full_name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			phone_number: {
				allowNull: true,
				type: Sequelize.STRING,
			},
			profile_picture_url: {
				allowNull: true,
				type: Sequelize.STRING,
			},
			default_shipping_address_id: {
				allowNull: true,
				type: Sequelize.INTEGER,
			},
			default_billing_address_id: {
				allowNull: true,
				type: Sequelize.INTEGER,
			},
			created_at: {
				allowNull: true,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updated_at: {
				allowNull: true,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
		await queryInterface.dropTable("users");
	},
};
