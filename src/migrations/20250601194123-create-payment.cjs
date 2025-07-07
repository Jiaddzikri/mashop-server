"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("payments", {
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
			payment_method_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "payment_methods",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "RESTRICT",
			},
			payment_date: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
			amount: {
				type: Sequelize.DECIMAL,
				allowNull: false,
			},
			transaction_id: {
				type: Sequelize.STRING,
				allowNull: true,
				unique: true,
			},
			payment_status: {
				type: Sequelize.ENUM(
					"pending",
					"success",
					"failed",
					"expired",
					"refunded"
				),
				allowNull: false,
				defaultValue: "pending",
			},
			payment_details: {
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

		await queryInterface.addIndex("payments", ["order_id"]);
		await queryInterface.addIndex("payments", ["payment_method_id"]);
		await queryInterface.addIndex("payments", ["transaction_id"]);
		await queryInterface.addIndex("payments", ["payment_status"]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("payments");
	},
};
