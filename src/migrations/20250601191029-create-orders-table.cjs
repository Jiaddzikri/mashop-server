"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("orders", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			shipping_address_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "addresses",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "RESTRICT",
			},
			billing_address_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "addresses",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "RESTRICT",
			},
			order_date: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
			total_amount: {
				type: Sequelize.DECIMAL,
				allowNull: false,
			},
			shipping_cost: {
				type: Sequelize.DECIMAL,
				allowNull: false,
				defaultValue: 0.0,
			},
			discount_amount: {
				type: Sequelize.DECIMAL,
				allowNull: false,
				defaultValue: 0.0,
			},
			final_amount: {
				type: Sequelize.DECIMAL,
				allowNull: false,
			},
			order_status: {
				type: Sequelize.ENUM(
					"pending",
					"processing",
					"shipped",
					"delivered",
					"cancelled",
					"awaiting_payment"
				),
				allowNull: false,
				defaultValue: "pending",
			},
			payment_status: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: "unpaid",
			},
			shipping_method_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: "shipping_methods",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			tracking_number: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			notes: {
				type: Sequelize.TEXT,
				allowNull: true,
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

		await queryInterface.addIndex("orders", ["user_id"]);
		await queryInterface.addIndex("orders", ["order_status"]);
		await queryInterface.addIndex("orders", ["payment_status"]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("orders");
	},
};
