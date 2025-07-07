import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class Category extends Model {
		static associate(models) {
			Category.belongsTo(models.Category, {
				foreignKey: "parent_category_id",
				as: "ParentCategory",
				allowNull: true,
			});

			Category.hasMany(models.Category, {
				foreignKey: "parent_category_id",
				as: "SubCategories",
			});

			Category.hasMany(models.Product, {
				foreignKey: "category_id",
				as: "products",
			});

			// Jika ada tabel pivot untuk Diskon_Kategori
			// Category.belongsToMany(models.Discount, {
			//   through: models.DiscountCategory, // Nama model tabel junction
			//   foreignKey: 'category_id',
			//   otherKey: 'discount_id',
			//   as: 'discounts'
			// });
		}
	}

	Category.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			parent_category_id: {
				type: DataTypes.INTEGER,
				allowNull: true, // Kategori utama tidak memiliki parent
				references: {
					// Opsional di model, utama di migrasi
					model: "Categories", // Merujuk ke tabel Categories itu sendiri
					key: "category_id",
				},
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					name: "unique_category_name",
					msg: "Nama kategori sudah ada.",
				},
			},
			slug: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					name: "unique_category_slug",
					msg: "Slug kategori sudah ada.",
				},
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			image_url: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "Category",
			tableName: "categories", // Nama tabel di database
			timestamps: false,
			hooks: {
				beforeValidate: (category, options) => {
					if (category.name && !category.slug) {
						category.slug = category.name
							.toLowerCase()
							.replace(/\s+/g, "-")
							.replace(/[^\w-]+/g, "");
					}
				},
			},
		}
	);
	return Category;
};
