import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// Produk dimiliki oleh satu Kategori
			Product.belongsTo(models.Category, {
				foreignKey: "category_id",
				as: "category",
				allowNull: false,
			});

			Product.belongsTo(models.Seller, {
				foreignKey: "seller_id",
				as: "seller",
				allowNull: true,
			});

			Product.hasMany(models.ProductImage, {
				foreignKey: "product_id",
				as: "images",
			});

			Product.hasMany(models.ProductReview, {
				foreignKey: "product_id",
				as: "reviews",
			});

			Product.hasOne(models.ProductReview, {
				foreignKey: "product_id",
				as: "review",
			});

			Product.hasMany(models.ProductVariant, {
				foreignKey: "product_id",
				as: "variants",
			});

			Product.hasMany(models.OrderItem, {
				foreignKey: "product_id",
				as: "orderItems",
			});

			Product.hasOne(models.ProductImage, {
				foreignKey: "product_id",
				as: "thumbnail",
			});

			// Product.belongsToMany(models.Wishlist, {
			// 	through: models.WishlistItem,
			// 	foreignKey: "product_id",
			// 	otherKey: "wishlist_id",
			// 	as: "wishlistedBy",
			// });

			// Product.hasMany(models.WishlistItem, {
			//   foreignKey: 'product_id',
			//   as: 'wishlistItems'
			// });

			// Produk bisa memiliki banyak Diskon (Jika menggunakan tabel junction DiscountProducts)
			// Product.belongsToMany(models.Discount, { // Asumsi model Discount ada
			//   through: models.DiscountProduct, // Nama model tabel junction
			//   foreignKey: 'product_id',
			//   otherKey: 'discount_id',
			//   as: 'discountsApplied'
			// });
		}
	}

	Product.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			seller_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: "Users",
					key: "id",
				},
			},
			category_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Categories",
					key: "id",
				},
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			slug: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					name: "unique_product_slug",
					msg: "Slug produk sudah ada.",
				},
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			price: {
				type: DataTypes.DECIMAL(12, 2),
				allowNull: false,
				validate: {
					isDecimal: true,
					min: 0,
				},
			},
			sku: {
				type: DataTypes.STRING,
				allowNull: true,
				unique: {
					name: "unique_product_sku",
					msg: "SKU produk sudah ada.",
				},
			},
			stock_quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
				validate: {
					isInt: true,
					min: 0,
				},
			},
			weight: {
				type: DataTypes.DECIMAL,
				allowNull: true,
				validate: {
					isDecimal: true,
					min: 0,
				},
			},
			dimensions: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			is_active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: "Product",
			tableName: "products",
			timestamps: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
			hooks: {
				beforeValidate: (product, options) => {
					if (product.name && !product.slug) {
						product.slug = product.name
							.toLowerCase()
							.replace(/\s+/g, "-")
							.replace(/[^\w-]+/g, "")
							.replace(/--+/g, "-");
					}
				},
			},
		}
	);

	return Product;
};
