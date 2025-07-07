"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("product_reviews", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "products",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
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
			rating: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			comment: {
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

		await queryInterface.addIndex("product_reviews", ["product_id"]);
		await queryInterface.addIndex("product_reviews", ["user_id"]);

		await queryInterface.addIndex(
			"product_reviews",
			["product_id", "user_id"],
			{
				unique: true,
				name: "unique_product_user_review",
			}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("product_reviews");
	},
};
