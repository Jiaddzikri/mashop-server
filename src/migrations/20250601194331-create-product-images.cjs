"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("product_images", {
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
			image_url: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			alt_text: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			is_thumbnail: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			display_order: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
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

		await queryInterface.addIndex("product_images", ["product_id"]);
		await queryInterface.addIndex("product_images", ["is_thumbnail"]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("product_images");
	},
};
