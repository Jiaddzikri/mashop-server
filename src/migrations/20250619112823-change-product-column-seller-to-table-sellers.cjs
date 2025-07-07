"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.changeColumn(
				"products",
				"seller_id",
				{
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "sellers",
						key: "id",
					},
					onUpdate: "CASCADE",
					onDelete: "CASCADE",
				},
				{ transaction }
			);

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.changeColumn(
				"products",
				"seller_id",
				{
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "users",
						key: "id",
					},
					onUpdate: "CASCADE",
					onDelete: "CASCADE",
				},
				{ transaction }
			);

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
